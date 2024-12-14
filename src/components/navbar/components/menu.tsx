import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import type { Card, Category, Paycheck } from "@/types/db";
import PaymentEntry from "../../paymententry/paymententryhandler";
import CardEntry from "@/components/cardentry/cardentry";
import PaycheckEntry from "@/components/paycheckentry/paycheckentry";

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
            <Drawer side="right">
                <DrawerTrigger class="md:hidden md:w-full block w-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-gray-500 dark:text-gray-400"
                        viewBox="0 0 24 24"
                    >
                        <g fill="currentColor">
                            <path d="M7 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m7-2a2 2 0 1 1-4 0a2 2 0 0 1 4 0m3 2a2 2 0 1 0 0-4a2 2 0 0 0 0 4" />
                            <path
                                fill-rule="evenodd"
                                d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12S5.373 0 12 0s12 5.373 12 12m-2 0c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                                clip-rule="evenodd"
                            />
                        </g>
                    </svg>
                </DrawerTrigger>
                <DrawerContent class="h-full flex flex-col gap-4">
                    <DrawerHeader>Menu</DrawerHeader>
                    <div class="flex flex-col gap-4 p-4">
                        <PaymentEntry
                            userId={userId}
                            paychecks={paychecks}
                            categories={categories}
                            cards={cards}
                        >
                            Add Purchase
                        </PaymentEntry>
                        <CardEntry userId={userId}>Add Card</CardEntry>
                        <PaycheckEntry userId={userId}>
                            Add Paycheck
                        </PaycheckEntry>
                    </div>
                </DrawerContent>
            </Drawer>

            <div class="hidden w-full lg:flex lg:w-auto lg:gap-4">
                <PaymentEntry
                    userId={userId}
                    paychecks={paychecks}
                    categories={categories}
                    cards={cards}
                >
                    Add Purchase
                </PaymentEntry>
                <CardEntry userId={userId}>Add Card</CardEntry>
                <PaycheckEntry userId={userId}>Add Paycheck</PaycheckEntry>
            </div>
        </div>
    );
}
