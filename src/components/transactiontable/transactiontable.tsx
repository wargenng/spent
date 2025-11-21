import type { SortingState } from "@tanstack/solid-table";
import {
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table";
import type { Setter } from "solid-js";
import { For, Show, createMemo, createSignal } from "solid-js";
import type { Card, Category, Paycheck } from "@/types/db";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import TransactionDetailDialog from "../transactiondetail/components/transactiondetaildialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { TextField, TextFieldRoot } from "../ui/textfield";
import { createColumns } from "./columns";
import type { TransactionWithDetails } from "./types";

interface TransactionTableProps {
	transactions: TransactionWithDetails[];
	categories: Category[];
	cards: Card[];
	paychecks: Paycheck[];
}

export default function TransactionTable(props: TransactionTableProps) {
	const data = createMemo(() => props.transactions);
	const [sorting, setSorting] = createSignal<SortingState>([]);
	const [searchQuery, setSearchQuery] = createSignal("");
	const [categoryFilters, setCategoryFilters] = createSignal<string[]>([]);
	const [cardFilters, setCardFilters] = createSignal<string[]>([]);
	const [selectedTransaction, setSelectedTransaction] = createSignal<TransactionWithDetails | null>(null);
	const [isDialogOpen, setIsDialogOpen] = createSignal(false);

	// Filter categories and cards to only show those present in the transactions
	const availableCategories = createMemo(() => {
		const categoryIds = new Set(data().map(t => t.category.id));
		return props.categories.filter(cat => categoryIds.has(cat.id));
	});

	const availableCards = createMemo(() => {
		const cardIds = new Set(data().map(t => t.card.id));
		return props.cards.filter(card => cardIds.has(card.id));
	});

	const filteredData = createMemo(() => {
		const query = searchQuery().toLowerCase();
		const categories = categoryFilters();
		const cards = cardFilters();

		return data().filter((transaction) => {
			// Multi-column search
			const matchesSearch = query
				? transaction.title.toLowerCase().includes(query) ||
				  transaction.category.name.toLowerCase().includes(query) ||
				  transaction.card.name.toLowerCase().includes(query) ||
				  Math.abs(transaction.amount).toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					}).toLowerCase().includes(query) ||
				  new Date(transaction.date).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					}).toLowerCase().includes(query)
				: true;
			const matchesCategory =
				categories.length === 0 || categories.includes(transaction.category.name);
			const matchesCard = cards.length === 0 || cards.includes(transaction.card.name);

			return matchesSearch && matchesCategory && matchesCard;
		});
	});

	const toggleFilter = (value: string, checked: boolean, setter: Setter<string[]>) => {
		setter((prev) => {
			if (checked) {
				if (prev.includes(value)) {
					return prev;
				}
				return [...prev, value];
			}
			return prev.filter((entry) => entry !== value);
		});
	};

	const describeSelection = (values: string[]) => {
		if (values.length === 0) {
			return "All";
		}
		if (values.length <= 2) {
			return values.join(", ");
		}
		return `${values.length} selected`;
	};

	const categorySummary = createMemo(() => describeSelection(categoryFilters()));
	const cardSummary = createMemo(() => describeSelection(cardFilters()));

	const toggleCategoryFilter = (name: string, checked: boolean) => {
		toggleFilter(name, checked, setCategoryFilters);
	};

	const toggleCardFilter = (name: string, checked: boolean) => {
		toggleFilter(name, checked, setCardFilters);
	};

	const columns = createMemo(() => createColumns(
		availableCategories(),
		availableCards(),
		categoryFilters(),
		cardFilters(),
		toggleCategoryFilter,
		toggleCardFilter,
	));

	const table = createSolidTable({
		get data() {
			return filteredData();
		},
		get columns() {
			return columns();
		},
		state: {
			get sorting() {
				return sorting();
			},
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const clearAllFilters = () => {
		setSearchQuery("");
		setCategoryFilters([]);
		setCardFilters([]);
	};

	const hasActiveFilters = createMemo(() => {
		return searchQuery().length > 0 || categoryFilters().length > 0 || cardFilters().length > 0;
	});

	return (
		<div class="w-full space-y-3">
			{/* Search Bar */}
			<div class="flex items-center gap-2">
				<TextFieldRoot class="flex-1">
					<TextField
						type="text"
						placeholder="Search all columns..."
						class="h-9"
						value={searchQuery()}
						onInput={(e) => setSearchQuery(e.currentTarget.value)}
					/>
				</TextFieldRoot>
				<Show when={hasActiveFilters()}>
					<Button
						variant="outline"
						class="h-9"
						onClick={clearAllFilters}
					>
						Clear All Filters
					</Button>
				</Show>
			</div>
			<div class="rounded-md border">
				<Table>
					<TableHeader>
						<For each={table.getHeaderGroups()}>
							{(headerGroup) => (
								<TableRow>
									<For each={headerGroup.headers}>
										{(header) => (
											<TableHead>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										)}
									</For>
								</TableRow>
							)}
						</For>
					</TableHeader>
					<TableBody>
						<Show
							when={table.getRowModel().rows?.length}
							fallback={
								<TableRow>
									<TableCell colSpan={table.getAllColumns().length} class="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							}
						>
							<For each={table.getRowModel().rows}>
								{(row) => (
									<TableRow
										class="cursor-pointer hover:bg-muted/50"
										onClick={() => {
											setSelectedTransaction(row.original);
											setIsDialogOpen(true);
										}}
									>
										<For each={row.getVisibleCells()}>
											{(cell) => (
												<TableCell>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											)}
										</For>
									</TableRow>
								)}
							</For>
						</Show>
					</TableBody>
				</Table>
			</div>
			<div class="flex flex-col gap-2 px-2 py-1 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
				<span>
					Showing {filteredData().length} transaction
					{filteredData().length === 1 ? "" : "s"}
				</span>
				<div class="flex flex-col gap-1 text-xs uppercase tracking-wide text-muted-foreground/80 md:flex-row md:items-center md:gap-6">
					<span class="flex items-center gap-2">
						<span>Categories</span>
						<Badge variant="outline">{categorySummary()}</Badge>
					</span>
					<span class="flex items-center gap-2">
						<span>Cards</span>
						<Badge variant="outline">{cardSummary()}</Badge>
					</span>
				</div>
			</div>
			<Show when={selectedTransaction()}>
				<TransactionDetailDialog
					transaction={selectedTransaction()!}
					cards={props.cards}
					categories={props.categories}
					paychecks={props.paychecks}
					open={isDialogOpen}
					onOpenChange={setIsDialogOpen}
				>
					{/* Empty children since we're controlling externally */}
				</TransactionDetailDialog>
			</Show>
		</div>
	);
}

