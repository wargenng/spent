import type { Payment as PaymentType } from "@/types/db";
import { db, Payment } from "astro:db";
import { useStore } from "@nanostores/react";
import { $authStore } from "@clerk/astro/client";

export const addPurchase = async (payment: PaymentType) => {
    const { userId } = useStore($authStore);
    console.log(userId);

    // In case the user signs out while on the page.
    if (!userId) {
        return null;
    }

    const { date, amount, cardId, purchaseTypeId, description, notes } =
        payment;

    await db.insert(Payment).values({
        userId,
        date,
        amount,
        cardId,
        purchaseTypeId,
        description,
        notes,
    });
};
