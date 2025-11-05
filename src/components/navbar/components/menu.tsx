import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import type { Card, Category, Paycheck } from "@/types/db";
import TransactionEntry from "../../transactionentry/transactionentryhandler";
import CardEntry from "@/components/cardentry/cardentry";
import PaycheckEntry from "@/components/paycheckentry/paycheckentryhandler";

interface MenuProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
}

export default function Menu({
    userId,
    paychecks,
    categories,
    cards,
}: MenuProps) {
    return (
        <div>
            <div class="lg:hidden lg:w-full block w-auto">
                <Drawer side="right">
                    <DrawerTrigger>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="h-7 w-7 text-gray-500 dark:text-gray-400"
                        >
                            <g
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            >
                                <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" />
                                <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" />
                            </g>
                        </svg>
                    </DrawerTrigger>
                    <DrawerContent class="h-full flex flex-col gap-4">
                        <DrawerHeader>Menu</DrawerHeader>
                        <div class="flex flex-col gap-4 p-4">
                            <TransactionEntry
                                userId={userId}
                                paychecks={paychecks}
                                categories={categories}
                                cards={cards}
                            >
                                Add Purchase
                            </TransactionEntry>
                            <CardEntry userId={userId} categories={categories}>
                                Add Card
                            </CardEntry>
                            <PaycheckEntry
                                userId={userId}
                                hasCards={cards.length > 0}
                                buttonText="Add Paycheck"
                            >
                                Add Paycheck
                            </PaycheckEntry>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div class="hidden w-full lg:flex lg:w-auto lg:gap-4">
                <TransactionEntry
                    userId={userId}
                    paychecks={paychecks}
                    categories={categories}
                    cards={cards}
                >
                    Add Purchase
                </TransactionEntry>
                <CardEntry userId={userId} categories={categories}>
                    Add Card
                </CardEntry>
                <PaycheckEntry
                    userId={userId}
                    hasCards={cards.length > 0}
                    buttonText="Add Paycheck"
                >
                    Add Paycheck
                </PaycheckEntry>
            </div>
        </div>
    );
}
