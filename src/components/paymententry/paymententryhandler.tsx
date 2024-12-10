import type { Card, Category, Paycheck } from "@/types/db";
import PaymentEntryForm from "./paymententry";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createSignal } from "solid-js";
import { Button } from "../ui/button";

interface PaymentEntryProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    children: any;
}

export default function PaymentEntry({
    userId,
    paychecks,
    categories,
    cards,
    children,
}: PaymentEntryProps) {
    const [open, setOpen] = createSignal(false);

    return (
        <div>
            {cards.length === 0 ? (
                <Dialog open={open()} onOpenChange={setOpen}>
                    <DialogTrigger> {children}</DialogTrigger>
                    <DialogContent class="w-5/6">
                        <DialogHeader>
                            <DialogTitle>
                                Payment Entry Requires Cards
                            </DialogTitle>
                            <DialogDescription>
                                Please add a card before entering a payment.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter class="flex gap-2">
                            <Button
                                onclick={() => {
                                    setOpen(false);
                                }}
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : (
                <PaymentEntryForm
                    userId={userId}
                    paychecks={paychecks}
                    categories={categories}
                    cards={cards}
                >
                    {children}
                </PaymentEntryForm>
            )}
        </div>
    );
}
