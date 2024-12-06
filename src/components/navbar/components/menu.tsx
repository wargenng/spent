import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import PaymentEntry from "../../paymententry/paymententry";
import type { Category } from "@/types/db";

interface MenuProps {
    userId: string;
    categories: Category[];
}

export default function Menu({ userId, categories }: MenuProps) {
    return (
        <div>
            <Drawer side="right">
                <DrawerTrigger>
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        ></path>
                    </svg>
                </DrawerTrigger>
                <DrawerContent class="h-full">
                    <DrawerHeader>Menu</DrawerHeader>
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="/"
                                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <PaymentEntry
                                userId={userId}
                                categories={categories}
                            >
                                <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Add Purchase
                                </a>
                            </PaymentEntry>
                        </li>
                    </ul>
                </DrawerContent>
            </Drawer>

            <div class="hidden w-full md:block md:w-auto">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a
                            href="/"
                            class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                            aria-current="page"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <PaymentEntry userId={userId} categories={categories}>
                            <a class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                Add Purchase
                            </a>
                        </PaymentEntry>
                    </li>
                </ul>
            </div>
        </div>
    );
}
