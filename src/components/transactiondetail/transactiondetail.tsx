import type { Card, Category, Paycheck, Transaction } from "@/types/db";
import TransactionDetailDialog from "./components/transactiondetaildialog";
import TransactionDetailDrawer from "./components/transactiondetaildrawer";

interface TransactionDetailProps {
    transaction: Transaction;
    card: Card;
    category: Category;
    cards: Card[];
    categories: Category[];
    paychecks: Paycheck[];
    children: any;
}

export default function TransactionDetail(props: TransactionDetailProps) {
    return (
        <div class="w-full">
            <div class="block lg:hidden">
                <TransactionDetailDrawer
                    transaction={props.transaction}
                    card={props.card}
                    category={props.category}
                    cards={props.cards}
                    categories={props.categories}
                    paychecks={props.paychecks}
                >
                    {props.children}
                </TransactionDetailDrawer>
            </div>
            <div class="hidden lg:block">
                <TransactionDetailDialog
                    transaction={props.transaction}
                    card={props.card}
                    category={props.category}
                    cards={props.cards}
                    categories={props.categories}
                    paychecks={props.paychecks}
                >
                    {props.children}
                </TransactionDetailDialog>
            </div>
        </div>
    );
}

