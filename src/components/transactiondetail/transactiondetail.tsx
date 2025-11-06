import type { Card, Category, Paycheck, Transaction } from "@/types/db";
import TransactionDetailDialog from "./components/transactiondetaildialog";
import TransactionDetailDrawer from "./components/transactiondetaildrawer";

interface TransactionDetailProps {
    transaction: Transaction;
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

