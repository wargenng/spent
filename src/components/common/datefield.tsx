import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import type { Accessor, Setter } from "solid-js";
import { Button } from "../ui/button";
import { TextField, TextFieldLabel, TextFieldRoot } from "../ui/textfield";

interface DateFieldProps {
    datefield: Accessor<Date>;
    setDateField: Setter<Date>;
    inputtype: string;
}

export default function DateField({
    datefield,
    setDateField,
    inputtype,
}: DateFieldProps) {
    return (
        <Drawer side="right">
            <DrawerTrigger class="w-full">
                <div class="flex flex-col justify-start gap-2 items-start">
                    <label class="text-sm font-medium">{inputtype}</label>
                    <Button variant="outline" class="w-full justify-start">
                        {datefield().toLocaleDateString()}
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter {inputtype}</DrawerHeader>

                <DrawerFooter>
                    <DrawerClose class="w-full">
                        <Button variant="outline" class="w-full">
                            Done
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
