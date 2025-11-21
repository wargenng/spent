import { cn } from "@/lib/utils";
import type {
	PopoverContentProps,
	PopoverDescriptionProps,
	PopoverTitleProps,
} from "@kobalte/core/popover";
import { Popover as PopoverPrimitive } from "@kobalte/core/popover";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Popover = PopoverPrimitive;
export const PopoverTrigger = PopoverPrimitive.Trigger;

type popoverContentProps<T extends ValidComponent = "div"> = ParentProps<
	PopoverContentProps<T> & {
		class?: string;
	}
>;

export const PopoverContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, popoverContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as popoverContentProps, [
		"class",
		"children",
	]);

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				class={cn(
					"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1 data-[closed]:slide-out-to-top-1 data-[expanded]:slide-in-from-left-1 data-[expanded]:slide-in-from-top-1",
					local.class,
				)}
				style="background-color: hsl(var(--popover));"
				{...rest}
			>
				{local.children}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
};

type popoverTitleProps<T extends ValidComponent = "h2"> = PopoverTitleProps<T> & {
	class?: string;
};

export const PopoverTitle = <T extends ValidComponent = "h2">(
	props: PolymorphicProps<T, popoverTitleProps<T>>,
) => {
	const [local, rest] = splitProps(props as popoverTitleProps, ["class"]);

	return (
		<PopoverPrimitive.Title
			class={cn("text-sm font-semibold", local.class)}
			{...rest}
		/>
	);
};

type popoverDescriptionProps<T extends ValidComponent = "p"> =
	PopoverDescriptionProps<T> & {
		class?: string;
	};

export const PopoverDescription = <T extends ValidComponent = "p">(
	props: PolymorphicProps<T, popoverDescriptionProps<T>>,
) => {
	const [local, rest] = splitProps(props as popoverDescriptionProps, ["class"]);

	return (
		<PopoverPrimitive.Description
			class={cn("text-sm text-muted-foreground", local.class)}
			{...rest}
		/>
	);
};

