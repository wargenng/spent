import { Show } from "solid-js";
import { Button } from "../ui/button";
import { TableHead } from "../ui/table";

interface TableHeaderButtonProps {
    isAddingNew: boolean;
    onToggle: () => void;
}

export default function TableHeaderButton(props: TableHeaderButtonProps) {
    return (
        <TableHead class="w-[100px]">
            <Button
                variant="outline"
                size="sm"
                class="h-8 w-8 p-0"
                onClick={props.onToggle}
            >
                <Show
                    when={props.isAddingNew}
                    fallback={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                    </svg>
                </Show>
            </Button>
        </TableHead>
    );
}

