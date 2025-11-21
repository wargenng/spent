import type { ColumnDef } from "@tanstack/solid-table";
import type { Card, Category } from "@/types/db";
import { Badge } from "../ui/badge";
import { TableColumnHeader } from "./tablecolumnheader";
import type { TransactionWithDetails } from "./types";

export const createColumns = (
	categories: Category[],
	cards: Card[],
	categoryFilters: string[],
	cardFilters: string[],
	toggleCategoryFilter: (name: string, checked: boolean) => void,
	toggleCardFilter: (name: string, checked: boolean) => void,
): ColumnDef<TransactionWithDetails>[] => [
	{
		accessorKey: "date",
		header: (props) => <TableColumnHeader column={props.column} title="Date" />,
		cell: (props) => (
			<div class="w-[100px]">
				{new Date(props.row.getValue("date")).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				})}
			</div>
		),
	},
	{
		accessorKey: "title",
		header: (props) => (
			<TableColumnHeader column={props.column} title="Title" />
		),
		cell: (props) => (
			<div class="flex space-x-2">
				<span class="max-w-[200px] truncate font-medium">
					{props.row.getValue("title")}
				</span>
			</div>
		),
	},
	{
		accessorKey: "amount",
		header: (props) => (
			<TableColumnHeader column={props.column} title="Amount" />
		),
		cell: (props) => {
			const amount = props.row.getValue("amount") as number;
			const isIncome = props.row.original.isIncome;
			const formattedAmount = Math.abs(amount).toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			});

			return (
				<div class={`font-medium ${isIncome ? "text-green-600" : "text-red-600"}`}>
					{isIncome ? "+" : "-"}
					{formattedAmount}
				</div>
			);
		},
	},
	{
		accessorKey: "category",
		id: "category",
		header: (props) => (
			<TableColumnHeader 
				column={props.column} 
				title="Category"
				categories={categories}
				categoryFilters={categoryFilters}
				toggleCategoryFilter={toggleCategoryFilter}
			/>
		),
		cell: (props) => (
			<div class="flex w-[120px] items-center">
				<Badge variant="outline">{props.row.original.category.name}</Badge>
			</div>
		),
	},
	{
		accessorKey: "card",
		id: "card",
		header: (props) => (
			<TableColumnHeader 
				column={props.column} 
				title="Card"
				cards={cards}
				cardFilters={cardFilters}
				toggleCardFilter={toggleCardFilter}
			/>
		),
		cell: (props) => (
			<div class="flex w-[120px] items-center">
				<Badge variant="outline">{props.row.original.card.name}</Badge>
			</div>
		),
	},
];

