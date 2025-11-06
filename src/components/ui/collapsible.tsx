import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@kobalte/core/collapsible";
import type { ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

type collapsibleContentProps<T extends ValidComponent = "div"> = ParentProps<
    CollapsiblePrimitive.CollapsibleContentProps<T> & {
        class?: string;
    }
>;

export const CollapsibleContent = <T extends ValidComponent = "div">(
    props: collapsibleContentProps<T>
) => {
    const [local, rest] = splitProps(props as collapsibleContentProps, [
        "class",
        "children",
    ]);

    return (
        <CollapsiblePrimitive.Content
            class={cn(
                "overflow-hidden data-[expanded]:animate-collapsible-down data-[closed]:animate-collapsible-up",
                local.class
            )}
            {...rest}
        >
            {local.children}
        </CollapsiblePrimitive.Content>
    );
};
