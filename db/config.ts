import { column, defineDb, defineTable } from "astro:db";

const Payment = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        date: column.date(),
        amount: column.number(),
        cardId: column.number({ references: () => Card.columns.id }),
        purchaseTypeId: column.number({
            references: () => PurchaseType.columns.id,
        }),
        description: column.text(),
        notes: column.text(),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

const Card = defineTable({
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

const PurchaseType = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        name: column.text(),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

export default defineDb({
    tables: { Payment, Card, PurchaseType },
});
