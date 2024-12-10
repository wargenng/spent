export type Payment = {
    id: number;
    userId: string;
    date: Date;
    title: string;
    amount: number;
    cardId: number;
    categoryId: number;
    notes: string;
    creationDate: Date;
    updatedDate: Date;
};

export type Paycheck = {
    id: number;
    userId: string;
    startDate: Date;
    endDate: Date;
    description: string;
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
