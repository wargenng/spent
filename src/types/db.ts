export type Transaction = {
    id: number;
    userId: string;
    date: Date;
    title: string;
    amount: number;
    cardId: number;
    categoryId: number;
    paycheckId: number;
    notes: string;
    isIncome: boolean;
    creationDate: Date;
    updatedDate: Date;
};

export type Paycheck = {
    id: number;
    userId: string;
    title: string;
    startDate: Date;
    endDate: Date;
    notes: string;
    creationDate: Date;
    updatedDate: Date;
};

export type Card = {
    id: number;
    userId: string;
    name: string;
    company: string;
    lastFour: string;
    type: string;
    limit: number;
    balance: number;
    isPrimaryChecking: boolean;
    categoryId: number | null;
    creationDate: Date;
    updatedDate: Date;
};

export type Category = {
    id: number;
    userId: string;
    name: string;
    isIncomeCategory: boolean;
    creationDate: Date;
    updatedDate: Date;
};
