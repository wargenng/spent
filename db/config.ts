import { column, defineDb, defineTable } from "astro:db";

const Payments = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        date: column.date(),
        amount: column.number(),
        cardId: column.number({ references: () => Cards.columns.id }),
        purchaseTypeId: column.number({
            references: () => PurchaseTypes.columns.id,
        }),
        description: column.text(),
        notes: column.text(),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

const Cards = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        name: column.text(),
        company: column.text(),
        lastFour: column.text(),
        type: column.text({ default: "credit" }),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

const PurchaseTypes = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        name: column.text(),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

export default defineDb({
    tables: { Payments, Cards, PurchaseTypes },
});
