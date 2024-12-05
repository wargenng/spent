import type { Payment } from "@/types/db";

interface PaymentCardProps {
    payment: Payment;
}

export default function PaymentCard({ payment }: PaymentCardProps) {
    return (
        <div class="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 space-y-2">
            <div class="flex justify-between w-full items-center">
                <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {payment.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </h5>
                <p class="font-base text-gray-700 dark:text-gray-400 m-0">
                    {new Date(payment.date).toLocaleDateString("en-US")}
                </p>
            </div>
            <p class="font-base text-gray-700 dark:text-gray-400 m-0">
                {payment.description}
            </p>
            <form>
                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        await fetch(`/api/payments/${payment.id}`, {
                            method: "DELETE",
                        });
                        window.location.reload();
                    }}
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Delete
                </button>
            </form>
        </div>
    );
}
