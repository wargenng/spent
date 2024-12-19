import type { Card, Category, Paycheck } from "@/types/db";
import PaymentEntry from "./paymententryhandler";
import { Button } from "../ui/button";

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
import PaymentDialog from "./paymentdialog";

interface PaymentEntryProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
}

export default function PaymentButton({
    userId,
    paychecks,
    categories,
    cards,
}: PaymentEntryProps) {
    const [open, setOpen] = createSignal(false);

    return (
        <div>
            {cards.length > 0 && paychecks.length > 0 ? (
                <div class="flex flex-col items-center justify-start gap-1">
                    <div class="block lg:hidden">
                        <PaymentEntryForm
                            userId={userId}
                            paychecks={paychecks}
                            categories={categories}
                            cards={cards}
                        >
                            <div class="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 3v18m3-15L7 3L4 6m16 12l-3 3l-3-3m3 3V3"
                                    />
                                </svg>
                            </div>
                        </PaymentEntryForm>
                    </div>
                    <div class="hidden lg:block">
                        <PaymentDialog
                            userId={userId}
                            paychecks={paychecks}
                            categories={categories}
                            cards={cards}
                        >
                            <div class="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 3v18m3-15L7 3L4 6m16 12l-3 3l-3-3m3 3V3"
                                    />
                                </svg>
                            </div>
                        </PaymentDialog>
                    </div>
                    <label class="text-xs">Transaction</label>
                </div>
            ) : (
                <Dialog open={open()} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <div class="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 3v18m3-15L7 3L4 6m16 12l-3 3l-3-3m3 3V3"
                                />
                            </svg>
                        </div>
                    </DialogTrigger>
                    <DialogContent class="w-5/6">
                        <DialogHeader>
                            <DialogTitle>
                                Payment Entry Requires Cards and Paychecks
                            </DialogTitle>
                            <DialogDescription>
                                Please add a card and paycheck before entering a
                                payment.
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
            )}
        </div>
    );
}
