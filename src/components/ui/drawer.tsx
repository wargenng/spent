import { cn } from "@/lib/utils";
import type {
    ContentProps,
    DescriptionProps,
    DynamicProps,
    LabelProps,
} from "@corvu/drawer";
import DrawerPrimitive from "@corvu/drawer";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Drawer = DrawerPrimitive;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;

type drawerContentProps<T extends ValidComponent = "div"> = ParentProps<
    ContentProps<T> & {
        class?: string;
    }
>;

export const DrawerContent = <T extends ValidComponent = "div">(
    props: DynamicProps<T, drawerContentProps<T>>
) => {
    const [local, rest] = splitProps(props as drawerContentProps, [
        "class",
        "children",
    ]);
    const ctx = DrawerPrimitive.useContext();

    return (
        <DrawerPrimitive.Portal>
            <DrawerPrimitive.Overlay
                class="fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-200"
                style={{
                    "background-color": `hsl(var(--background) / ${
                        0.8 * ctx.openPercentage()
                    })`,
                }}
            />
            <DrawerPrimitive.Content
                class={cn(
                    "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl  bg-background after:absolute after:inset-x-0 after:top-full after:h-[50%] after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-200 md:select-none",
                    local.class
                )}
                {...rest}
            >
                {local.children}
            </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
    );
};

export const DrawerHeader = (props: ComponentProps<"div">) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <div
            class={cn(
                "w-full justify-between items-center flex gap-1.5 p-4 text-center sm:text-left",
                local.class
            )}
            {...rest}
        >
            <DrawerClose>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 text-gray-500 dark:text-gray-400"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m14 7l-5 5l5 5"
                    />
                </svg>
            </DrawerClose>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {props.children}
            </h3>
            <div class="w-8 h-8" />
        </div>
    );
};

export const DrawerFooter = (props: ComponentProps<"div">) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <div
            class={cn("mt-auto flex flex-col gap-2 p-4", local.class)}
            {...rest}
        />
    );
};

type DrawerLabelProps = LabelProps & {
    class?: string;
};

export const DrawerLabel = <T extends ValidComponent = "h2">(
    props: DynamicProps<T, DrawerLabelProps>
) => {
    const [local, rest] = splitProps(props as DrawerLabelProps, ["class"]);

    return (
        <DrawerPrimitive.Label
            class={cn(
                "text-lg font-semibold leading-none tracking-tight",
                local.class
            )}
            {...rest}
        />
    );
};

type DrawerDescriptionProps = DescriptionProps & {
    class?: string;
};

export const DrawerDescription = <T extends ValidComponent = "p">(
    props: DynamicProps<T, DrawerDescriptionProps>
) => {
    const [local, rest] = splitProps(props as DrawerDescriptionProps, [
        "class",
    ]);

    return (
        <DrawerPrimitive.Description
            class={cn("text-sm text-muted-foreground", local.class)}
            {...rest}
        />
    );
};
