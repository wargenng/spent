import type { Card, Category, Paycheck } from "@/types/db";
import type { JSX } from "solid-js";
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

interface TransactionEntryProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    children: JSX.Element;
}

export default function TransactionEntry({
    userId,
    paychecks,
    categories,
    cards,
    children,
}: TransactionEntryProps) {
    const [open, setOpen] = createSignal(false);

    return (
        <div>
            {cards.length > 0 && paychecks.length > 0 ? (
                <div>
                    <div class="block lg:hidden">
                        <TransactionDrawer
                            userId={userId}
                            paychecks={paychecks}
                            categories={categories}
                            cards={cards}
                        >
                            {children}
                        </TransactionDrawer>
                    </div>
                    <div class="hidden lg:block">
                        <TransactionDialog
                            userId={userId}
                            paychecks={paychecks}
                            categories={categories}
                            cards={cards}
                        >
                            {children}
                        </TransactionDialog>
                    </div>
                </div>
            ) : (
                <Dialog open={open()} onOpenChange={setOpen}>
                    <DialogTrigger>{children}</DialogTrigger>
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
