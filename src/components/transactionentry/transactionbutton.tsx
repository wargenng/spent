import type { Card, Category, Paycheck } from "@/types/db";
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
import TransactionDrawer from "./transactiondrawer";
import TransactionDialog from "./transactiondialog";

interface TransactionButtonProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
}

export default function TransactionButton({
    userId,
    paychecks,
    categories,
    cards,
}: TransactionButtonProps) {
    const [open, setOpen] = createSignal(false);

    return (
        <div>
            {cards.length > 0 && paychecks.length > 0 ? (
                <div class="flex flex-col items-center justify-start gap-2">
                    <div class="block lg:hidden">
                        <TransactionDrawer
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
                                        d="M11 16h10m-10 0l4 4m-4-4l4-4m-2-4H3m10 0l-4 4m4-4L9 4"
                                    />
                                </svg>
                            </div>
                        </TransactionDrawer>
                    </div>
                    <div class="hidden lg:block">
                        <TransactionDialog
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
                                        d="M11 16h10m-10 0l4 4m-4-4l4-4m-2-4H3m10 0l-4 4m4-4L9 4"
                                    />
                                </svg>
                            </div>
                        </TransactionDialog>
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
                                    d="M11 16h10m-10 0l4 4m-4-4l4-4m-2-4H3m10 0l-4 4m4-4L9 4"
                                />
                            </svg>
                        </div>
                    </DialogTrigger>
                    <DialogContent class="w-5/6">
                        <DialogHeader>
                            <DialogTitle>
                                Transaction Entry Requires Cards and Paychecks
                            </DialogTitle>
                            <DialogDescription>
                                Please add a card and paycheck before entering a
                                transaction.
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
