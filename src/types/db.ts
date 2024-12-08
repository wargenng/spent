export type Payment = {
    id: number;
    userId: string;
    date: Date;
    amount: number;
    cardId: number;
    categoryId: number;
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
    type: string;
    creationDate: Date;
    updatedDate: Date;
};

export type Category = {
    id: number;
    userId: string;
    name: string;
    creationDate: Date;
    updatedDate: Date;
};
