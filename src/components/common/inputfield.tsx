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
import { TextField, TextFieldRoot } from "../ui/textfield";

interface InputFieldProps {
    inputfield: Accessor<string>;
    setInputField: Setter<string>;
    inputtype: string;
}

export default function InputField({
    inputfield,
    setInputField,
    inputtype,
}: InputFieldProps) {
    return (
        <Drawer side="right">
            <DrawerTrigger class="w-full">
                <div class="flex flex-col justify-start gap-2 items-start">
                    <label class="text-sm font-medium">{inputtype}</label>
                    <Button variant="outline" class="w-full justify-start">
                        {inputfield()}
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter {inputtype}</DrawerHeader>
                <TextFieldRoot class="p-4">
                    <TextField
                        type="text"
                        value={inputfield()}
                        onchange={(e) => {
                            setInputField(e.target.value);
                        }}
                        class="text-base"
                    ></TextField>
                </TextFieldRoot>
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
