import { Cards, Categories, db, desc, eq, Paychecks } from "astro:db";

export const getCatagories = async () => {
    return await db.select().from(Categories).all();
};

export const getUserCards = async (userId: string) => {
    return db.select().from(Cards).where(eq(Cards.userId, userId));
};

export const getUserPaychecks = async (userId: string) => {
    return db
        .select()
        .from(Paychecks)
        .where(eq(Paychecks.userId, userId))
        .orderBy(desc(Paychecks.endDate));
};
