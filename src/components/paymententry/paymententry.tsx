import type { Card, Category, Paycheck } from "@/types/db";
import { createSignal } from "solid-js";

import Amount from "../common/amount";
import CommandEntry from "../common/commandentry";
import DateField from "../common/datefield";
import InputField from "../common/inputfield";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "../ui/drawer";

interface PaymentEntryProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    children: any;
}

export default function PaymentEntry({
    userId,
    paychecks,
    categories,
    cards,
    children,
}: PaymentEntryProps) {
    const [amount, setAmount] = createSignal(0);
    const [date, setDate] = createSignal(new Date());
    const [cardId, setCardId] = createSignal(1);
    const [categoryId, setCategoryId] = createSignal(1);
    const [paycheckId, setPaycheckId] = createSignal(1);
    const [title, setTitle] = createSignal("");
    const [notes, setNotes] = createSignal("");

    async function handleSubmit(e: Event) {
        e.preventDefault();
        await fetch("/api/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title(),
                amount: amount(),
                date: date(),
                paycheckId: paycheckId(),
                categoryId: categoryId(),
                cardId: cardId(),
                notes: notes(),
            }),
        });
        window.location.reload();
    }

    return (
        <div>
            <Drawer side="right">
                <DrawerTrigger>{children}</DrawerTrigger>
                <DrawerContent class="h-full">
                    <DrawerHeader>Add New Purchase</DrawerHeader>
                    <div class="grid gap-4 p-4 w-full">
                        <div class="grid gap-4 w-full">
                            <InputField
                                inputfield={title}
                                setInputField={setTitle}
                                inputtype="Title"
                            />
                            <div class="">
                                <label
                                    for="amount"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Amount
                                </label>
                                <div class="flex items-center gap-2">
                                    $
                                    <Amount
                                        amount={amount}
                                        setAmount={setAmount}
                                    />
                                </div>
                            </div>
                            <DateField
                                datefield={date}
                                setDateField={setDate}
                                inputtype="Date"
                            />
                            <CommandEntry
                                commandentry={cardId}
                                setCommandEntry={setCardId}
                                commands={cards.map((card) => ({
                                    id: card.id,
                                    name: card.name,
                                }))}
                                inputtype="Card"
                            />
                            <CommandEntry
                                commandentry={categoryId}
                                setCommandEntry={setCategoryId}
                                commands={categories.map((category) => ({
                                    id: category.id,
                                    name: category.name,
                                }))}
                                inputtype="Category"
                            />
                            <CommandEntry
                                commandentry={paycheckId}
                                setCommandEntry={setPaycheckId}
                                commands={paychecks.map((paycheck) => ({
                                    id: paycheck.id,
                                    name: paycheck.title,
                                }))}
                                inputtype="Paycheck"
                            />
                            <InputField
                                inputfield={notes}
                                setInputField={setNotes}
                                inputtype="Notes"
                            />
                        </div>
                        <form>
                            <button
                                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onclick={handleSubmit}
                            >
                                <svg
                                    class="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                Add new purchase
                            </button>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
