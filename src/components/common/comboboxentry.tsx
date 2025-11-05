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
    defaultValue?: number;
}

export const ComboboxEntry = ({
    setComboboxEntry,
    combos,
    inputtype,
    defaultValue,
}: ComboboxEntryProps) => {
    return (
        <Combobox
            options={combos}
            optionValue={(option) => option.id}
            optionTextValue={(option) => option.name}
            optionLabel={(option) => option.name}
            defaultValue={defaultValue !== undefined ? combos.find((c) => c.id === defaultValue) : undefined}
            onChange={(value) => {
                setComboboxEntry(value?.id ?? combos[0]?.id ?? 0);
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
