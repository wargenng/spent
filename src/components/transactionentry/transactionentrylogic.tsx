import type { Card, Category, Paycheck } from "@/types/db";
import { createSignal, type Accessor, type Setter } from "solid-js";

export interface TransactionFormState {
    amount: Accessor<number>;
    setAmount: Setter<number>;
    date: Accessor<Date>;
    setDate: Setter<Date>;
    cardId: Accessor<number>;
    setCardId: Setter<number>;
    categoryId: Accessor<number>;
    setCategoryId: Setter<number>;
    paycheckId: Accessor<number>;
    setPaycheckId: Setter<number>;
    title: Accessor<string>;
    setTitle: Setter<string>;
    notes: Accessor<string>;
    setNotes: Setter<string>;
    isIncome: Accessor<boolean>;
    setIsIncome: Setter<boolean>;
    recurring: Accessor<boolean>;
    setRecurring: Setter<boolean>;
}

function getLastUsedDate(): Date {
    if (typeof window === "undefined") {
        return new Date();
    }
    const lastDate = localStorage.getItem("lastTransactionDate");
    if (lastDate) {
        const parsedDate = new Date(lastDate);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
        }
    }
    return new Date();
}

export function useTransactionFormState(
    cards: Card[],
    categories: Category[],
    paychecks: Paycheck[],
    defaultPaycheckId?: number
): TransactionFormState {
    const [amount, setAmount] = createSignal(0);
    const [date, setDate] = createSignal(getLastUsedDate());

    const expenseCategories = categories.filter(
        (cat) => cat.isIncomeCategory === false
    );
    const defaultCategoryId =
        expenseCategories[0]?.id ?? categories[0]?.id ?? 0;

    const matchingCard = cards.find(
        (card) => card.categoryId === defaultCategoryId
    );
    const defaultCardId = matchingCard?.id ?? cards[0]?.id ?? 0;
    const [cardId, setCardId] = createSignal(defaultCardId);

    const [categoryId, setCategoryId] = createSignal(defaultCategoryId);
    const initialPaycheckId = defaultPaycheckId ?? paychecks[0]?.id ?? 0;
    const [paycheckId, setPaycheckId] = createSignal(initialPaycheckId);
    const [title, setTitle] = createSignal("");
    const [notes, setNotes] = createSignal("");
    const [isIncome, setIsIncome] = createSignal(false);
    const [recurring, setRecurring] = createSignal(false);

    return {
        amount,
        setAmount,
        date,
        setDate,
        cardId,
        setCardId,
        categoryId,
        setCategoryId,
        paycheckId,
        setPaycheckId,
        title,
        setTitle,
        notes,
        setNotes,
        isIncome,
        setIsIncome,
        recurring,
        setRecurring,
    };
}

export async function submitTransaction(
    userId: string,
    state: TransactionFormState,
    skipReload?: boolean
): Promise<{ transaction: any; card: any; category: any } | null> {
    const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            title: state.title(),
            amount: state.amount() * (state.isIncome() ? 1 : -1),
            date: state.date(),
            paycheckId: state.paycheckId(),
            categoryId: state.categoryId(),
            cardId: state.cardId(),
            notes: state.notes(),
            isIncome: state.isIncome(),
            recurring: state.recurring(),
        }),
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    // Save the date to localStorage for next time
    if (typeof window !== "undefined") {
        localStorage.setItem("lastTransactionDate", state.date().toISOString());
    }

    if (skipReload) {
        return data;
    }

    window.location.reload();
    return null;
}
