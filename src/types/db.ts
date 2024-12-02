export type Payment = {
    id: number;
    userId: string;
    date: Date;
    amount: number;
    cardId: number;
    purchaseTypeId: number;
    description: string;
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
    type: "credit" | "debit" | "savings";
    creationDate: Date;
    updatedDate: Date;
};

export type PurchaseType = {
    id: number;
    userId: string;
    name: string;
    creationDate: Date;
    updatedDate: Date;
};
