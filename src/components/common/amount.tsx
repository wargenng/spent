import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    createSignal,
    createEffect,
    type Accessor,
    type Setter,
} from "solid-js";
import { Button } from "../ui/button";
import { TextFieldLabel, TextFieldRoot } from "../ui/textfield";

interface AmountProps {
    amount: Accessor<number>;
    setAmount: Setter<number>;
}

export default function Amount({ amount, setAmount }: AmountProps) {
    const [open, setOpen] = createSignal(false);
    let inputRef: HTMLInputElement | undefined;

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (open() && inputRef) {
            setTimeout(() => {
                inputRef?.focus();
                inputRef?.select();
            }, 300);
        }
    };

    return (
        <Drawer side="right" open={open()} onOpenChange={handleOpenChange}>
            <DrawerTrigger class="w-full">
                <Button variant="outline" class="w-full justify-start">
                    {amount().toFixed(2)}
                </Button>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter amount</DrawerHeader>
                <TextFieldRoot class="p-4">
                    <TextFieldLabel>Transaction Amount</TextFieldLabel>
                    <input
                        ref={inputRef}
                        type="number"
                        inputMode="decimal"
                        value={amount()}
                        onChange={(e) => {
                            setAmount(Number(e.currentTarget.value));
                        }}
                        class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                    />
                </TextFieldRoot>
            </DrawerContent>
        </Drawer>
    );
}
