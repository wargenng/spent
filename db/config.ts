import { column, defineDb, defineTable, desc } from "astro:db";

const Payments = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        title: column.text(),
        date: column.date(),
        amount: column.number(),
        cardId: column.number({ references: () => Cards.columns.id }),
        categoryId: column.number({
            references: () => Categories.columns.id,
        }),
        paycheckId: column.number({ references: () => Paychecks.columns.id }),
        notes: column.text(),
        isIncome: column.boolean({ default: false }),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

const Paychecks = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        startDate: column.date(),
        endDate: column.date(),
        description: column.text(),
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
        limit: column.number(),
        balance: column.number(),
        isPrimaryChecking: column.boolean({ default: false }),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

const Categories = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        userId: column.text(),
        name: column.text(),
        creationDate: column.date({ default: new Date() }),
        updatedDate: column.date({ default: new Date() }),
    },
});

export default defineDb({
    tables: { Payments, Cards, Categories, Paychecks },
});
