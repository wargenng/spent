import type { Card, Category, Paycheck } from "@/types/db";
import PaymentEntry from "./paymententryhandler";
import { Button } from "../ui/button";

interface PaymentEntryProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
}

export default function PaymentButton({
    userId,
    paychecks,
    categories,
    cards,
}: PaymentEntryProps) {
    return (
        <Button class="w-max h-max bg-blue-600 text-white" variant="link">
            <PaymentEntry
                userId={userId}
                paychecks={paychecks}
                categories={categories}
                cards={cards}
            >
                Add purchase
            </PaymentEntry>
        </Button>
    );
}
