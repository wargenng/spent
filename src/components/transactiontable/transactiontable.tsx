import type { SortingState } from "@tanstack/solid-table";
import {
    createSolidTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
} from "@tanstack/solid-table";
import { For, Show, createMemo, createSignal, type Accessor } from "solid-js";
import type { Card, Category, Paycheck } from "@/types/db";
import { Badge } from "../ui/badge";
import { Checkbox, CheckboxControl } from "../ui/checkbox";
import TransactionDetailDialog from "../transactiondetail/components/transactiondetaildialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { createColumns } from "./columns";
import type { TransactionWithDetails } from "./types";
import {
    useTransactionFormState,
    submitTransaction,
} from "../transactionentry/transactionentrylogic";
import NewTransactionRow from "./newtransactionrow";
import TableSearchBar from "./tablesearchbar";
import { useTableFilters } from "./usetablefilters";
import TableHeaderButton from "./tableheaderbutton";
import BulkActionsToolbar from "./bulkactionstoolbar";

interface TransactionTableProps {
    transactions: TransactionWithDetails[] | Accessor<TransactionWithDetails[]>;
    categories: Category[];
    cards: Card[];
    paychecks: Paycheck[];
    userId: string;
    defaultPaycheckId?: number;
    onTransactionAdded?: (transaction: TransactionWithDetails) => void;
    onTransactionsDeleted?: (ids: number[]) => void;
    onTransactionsMoved?: (ids: number[]) => void;
}

