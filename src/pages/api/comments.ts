// src/pages/api/comments.ts
import { db, Author, Comment } from "astro:db";

export async function post({ request }) {
    const formData = await request.formData();
    const author = formData.get("author");
    const body = formData.get("body");

    if (typeof author === "string" && typeof body === "string") {
        // Insert author only if not exists
        const newAuthor = await db.insert(Author).values({ name: author });
        console.log(newAuthor);

        // Insert comment
        await db.insert(Comment).values({ authorId: 1, body });
        return new Response("Comment added!", { status: 201 });
    }

    return new Response("Invalid input", { status: 400 });
}
