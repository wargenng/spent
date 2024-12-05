import type { Payment } from "@/types/db";

interface PaymentCardProps {
    payment: Payment;
}

export default function PaymentCard({ payment }: PaymentCardProps) {
    return (
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div>
                <div>{payment.description}</div>
            </div>
            <div>
                <p>{new Date(payment.date).toLocaleDateString("en-US")}</p>
                <p>
                    {payment.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </p>
            </div>
            <div class="space-x-2">
                <button> Edit </button>
                <form>
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            await fetch(`/api/payments/${payment.id}`, {
                                method: "DELETE",
                            });
                        }}
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}
