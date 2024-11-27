import { column, defineDb, defineTable } from "astro:db";

const Author = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text(),
    },
});

const Comment = defineTable({
    columns: {
        authorId: column.number({ references: () => Author.columns.id }),
        body: column.text(),
    },
});

const Payment = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        date: column.date(),
        amount: column.number(),
        cardId: column.number({ references: () => Card.columns.id }),
        purchaseTypeId: column.number({
            references: () => PurchaseType.columns.id,
        }),
        description: column.text(),
        notes: column.text(),
    },
});

const Card = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text(),
        lastFour: column.text(),
    },
});

const PurchaseType = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text(),
    },
});

export default defineDb({
    tables: { Author, Comment, Payment, Card, PurchaseType },
});