export default function TransactionTable(props: TransactionTableProps) {
    const data = createMemo(() =>
        typeof props.transactions === "function"
            ? props.transactions()
            : props.transactions
    );
    const [sorting, setSorting] = createSignal<SortingState>([]);
    const [selectedTransaction, setSelectedTransaction] =
        createSignal<TransactionWithDetails | null>(null);
    const [isDialogOpen, setIsDialogOpen] = createSignal(false);
    const [isAddingNew, setIsAddingNew] = createSignal(false);
    const [selectedIds, setSelectedIds] = createSignal<Set<number>>(new Set());

    // Selection helpers
    const isSelected = (id: number) => selectedIds().has(id);
    const toggleSelection = (id: number, e: Event) => {
        e.stopPropagation();
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };
    const selectAll = () => {
        const allIds = filteredData().map((t) => t.id);
        setSelectedIds(new Set(allIds));
    };
    const clearSelection = () => {
        setSelectedIds(new Set<number>());
    };
    const isAllSelected = () => {
        const filtered = filteredData();
        return filtered.length > 0 && selectedIds().size === filtered.length;
    };
    const isSomeSelected = () => {
        return (
            selectedIds().size > 0 && selectedIds().size < filteredData().length
        );
    };

    // Form state for new transaction
    const formState = useTransactionFormState(
        props.cards,
        props.categories,
        props.paychecks,
        props.defaultPaycheckId
    );

    // Filter categories and cards to only show those present in the transactions
    const availableCategories = createMemo(() => {
        const categoryIds = new Set(data().map((t) => t.category.id));
        return props.categories.filter((cat) => categoryIds.has(cat.id));
    });

    const availableCards = createMemo(() => {
        const cardIds = new Set(data().map((t) => t.card.id));
        return props.cards.filter((card) => cardIds.has(card.id));
    });

    // Use filter hook
    const {
        searchQuery,
        setSearchQuery,
        categoryFilters,
        cardFilters,
        filteredData,
        categorySummary,
        cardSummary,
        toggleCategoryFilter,
        toggleCardFilter,
        clearAllFilters,
        hasActiveFilters,
    } = useTableFilters(data);

    const columns = createMemo(() =>
        createColumns(
            availableCategories(),
            availableCards(),
            categoryFilters(),
            cardFilters(),
            toggleCategoryFilter,
            toggleCardFilter
        )
    );

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

    const handleSaveNewTransaction = async () => {
        if (!formState.title() || formState.amount() === 0) {
            return;
        }
        const result = await submitTransaction(
            props.userId,
            formState,
            !!props.onTransactionAdded
        );

        if (result && props.onTransactionAdded) {
            // Create TransactionWithDetails from the API response
            const newTransaction: TransactionWithDetails = {
                ...result.transaction,
                card: result.card,
                category: result.category,
            };
            props.onTransactionAdded(newTransaction);
        }

        setIsAddingNew(false);
        // Reset form
        formState.setTitle("");
        formState.setAmount(0);
        // Reload date from localStorage (it was just saved by submitTransaction)
        const lastDate = localStorage.getItem("lastTransactionDate");
        if (lastDate) {
            const parsedDate = new Date(lastDate);
            if (!isNaN(parsedDate.getTime())) {
                formState.setDate(parsedDate);
            }
        }
        formState.setNotes("");
        formState.setIsIncome(false);
    };

    const handleCancelNewTransaction = () => {
        setIsAddingNew(false);
        // Reset form but keep the date
        formState.setTitle("");
        formState.setAmount(0);
        // Date stays as is (will use last used date on next open)
        formState.setNotes("");
        formState.setIsIncome(false);
        // Reset category to default
        const expenseCategories = props.categories.filter(
            (cat) => cat.isIncomeCategory === false
        );
        const defaultCategoryId =
            expenseCategories[0]?.id ?? props.categories[0]?.id ?? 0;
        formState.setCategoryId(defaultCategoryId);
    };

    const handleToggleAddNew = () => {
        if (isAddingNew()) {
            handleCancelNewTransaction();
        } else {
            setIsAddingNew(true);
        }
    };

    // Get target paycheck start date for date adjustment
    const getPaycheckStartDate = (paycheckId: number) => {
        const paycheck = props.paychecks.find((p) => p.id === paycheckId);
        return paycheck?.startDate;
    };

    // Bulk action handlers
    const handleBulkDelete = async () => {
        const ids = Array.from(selectedIds());
        const response = await fetch("/api/payments/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "delete",
                transactionIds: ids,
            }),
        });
        if (response.ok) {
            props.onTransactionsDeleted?.(ids);
            clearSelection();
        }
    };

    const handleBulkMove = async (targetPaycheckId: number) => {
        const ids = Array.from(selectedIds());
        const response = await fetch("/api/payments/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "move",
                transactionIds: ids,
                targetPaycheckId,
            }),
        });
        if (response.ok) {
            props.onTransactionsMoved?.(ids);
            clearSelection();
        }
    };

    const handleBulkCopy = async (targetPaycheckId: number) => {
        const ids = Array.from(selectedIds());
        const targetStartDate = getPaycheckStartDate(targetPaycheckId);
        const response = await fetch("/api/payments/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "copy",
                transactionIds: ids,
                targetPaycheckId,
                targetPaycheckStartDate: targetStartDate,
            }),
        });
        if (response.ok) {
            // Copied transactions go to another paycheck, so just clear selection
            clearSelection();
        }
    };

    return (
        <div class="w-full space-y-3">
            <TableSearchBar
                searchQuery={searchQuery()}
                onSearchChange={setSearchQuery}
                hasActiveFilters={hasActiveFilters()}
                onClearFilters={clearAllFilters}
            />
            <BulkActionsToolbar
                selectedCount={selectedIds().size}
                paychecks={props.paychecks}
                currentPaycheckId={props.defaultPaycheckId}
                onDelete={handleBulkDelete}
                onMove={handleBulkMove}
                onCopy={handleBulkCopy}
                onClearSelection={clearSelection}
            />
            <div class="rounded-md border">
                <Table>
                    <TableHeader>
                        <For each={table.getHeaderGroups()}>
                            {(headerGroup) => (
                                <TableRow>
                                    <TableHead class="w-[40px]">
                                        <Checkbox
                                            checked={isAllSelected()}
                                            indeterminate={isSomeSelected()}
                                            onChange={(checked: boolean) => {
                                                if (checked) {
                                                    selectAll();
                                                } else {
                                                    clearSelection();
                                                }
                                            }}
                                        >
                                            <CheckboxControl />
                                        </Checkbox>
                                    </TableHead>
                                    <For each={headerGroup.headers}>
                                        {(header) => (
                                            <TableHead>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )}
                                    </For>
                                    <TableHeaderButton
                                        isAddingNew={isAddingNew()}
                                        onToggle={handleToggleAddNew}
                                    />
                                </TableRow>
                            )}
                        </For>
                    </TableHeader>
                    <TableBody>
                        <Show when={isAddingNew()}>
                            <NewTransactionRow
                                formState={formState}
                                categories={props.categories}
                                cards={props.cards}
                                onSave={handleSaveNewTransaction}
                                onCancel={handleCancelNewTransaction}
                            />
                        </Show>
                        <Show
                            when={table.getRowModel().rows?.length}
                            fallback={
                                <TableRow>
                                    <TableCell
                                        colSpan={
                                            table.getAllColumns().length + 2
                                        }
                                        class="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            }
                        >
                            <For each={table.getRowModel().rows}>
                                {(row) => (
                                    <TableRow
                                        class={`cursor-pointer hover:bg-muted/50 ${
                                            isSelected(row.original.id)
                                                ? "bg-muted/30"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedTransaction(
                                                row.original
                                            );
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        <TableCell class="w-[40px]">
                                            <Checkbox
                                                checked={isSelected(
                                                    row.original.id
                                                )}
                                                onChange={() => {}}
                                                onClick={(e: Event) =>
                                                    toggleSelection(
                                                        row.original.id,
                                                        e
                                                    )
                                                }
                                            >
                                                <CheckboxControl />
                                            </Checkbox>
                                        </TableCell>
                                        <For each={row.getVisibleCells()}>
                                            {(cell) => (
                                                <TableCell>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )}
                                        </For>
                                        <TableCell class="w-[100px]">
                                            {" "}
                                        </TableCell>
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
