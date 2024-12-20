import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
} from "@/components/ui/combobox";
import { type Setter } from "solid-js";

interface ComboboxEntryProps {
    setComboboxEntry: Setter<number>;
    combos: {
        id: number;
        name: string;
    }[];
    inputtype: string;
}

export const ComboboxEntry = ({
    setComboboxEntry,
    combos,
    inputtype,
}: ComboboxEntryProps) => {
    return (
        <Combobox
            options={combos}
            optionValue={(option) => option.id}
            optionTextValue={(option) => option.name}
            optionLabel={(option) => option.name}
            onChange={(value) => {
                setComboboxEntry(value?.id ?? combos[0].id);
                console.log(value);
            }}
            itemComponent={(props) => (
                <ComboboxItem item={props.item}>
                    {props.item.rawValue.name}
                </ComboboxItem>
            )}
            modal={false}
            preventScroll={false}
        >
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {inputtype}
            </label>
            <ComboboxTrigger>
                <ComboboxInput />
            </ComboboxTrigger>
            <ComboboxContent class="max-h-32 overflow-y-auto" />
        </Combobox>
    );
};
