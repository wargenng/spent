import { cn } from "@/lib/utils";

export const Table = (props: { class?: string; children: any }) => {
	return (
		<div class="relative w-full overflow-auto">
			<table class={cn("w-full caption-bottom text-sm", props.class)}>
				{props.children}
			</table>
		</div>
	);
};

export const TableHeader = (props: { class?: string; children: any }) => {
	return <thead class={cn("[&_tr]:border-b", props.class)}>{props.children}</thead>;
};

export const TableBody = (props: { class?: string; children: any }) => {
	return <tbody class={cn("[&_tr:last-child]:border-0", props.class)}>{props.children}</tbody>;
};

export const TableFooter = (props: { class?: string; children: any }) => {
	return (
		<tfoot class={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", props.class)}>
			{props.children}
		</tfoot>
	);
};

export const TableRow = (props: { class?: string; children: any; "data-state"?: string | boolean; onClick?: () => void }) => {
	return (
		<tr
			class={cn(
				"border-b transition-colors hover:bg-muted/50 data-[selected]:bg-muted",
				props.class,
			)}
			data-state={props["data-state"]}
			onClick={props.onClick}
		>
			{props.children}
		</tr>
	);
};

export const TableHead = (props: { class?: string; children: any; colSpan?: number }) => {
	return (
		<th
			class={cn(
				"h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
				props.class,
			)}
			colSpan={props.colSpan}
		>
			{props.children}
		</th>
	);
};

export const TableCell = (props: { class?: string; children: any; colSpan?: number }) => {
	return (
		<td
			class={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", props.class)}
			colSpan={props.colSpan}
		>
			{props.children}
		</td>
	);
};

export const TableCaption = (props: { class?: string; children: any }) => {
	return <caption class={cn("mt-4 text-sm text-muted-foreground", props.class)}>{props.children}</caption>;
};
