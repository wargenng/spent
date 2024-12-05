import type { APIRoute } from "astro";
import { db, Payments, eq } from "astro:db";

export const DELETE: APIRoute = async (ctx) => {
    console.log(ctx.params.id);
    const paymentId = Number(ctx.params.id);
    if (isNaN(paymentId)) {
        return new Response("Invalid ID", { status: 400 });
    }

    await db.delete(Payments).where(eq(Payments.id, paymentId));
    return new Response(null, { status: 204 });
};
