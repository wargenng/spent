import type { Card, Category, Paycheck, Transaction } from "@/types/db";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../../ui/dialog";
import { createSignal, createMemo, Show } from "solid-js";
import { Button } from "../../ui/button";
import TransactionFormFields from "../../transactionentry/transactionformfields";

interface TransactionDetailDialogProps {
    transaction: Transaction;
    cards: Card[];
    categories: Category[];
    paychecks: Paycheck[];
    children: any;
}

export default function TransactionDetailDialog({
    transaction,
    cards,
    categories,
    paychecks,
    children,
}: TransactionDetailDialogProps) {
    const [title, setTitle] = createSignal(transaction.title);
    const [amount, setAmount] = createSignal(Math.abs(transaction.amount));
    const [date, setDate] = createSignal(new Date(transaction.date));
    const [cardId, setCardId] = createSignal(transaction.cardId);
    const [categoryId, setCategoryId] = createSignal(transaction.categoryId);
    const [paycheckId, setPaycheckId] = createSignal(transaction.paycheckId);
    const [notes, setNotes] = createSignal(transaction.notes || "");
    const [isIncome, setIsIncome] = createSignal(transaction.isIncome);
    const [recurring, setRecurring] = createSignal(
        (transaction as any).recurring || false
    );
    const [isOpen, setIsOpen] = createSignal(false);
    const [showUnsavedWarning, setShowUnsavedWarning] = createSignal(false);

    const hasChanges = createMemo(() => {
        return (
            title() !== transaction.title ||
            amount() !== Math.abs(transaction.amount) ||
            date().getTime() !== new Date(transaction.date).getTime() ||
            cardId() !== transaction.cardId ||
            categoryId() !== transaction.categoryId ||
            paycheckId() !== transaction.paycheckId ||
            notes() !== (transaction.notes || "") ||
            isIncome() !== transaction.isIncome ||
            recurring() !== ((transaction as any).recurring || false)
        );
    });

    async function handleSave() {
        await fetch(`/api/payments/${transaction.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title(),
                amount: amount() * (isIncome() ? 1 : -1),
                date: date().toISOString(),
                cardId: cardId(),
                categoryId: categoryId(),
                paycheckId: paycheckId(),
                notes: notes(),
                isIncome: isIncome(),
                recurring: recurring(),
                updatedDate: new Date().toISOString(),
            }),
        });
        window.location.reload();
    }

    function handleConfirmClose() {
        setTitle(transaction.title);
        setAmount(Math.abs(transaction.amount));
        setDate(new Date(transaction.date));
        setCardId(transaction.cardId);
        setCategoryId(transaction.categoryId);
        setPaycheckId(transaction.paycheckId);
        setNotes(transaction.notes || "");
        setIsIncome(transaction.isIncome);
        setRecurring((transaction as any).recurring || false);
        setShowUnsavedWarning(false);
        setIsOpen(false);
    }

    return (
        <Dialog
            open={isOpen()}
            onOpenChange={(open) => {
                if (!open && hasChanges()) {
                    setShowUnsavedWarning(true);
                } else {
                    setIsOpen(open);
                }
            }}
        >
            <DialogTrigger class="w-full block min-w-0">{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Edit Transaction</DialogHeader>
                <Show when={showUnsavedWarning()}>
                    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
                            <h3 class="text-lg font-semibold mb-4">
                                Unsaved Changes
                            </h3>
                            <p class="mb-4">
                                You have unsaved changes. Do you want to discard
                                them?
                            </p>
                            <div class="flex gap-4 justify-end">
                                <Button
                                    variant="outline"
                                    onclick={() => setShowUnsavedWarning(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onclick={handleConfirmClose}
                                    class="bg-red-600 hover:bg-red-700"
                                >
                                    Discard Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Show>
                <div class="p-4 grid gap-4">
                    <TransactionFormFields
                        userId={""}
                        paychecks={paychecks}
                        categories={categories}
                        cards={cards}
                        amount={amount}
                        setAmount={setAmount}
                        date={date}
                        setDate={setDate}
                        cardId={cardId}
                        setCardId={setCardId}
                        categoryId={categoryId}
                        setCategoryId={setCategoryId}
                        paycheckId={paycheckId}
                        setPaycheckId={setPaycheckId}
                        title={title}
                        setTitle={setTitle}
                        notes={notes}
                        setNotes={setNotes}
                        isIncome={isIncome}
                        setIsIncome={setIsIncome}
                        recurring={recurring}
                        setRecurring={setRecurring}
                        isMobile={false}
                    />
                    <Button onclick={handleSave} disabled={!hasChanges()}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

