import { cn } from "@/lib/utils";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type badgeProps<T extends ValidComponent = "div"> = PolymorphicProps<
	T,
	{
		variant?: "default" | "secondary" | "destructive" | "outline";
	}
>;

export const Badge = <T extends ValidComponent = "div">(
	props: badgeProps<T>,
) => {
	const [local, rest] = splitProps(props as badgeProps, [
		"class",
		"variant",
	]);

	return (
		<div
			class={cn(
				"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
				{
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80":
						local.variant === "default",
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80":
						local.variant === "secondary",
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80":
						local.variant === "destructive",
					"text-foreground": local.variant === "outline",
				},
				local.class,
			)}
			{...rest}
		/>
	);
};
