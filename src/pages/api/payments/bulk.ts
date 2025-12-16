import type { APIRoute } from "astro";
import { db, Transactions, eq, inArray, Cards, Categories } from "astro:db";

export const POST: APIRoute = async (ctx) => {
    if (ctx.request.headers.get("Content-Type") !== "application/json") {
        return new Response("Invalid content type", { status: 400 });
    }

    const body = await ctx.request.json();
    const { action, transactionIds, targetPaycheckId, targetPaycheckStartDate } = body;

    if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
        return new Response("No transactions specified", { status: 400 });
    }

    try {
        switch (action) {
            case "delete": {
                for (const id of transactionIds) {
                    await db.delete(Transactions).where(eq(Transactions.id, id));
                }
                return new Response(
                    JSON.stringify({ message: "Transactions deleted" }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            }

            case "move": {
                if (!targetPaycheckId) {
                    return new Response("Target paycheck required", { status: 400 });
                }
                for (const id of transactionIds) {
                    await db
                        .update(Transactions)
                        .set({
                            paycheckId: targetPaycheckId,
                            updatedDate: new Date(),
                        })
                        .where(eq(Transactions.id, id));
                }
                return new Response(
                    JSON.stringify({ message: "Transactions moved" }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            }

            case "copy": {
                if (!targetPaycheckId || !targetPaycheckStartDate) {
                    return new Response("Target paycheck and start date required", { status: 400 });
                }

                // Fetch original transactions
                const originalTransactions = await db
                    .select()
                    .from(Transactions)
                    .where(inArray(Transactions.id, transactionIds));

                const targetDate = new Date(targetPaycheckStartDate);
                const targetMonth = targetDate.getMonth();
                const targetYear = targetDate.getFullYear();

                const newTransactions = [];

                for (const tx of originalTransactions) {
                    const originalDate = new Date(tx.date);
                    const dayOfMonth = originalDate.getDate();

                    // Create new date with same day but target month/year
                    // Handle edge cases like day 31 in a month with fewer days
                    const newDate = new Date(targetYear, targetMonth, dayOfMonth);
                    // If the day overflowed (e.g., Jan 31 -> Feb 31 becomes Mar 3),
                    // set to last day of target month
                    if (newDate.getMonth() !== targetMonth) {
                        newDate.setDate(0); // Go to last day of previous month (which is our target month)
                    }

                    const [inserted] = await db
                        .insert(Transactions)
                        .values({
                            userId: tx.userId,
                            title: tx.title,
                            amount: tx.amount,
                            date: newDate,
                            paycheckId: targetPaycheckId,
                            categoryId: tx.categoryId,
                            cardId: tx.cardId,
                            notes: tx.notes,
                            isIncome: tx.isIncome,
                        })
                        .returning();

                    // Fetch card and category for the new transaction
                    const [card] = await db
                        .select()
                        .from(Cards)
                        .where(eq(Cards.id, inserted.cardId))
                        .limit(1);
                    const [category] = await db
                        .select()
                        .from(Categories)
                        .where(eq(Categories.id, inserted.categoryId))
                        .limit(1);

                    newTransactions.push({
                        ...inserted,
                        card,
                        category,
                    });
                }

                return new Response(
                    JSON.stringify({ 
                        message: "Transactions copied",
                        transactions: newTransactions 
                    }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            }

            default:
                return new Response("Invalid action", { status: 400 });
        }
    } catch (error) {
        console.error("Bulk operation error:", error);
        return new Response("Internal server error", { status: 500 });
    }
};

