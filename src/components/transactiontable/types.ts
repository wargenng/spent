import type { Card, Category, Transaction } from "@/types/db";

export type TransactionWithDetails = Transaction & {
	category: Category;
	card: Card;
};

