import type { Card, Category, Paycheck } from "@/types/db";
import { createSignal } from "solid-js";

import { Checkbox, CheckboxControl } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import CommandEntry from "../common/commandentry";
import DateField from "../common/datefield";
import InputField from "../common/inputfield";

interface PaymentEntryProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    children: any;
}

export default function PaymentDialog({
    userId,
    paychecks,
    categories,
    cards,
    children,
}: PaymentEntryProps) {
    const [amount, setAmount] = createSignal(0);
    const [date, setDate] = createSignal(new Date());
    const [cardId, setCardId] = createSignal(cards[0].id);
    const [categoryId, setCategoryId] = createSignal(categories[0].id);
    const [paycheckId, setPaycheckId] = createSignal(paychecks[0].id);
    const [title, setTitle] = createSignal("");
    const [notes, setNotes] = createSignal("");
    const [isIncome, setIsIncome] = createSignal(false);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        await fetch("/api/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                title: title(),
                amount: amount() * (isIncome() ? 1 : -1),
                date: date(),
                paycheckId: paycheckId(),
                categoryId: categoryId(),
                cardId: cardId(),
                notes: notes(),
                isIncome: isIncome(),
            }),
        });
        window.location.reload();
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>Add New Purchase</DialogHeader>
                    <div class="grid gap-4 p-4 w-full">
                        <div class="grid gap-4 w-full">
                            <div class="">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name of Transation
                                </label>
                                <div class="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={title()}
                                        onChange={(e) => {
                                            setTitle(e.currentTarget.value);
                                        }}
                                        class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                            </div>
                            <div class="">
                                <label
                                    for="amount"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Amount
                                </label>
                                <div class="flex items-center gap-2">
                                    $
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        value={amount()}
                                        onChange={(e) => {
                                            setAmount(
                                                Number(e.currentTarget.value)
                                            );
                                        }}
                                        class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                        onFocus={(e) => e.target.select()}
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
                            <Checkbox
                                class="flex items-center space-x-2"
                                onChange={(checked) => setIsIncome(checked)}
                            >
                                <CheckboxControl />
                                <span class="text-sm font-medium">Income</span>
                            </Checkbox>
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
                </DialogContent>
            </Dialog>
        </div>
    );
}
