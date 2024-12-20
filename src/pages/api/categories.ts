import type { APIRoute } from "astro";
import { Categories, db } from "astro:db";

export const GET: APIRoute = async () => {
    const categories = await db.select().from(Categories).all();
    return new Response(JSON.stringify(categories), {
        headers: { "Content-Type": "application/json" },
    });
};
