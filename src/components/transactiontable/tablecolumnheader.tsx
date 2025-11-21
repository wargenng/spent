import type { PopoverTriggerProps } from "@kobalte/core/popover";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox, CheckboxControl, CheckboxLabel } from "../ui/checkbox";
import type { Column } from "@tanstack/solid-table";
import type { VoidProps } from "solid-js";
import { For, Match, Show, Switch, splitProps } from "solid-js";
import type { Card, Category } from "@/types/db";
import { Button } from "../ui/button";

interface TableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>;
	title: string;
	categories?: Category[];
	cards?: Card[];
	categoryFilters?: string[];
	cardFilters?: string[];
	toggleCategoryFilter?: (name: string, checked: boolean) => void;
	toggleCardFilter?: (name: string, checked: boolean) => void;
}

export const TableColumnHeader = <TData, TValue>(
	props: VoidProps<TableColumnHeaderProps<TData, TValue>>,
) => {
	const [local] = splitProps(props, [
		"column",
		"title",
		"categories",
		"cards",
		"categoryFilters",
		"cardFilters",
		"toggleCategoryFilter",
		"toggleCardFilter",
	]);

	return (
		<div class="flex items-center space-x-2">
			<Popover placement="bottom-start">
				<PopoverTrigger
					as={(triggerProps: PopoverTriggerProps) => (
						<Button
							aria-label={
								local.title
									? local.column.getIsSorted() === "desc"
										? "Sorted descending. Click to sort ascending."
										: local.column.getIsSorted() === "asc"
											? "Sorted ascending. Click to sort descending."
											: "Not sorted. Click to sort ascending."
									: "Column options"
							}
							variant="ghost"
							class="-ml-4 h-8 data-[expanded]:bg-accent"
							{...triggerProps}
						>
							<Show
								when={local.title}
								fallback={
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-4"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
										/>
									</svg>
								}
							>
								<span>{local.title}</span>
								<div class="ml-1">
									<Switch
										fallback={
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="size-3.5"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													fill="none"
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
												/>
											</svg>
										}
									>
										<Match when={local.column.getIsSorted() === "asc"}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="size-3.5"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													fill="none"
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 5v14m4-10l-4-4M8 9l4-4"
												/>
											</svg>
										</Match>
										<Match when={local.column.getIsSorted() === "desc"}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="size-3.5"
												viewBox="0 0 24 24"
												aria-hidden="true"
											>
												<path
													fill="none"
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 5v14m4-4l-4 4m-4-4l4 4"
												/>
											</svg>
										</Match>
									</Switch>
								</div>
							</Show>
						</Button>
					)}
				/>
				<PopoverContent class="w-56 max-h-[400px] overflow-y-auto">
					<div class="space-y-3">
						{/* Sort Options */}
						<Show when={local.column.getCanSort()}>
							<div class="space-y-1">
								<p class="text-sm font-semibold px-1">Sort</p>
								<Button
									variant="ghost"
									class="w-full justify-start px-2 py-1.5 text-sm h-auto"
									onClick={() => local.column.toggleSorting(false, true)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-4 text-muted-foreground/70 mr-2"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 5v14m4-10l-4-4M8 9l4-4"
										/>
									</svg>
									Ascending
								</Button>
								<Button
									variant="ghost"
									class="w-full justify-start px-2 py-1.5 text-sm h-auto"
									onClick={() => local.column.toggleSorting(true, true)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="size-4 text-muted-foreground/70 mr-2"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 5v14m4-4l-4 4m-4-4l4 4"
										/>
									</svg>
									Descending
								</Button>
							</div>
						</Show>

						{/* Category Filter - only show in category column */}
						<Show when={local.column.id === "category" && local.categories && local.toggleCategoryFilter}>
							<Show when={local.column.getCanSort()}>
								<div class="h-px bg-muted" />
							</Show>
							<div class="space-y-2">
								<div class="flex justify-between items-center px-1">
									<p class="text-sm font-semibold">Filter by Category</p>
									<Show when={(local.categoryFilters?.length ?? 0) > 0}>
										<Button
											variant="ghost"
											class="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
											onClick={() => {
												local.categories?.forEach(cat => local.toggleCategoryFilter?.(cat.name, false));
											}}
										>
											Clear
										</Button>
									</Show>
								</div>
								<div class="space-y-2">
									<For each={local.categories}>
										{(category) => {
											const isChecked = () => local.categoryFilters?.includes(category.name) ?? false;
											return (
												<Checkbox
													checked={isChecked()}
													onChange={(checked: boolean) => local.toggleCategoryFilter?.(category.name, checked)}
													class="flex items-center space-x-2"
												>
													<CheckboxControl />
													<CheckboxLabel class="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
														{category.name}
													</CheckboxLabel>
												</Checkbox>
											);
										}}
									</For>
								</div>
							</div>
						</Show>

						{/* Card Filter - only show in card column */}
						<Show when={local.column.id === "card" && local.cards && local.toggleCardFilter}>
							<Show when={local.column.getCanSort()}>
								<div class="h-px bg-muted" />
							</Show>
							<div class="space-y-2">
								<div class="flex justify-between items-center px-1">
									<p class="text-sm font-semibold">Filter by Card</p>
									<Show when={(local.cardFilters?.length ?? 0) > 0}>
										<Button
											variant="ghost"
											class="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
											onClick={() => {
												local.cards?.forEach(card => local.toggleCardFilter?.(card.name, false));
											}}
										>
											Clear
										</Button>
									</Show>
								</div>
								<div class="space-y-2">
									<For each={local.cards}>
										{(card) => {
											const isChecked = () => local.cardFilters?.includes(card.name) ?? false;
											return (
												<Checkbox
													checked={isChecked()}
													onChange={(checked: boolean) => local.toggleCardFilter?.(card.name, checked)}
													class="flex items-center space-x-2"
												>
													<CheckboxControl />
													<CheckboxLabel class="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
														{card.name}
													</CheckboxLabel>
												</Checkbox>
											);
										}}
									</For>
								</div>
							</div>
						</Show>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

