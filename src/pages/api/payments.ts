import type { APIRoute } from "astro";
import { db, Transactions } from "astro:db";

export const POST: APIRoute = async (ctx) => {
    console.log("POST");

    if (ctx.request.headers.get("Content-Type") === "application/json") {
        const body = await ctx.request.json();

        console.log(body);
        await db.insert(Transactions).values({
            ...body,
            date: new Date(body.date),
        });

        return new Response(
            JSON.stringify({
                message: "upload successful",
            }),
            {
                status: 200,
            }
        );
    }
    return new Response(null, { status: 400 });
};
