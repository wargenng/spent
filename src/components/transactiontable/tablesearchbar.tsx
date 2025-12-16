import { Show } from "solid-js";
import { Button } from "../ui/button";
import { TextField, TextFieldRoot } from "../ui/textfield";

interface TableSearchBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

export default function TableSearchBar(props: TableSearchBarProps) {
    return (
        <div class="flex items-center gap-2">
            <TextFieldRoot class="flex-1">
                <TextField
                    type="text"
                    placeholder="Search all columns..."
                    class="h-9"
                    value={props.searchQuery}
                    onInput={(e) => props.onSearchChange(e.currentTarget.value)}
                />
            </TextFieldRoot>
            <Show when={props.hasActiveFilters}>
                <Button
                    variant="outline"
                    class="h-9"
                    onClick={props.onClearFilters}
                >
                    Clear All Filters
                </Button>
            </Show>
        </div>
    );
}



