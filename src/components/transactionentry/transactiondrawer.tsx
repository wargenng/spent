import type { Card, Category, Paycheck } from "@/types/db";
import type { JSX } from "solid-js";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import TransactionFormFields from "./transactionformfields";
import { useTransactionFormState, submitTransaction } from "./transactionentrylogic";

interface TransactionDrawerProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    children: JSX.Element;
    defaultPaycheckId?: number;
}

export default function TransactionDrawer({
    userId,
    paychecks,
    categories,
    cards,
    children,
    defaultPaycheckId,
}: TransactionDrawerProps) {
    const formState = useTransactionFormState(cards, categories, paychecks, defaultPaycheckId);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        await submitTransaction(userId, formState);
    }

    return (
        <Drawer side="right">
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Add New Transaction</DrawerHeader>
                <div class="grid gap-4 p-4 w-full">
                    <TransactionFormFields
                        userId={userId}
                        paychecks={paychecks}
                        categories={categories}
                        cards={cards}
                        isMobile={true}
                        hidePaycheckSelector={defaultPaycheckId !== undefined}
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
            </DrawerContent>
        </Drawer>
    );
}
