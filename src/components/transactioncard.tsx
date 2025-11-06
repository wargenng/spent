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
                <div class="w-full space-y-2">
                    <div class="flex justify-between w-full items-center">
                        <p class="text-base font-bold text-gray-900 dark:text-white m-0 text-left">
                            {payment.title}
                        </p>
                        <h5 class="text-base tracking-tight text-gray-900 dark:text-white text-right">
                            {payment.amount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </h5>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="space-y-1 text-left">
                            <p class="font-base text-gray-700 dark:text-gray-400 m-0">
                                {category.name}
                            </p>
                            <p class="font-base text-gray-700 dark:text-gray-400 m-0">
                                {card.name}
                            </p>
                            <p class="font-base text-gray-700 dark:text-gray-400 m-0">
                                {(() => {
                                    const paymentDate = new Date(payment.date);
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
                    </div>
                </div>
            </div>
        </TransactionDetail>
    );
}

