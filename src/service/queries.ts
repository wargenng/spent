import { Cards, Categories, db, eq } from "astro:db";

export const getCatagories = async () => {
    return await db.select().from(Categories).all();
};

export const getUserCards = async (userId: string) => {
    return db.select().from(Cards).where(eq(Cards.userId, userId));
};
