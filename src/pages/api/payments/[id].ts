import type { APIRoute } from "astro";
import { db, Payments, eq } from "astro:db";

export const DELETE: APIRoute = async (ctx) => {
    console.log(ctx.params.id);
    // await db.delete(Payments).where(eq(Payments.id, ctx.params.id));
    return new Response(null, { status: 204 });
};
