import type { Card, Category, Paycheck } from "@/types/db";
import type { JSX } from "solid-js";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import TransactionFormFields from "./transactionformfields";
import { useTransactionFormState, submitTransaction } from "./transactionentrylogic";

interface TransactionDialogProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    children: JSX.Element;
}

export default function TransactionDialog({
    userId,
    paychecks,
    categories,
    cards,
    children,
}: TransactionDialogProps) {
    const formState = useTransactionFormState(cards, categories, paychecks);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        await submitTransaction(userId, formState);
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Add New Transaction</DialogHeader>
                <div class="grid gap-4 p-4 w-full">
                    <TransactionFormFields
                        userId={userId}
                        paychecks={paychecks}
                        categories={categories}
                        cards={cards}
                        isMobile={false}
                        {...formState}
                    />
                    <form>
                        <button
                            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onclick={handleSubmit}
                        >
                            <svg
                                class="me-1 -ms-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Add new transaction
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
