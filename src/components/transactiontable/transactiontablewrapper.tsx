import { createSignal } from "solid-js";
import type { Card, Category, Paycheck } from "@/types/db";
import TransactionTable from "./transactiontable";
import type { TransactionWithDetails } from "./types";

interface TransactionTableWrapperProps {
    initialTransactions: TransactionWithDetails[];
    categories: Category[];
    cards: Card[];
    paychecks: Paycheck[];
    userId: string;
    defaultPaycheckId?: number;
}

export default function TransactionTableWrapper(
    props: TransactionTableWrapperProps
) {
    const [transactions, setTransactions] = createSignal<TransactionWithDetails[]>(
        props.initialTransactions
    );

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
        <TransactionTable
            transactions={transactions}
            categories={props.categories}
            cards={props.cards}
            paychecks={props.paychecks}
            userId={props.userId}
            defaultPaycheckId={props.defaultPaycheckId}
            onTransactionAdded={handleTransactionAdded}
        />
    );
}

