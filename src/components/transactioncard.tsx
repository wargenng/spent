import type { Card, Category, Paycheck, Transaction } from "@/types/db";
import TransactionDetail from "./transactiondetail/transactiondetail";

interface TransactionCardProps {
    payment: Transaction;
    card: Card;
    category: Category;
    cards: Card[];
    categories: Category[];
    paychecks: Paycheck[];
}

export default function TransactionCard({
    payment,
    card,
    category,
    cards,
    categories,
    paychecks,
}: TransactionCardProps) {
    return (
        <TransactionDetail
            transaction={payment}
            card={card}
            category={category}
            cards={cards}
            categories={categories}
            paychecks={paychecks}
        >
            <div class="w-full cursor-pointer">
                <div class="w-full space-y-1">
                    <div class="flex justify-between w-full items-center">
                        <p class="text-base font-bold text-gray-900 dark:text-white m-0 text-left">
                            {payment.title}
                        </p>
                        <div class="flex items-center gap-2">
                            <h5 class="text-base tracking-tight text-gray-900 dark:text-white text-right">
                                {payment.amount.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </h5>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="text-gray-400 dark:text-gray-500"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="space-y-1 text-left">
                            <div class="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-400 lg:text-sm">
                                <p class="font-base m-0">{category.name}</p>
                                <span class="text-gray-500">•</span>
                                <p class="font-base m-0">
                                    {(() => {
                                        const paymentDate = new Date(
                                            payment.date
                                        );
                                        const today = new Date();
                                        const yesterday = new Date(today);
                                        yesterday.setDate(today.getDate() - 1);

                                        if (
                                            paymentDate.toDateString() ===
                                            today.toDateString()
                                        ) {
                                            return "Today";
                                        } else if (
                                            paymentDate.toDateString() ===
                                            yesterday.toDateString()
                                        ) {
                                            return "Yesterday";
                                        } else {
                                            return paymentDate.toLocaleDateString(
                                                "en-US"
                                            );
                                        }
                                    })()}
                                </p>
                            </div>
                            <p class="font-base text-xs text-gray-700 dark:text-gray-400 m-0 lg:text-sm">
                                {card.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TransactionDetail>
    );
}
