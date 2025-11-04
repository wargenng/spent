import type { APIRoute } from "astro";
import { db, Transactions, eq } from "astro:db";

export const DELETE: APIRoute = async (ctx) => {
    console.log(ctx.params.id);
    const paymentId = Number(ctx.params.id);
    if (isNaN(paymentId)) {
        return new Response("Invalid ID", { status: 400 });
    }

    await db.delete(Transactions).where(eq(Transactions.id, paymentId));
    return new Response(null, { status: 204 });
};

export const PUT: APIRoute = async (ctx) => {
    const paymentId = Number(ctx.params.id);
    if (isNaN(paymentId)) {
        return new Response("Invalid ID", { status: 400 });
    }

    const body = await ctx.request.json();
    const payment = await db
        .update(Transactions)
        .set(body)
        .where(eq(Transactions.id, paymentId));
    return new Response(JSON.stringify(payment), { status: 200 });
};
