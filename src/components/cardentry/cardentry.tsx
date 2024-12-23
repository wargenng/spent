import type { JSX } from "solid-js";
import CardEntryDialog from "./components/cardentrydialog";
import CardEntryDrawer from "./components/cardentrydrawer";

interface CardEntryProps {
    userId: string;
    children: JSX.Element;
}

export default function CardEntry(props: CardEntryProps) {
    return (
        <div>
            <div class="block lg:hidden">
                <CardEntryDrawer userId={props.userId}>
                    {props.children}
                </CardEntryDrawer>
            </div>
            <div class="hidden lg:block">
                <CardEntryDialog userId={props.userId}>
                    {props.children}
                </CardEntryDialog>
            </div>
        </div>
    );
}
