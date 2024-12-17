import type { Card, Category, Payment } from "@/types/db";

interface PaymentCardProps {
    payment: Payment;
    card: Card;
    category: Category;
}

export default function PaymentCard({
    payment,
    card,
    category,
}: PaymentCardProps) {
    return (
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 space-y-2">
            <div class="flex justify-between w-full items-center">
                <p class="text-base font-bold  text-gray-900 dark:text-white m-0">
                    {payment.title}
                </p>
                <h5 class="text-base tracking-tight text-gray-900 dark:text-white">
                    {payment.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </h5>
            </div>
            <div class="flex justify-between items-end">
                <div class="space-y-1">
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
                                return paymentDate.toLocaleDateString("en-US");
                            }
                        })()}
                    </p>
                </div>
                <div class="flex gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                        class="text-gray-700 dark:text-gray-400"
                    >
                        <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        >
                            <path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.1 2.1 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621" />
                            <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
                        </g>
                    </svg>
                    <form>
                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                await fetch(`/api/payments/${payment.id}`, {
                                    method: "DELETE",
                                });
                                window.location.reload();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                viewBox="0 0 24 24"
                                class="text-gray-700 dark:text-gray-400"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
