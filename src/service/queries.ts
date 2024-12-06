import { Categories, db } from "astro:db";

export const getCatagories = async () => {
    return await db.select().from(Categories).all();
};
