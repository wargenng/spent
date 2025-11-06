import type {
    Card,
    Category,
    Paycheck,
    Paycheck as PaycheckType,
    Transaction,
} from "@/types/db";
import { createSignal, Show } from "solid-js";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import TransactionCard from "./transactioncard";

interface PaycheckItemProps {
    paycheck: PaycheckType;
    transactions: Transaction[];
    cards: Card[];
    categories: Category[];
    paychecks: Paycheck[];
}

export default function PaycheckItem({
    paycheck,
    transactions,
    cards,
    categories,
    paychecks,
}: PaycheckItemProps) {
    const [isOpen, setIsOpen] = createSignal(false);

    const total = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );
    const formatedTotal =
        (total < 0 ? "" : "+") +
        total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <Collapsible open={isOpen()} onOpenChange={setIsOpen}>
            <div class="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <CollapsibleTrigger class="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div class="flex flex-col gap-2 items-start flex-1 text-left">
                        <div class="flex justify-between w-full items-center">
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white m-0 text-left">
                                {paycheck.title}
                            </h2>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white m-0 text-right">
                                {formatedTotal}
                            </h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 m-0 text-left">
                            {new Date(paycheck.startDate).toLocaleDateString(
                                "en-US",
                                {
                                    month: "2-digit",
                                    day: "2-digit",
                                }
                            )}{" "}
                            -{" "}
                            {new Date(paycheck.endDate).toLocaleDateString(
                                "en-US",
                                {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class={`text-gray-400 dark:text-gray-500 transition-transform ${
                            isOpen() ? "rotate-180" : ""
                        }`}
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Show when={sortedTransactions.length > 0}>
                        <div class="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                            <div class="flex flex-col gap-0 w-full">
                                {sortedTransactions.map(
                                    (
                                        transaction: Transaction,
                                        index: number
                                    ) => {
                                        const card = cards.find(
                                            (c: Card) =>
                                                c.id === transaction.cardId
                                        );
                                        const category = categories.find(
                                            (cat: Category) =>
                                                cat.id ===
                                                transaction.categoryId
                                        );
                                        if (!card || !category) {
                                            return null;
                                        }
                                        const isLast =
                                            index ===
                                            sortedTransactions.length - 1;
                                        return (
                                            <div
                                                class={
                                                    isLast
                                                        ? ""
                                                        : "border-b border-gray-400 dark:border-gray-500 pb-4 mb-4"
                                                }
                                            >
                                                <TransactionCard
                                                    payment={transaction}
                                                    card={card}
                                                    category={category}
                                                    cards={cards}
                                                    categories={categories}
                                                    paychecks={paychecks}
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </Show>
                    <Show when={sortedTransactions.length === 0}>
                        <div class="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                            <p class="text-gray-500 dark:text-gray-400 text-center py-4">
                                No transactions for this paycheck period
                            </p>
                        </div>
                    </Show>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}
