import type { APIRoute } from "astro";
import { Paychecks, db } from "astro:db";

export const POST: APIRoute = async (ctx) => {
    console.log("POST");

    if (ctx.request.headers.get("Content-Type") === "application/json") {
        const body = await ctx.request.json();
        console.log(body);
        await db.insert(Paychecks).values({
            ...body,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
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
