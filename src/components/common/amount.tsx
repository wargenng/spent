import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import type { Accessor, Setter } from "solid-js";
import { Button } from "../ui/button";
import { TextField, TextFieldRoot } from "../ui/textfield";

interface AmountProps {
    amount: Accessor<number>;
    setAmount: Setter<number>;
}

export default function Amount({ amount, setAmount }: AmountProps) {
    return (
        <Drawer side="right">
            <DrawerTrigger class="w-full">
                <Button variant="outline" class="w-full justify-start">
                    {amount().toFixed(2)}
                </Button>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter amount</DrawerHeader>
                <TextFieldRoot class="p-4">
                    <TextField
                        type="number"
                        value={amount()}
                        onchange={(e) => {
                            setAmount(Number(e.target.value));
                        }}
                        class="text-base"
                    ></TextField>
                </TextFieldRoot>
            </DrawerContent>
        </Drawer>
    );
}
