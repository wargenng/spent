import type { Category } from "@/types/db";
import type { JSX } from "solid-js";
import CardEntryDialog from "./components/cardentrydialog";
import CardEntryDrawer from "./components/cardentrydrawer";

interface CardEntryProps {
    userId: string;
    categories: Category[];
    children: JSX.Element;
}

export default function CardEntry(props: CardEntryProps) {
    return (
        <div>
            <div class="block lg:hidden">
                <CardEntryDrawer
                    userId={props.userId}
                    categories={props.categories}
                >
                    {props.children}
                </CardEntryDrawer>
            </div>
            <div class="hidden lg:block">
                <CardEntryDialog
                    userId={props.userId}
                    categories={props.categories}
                >
                    {props.children}
                </CardEntryDialog>
            </div>
        </div>
    );
}
