import type { APIRoute } from "astro";
import { Cards, db, eq } from "astro:db";

export const POST: APIRoute = async (ctx) => {
    console.log("POST");

    if (ctx.request.headers.get("Content-Type") === "application/json") {
        const body = await ctx.request.json();
        console.log(body);
        await db.insert(Cards).values({
            ...body,
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

export const PUT: APIRoute = async (ctx) => {
    if (ctx.request.headers.get("Content-Type") === "application/json") {
        const body = await ctx.request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return new Response(
                JSON.stringify({ error: "Card ID is required" }),
                { status: 400 }
            );
        }

        await db
            .update(Cards)
            .set({
                ...updateData,
                updatedDate: new Date(),
            })
            .where(eq(Cards.id, id));

        return new Response(
            JSON.stringify({
                message: "update successful",
            }),
            {
                status: 200,
            }
        );
    }
    return new Response(null, { status: 400 });
};
