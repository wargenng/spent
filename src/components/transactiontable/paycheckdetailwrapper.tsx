import { createSignal, createMemo } from "solid-js";
import type { Card, Category, Paycheck } from "@/types/db";
import TransactionTable from "./transactiontable";
import TotalVisibilityToggle from "../totalvisibilitytoggle";
import type { TransactionWithDetails } from "./types";

interface PaycheckDetailWrapperProps {
    initialTransactions: TransactionWithDetails[];
    categories: Category[];
    cards: Card[];
    paychecks: Paycheck[];
    userId: string;
    defaultPaycheckId?: number;
}

export default function PaycheckDetailWrapper(
    props: PaycheckDetailWrapperProps
) {
    const [transactions, setTransactions] = createSignal<TransactionWithDetails[]>(
        props.initialTransactions
    );

    // Calculate total reactively
    const total = createMemo(() => {
        return transactions().reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );
    });

    const formatedTotal = createMemo(() => {
        const t = total();
        return (
            (t < 0 ? "" : "+") +
            t.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })
        );
    });

    const handleTransactionAdded = (newTransaction: TransactionWithDetails) => {
        setTransactions((prev) => {
            // Add the new transaction at the beginning (most recent first)
            const updated = [newTransaction, ...prev];
            // Sort by date descending
            return updated.sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        });
    };

    return (
        <>
            <div class="flex justify-between items-center w-full">
                <TotalVisibilityToggle formatedTotal={formatedTotal} />
            </div>
            <div class="flex flex-col gap-4 w-full mt-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-left">
                    Transactions
                </h2>
                <div class="hidden w-full lg:block">
                    <TransactionTable
                        transactions={transactions}
                        categories={props.categories}
                        cards={props.cards}
                        paychecks={props.paychecks}
                        userId={props.userId}
                        defaultPaycheckId={props.defaultPaycheckId}
                        onTransactionAdded={handleTransactionAdded}
                    />
                </div>
            </div>
        </>
    );
}

