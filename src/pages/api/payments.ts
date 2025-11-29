import type { APIRoute } from "astro";
import { db, Transactions, eq } from "astro:db";
import { Categories, Cards } from "astro:db";

export const POST: APIRoute = async (ctx) => {
    console.log("POST");

    if (ctx.request.headers.get("Content-Type") === "application/json") {
        const body = await ctx.request.json();

        console.log(body);
        const [inserted] = await db
            .insert(Transactions)
            .values({
                ...body,
                date: new Date(body.date),
            })
            .returning();

        // Fetch the related card and category to return complete transaction
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

        return new Response(
            JSON.stringify({
                transaction: inserted,
                card,
                category,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    return new Response(null, { status: 400 });
};
