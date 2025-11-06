import type { Card, Category, Paycheck } from "@/types/db";
import { type Accessor, type Setter, createEffect } from "solid-js";
import { Checkbox, CheckboxControl } from "@/components/ui/checkbox";
import Amount from "../common/amount";
import CommandEntry from "../common/commandentry";
import DateField from "../common/datefield";
import InputField from "../common/inputfield";
import { ComboboxEntry } from "../common/comboboxentry";

interface TransactionFormFieldsProps {
    userId: string;
    paychecks: Paycheck[];
    categories: Category[];
    cards: Card[];
    amount: Accessor<number>;
    setAmount: Setter<number>;
    date: Accessor<Date>;
    setDate: Setter<Date>;
    cardId: Accessor<number>;
    setCardId: Setter<number>;
    categoryId: Accessor<number>;
    setCategoryId: Setter<number>;
    paycheckId: Accessor<number>;
    setPaycheckId: Setter<number>;
    title: Accessor<string>;
    setTitle: Setter<string>;
    notes: Accessor<string>;
    setNotes: Setter<string>;
    isIncome: Accessor<boolean>;
    setIsIncome: Setter<boolean>;
    recurring: Accessor<boolean>;
    setRecurring: Setter<boolean>;
    isMobile?: boolean;
}

export default function TransactionFormFields(
    props: TransactionFormFieldsProps
) {
    const {
        paychecks,
        categories,
        cards,
        amount,
        setAmount,
        date,
        setDate,
        cardId,
        setCardId,
        categoryId,
        setCategoryId,
        paycheckId,
        setPaycheckId,
        title,
        setTitle,
        notes,
        setNotes,
        isIncome,
        setIsIncome,
        setRecurring,
        isMobile = false,
    } = props;
    const incomeCategories = categories
        .filter((cat) => cat.isIncomeCategory === true)
        .sort((a, b) => a.name.localeCompare(b.name));
    const expenseCategories = categories
        .filter((cat) => cat.isIncomeCategory === false)
        .sort((a, b) => a.name.localeCompare(b.name));
    const sortedCards = [...cards].sort((a, b) => a.name.localeCompare(b.name));
    const sortedPaychecks = [...paychecks].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    createEffect(() => {
        const selectedCategoryId = categoryId();
        const currentCardId = cardId();

        if (selectedCategoryId && cards.length > 0) {
            const matchingCard = cards.find(
                (card) => card.categoryId === selectedCategoryId
            );
            if (matchingCard && matchingCard.id !== currentCardId) {
                setCardId(matchingCard.id);
            }
        }
    });

    return (
        <div class="grid gap-4 w-full">
            <div class="">
                <label
                    for="amount"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Amount
                </label>
                <div class="flex items-center gap-2">
                    $
                    {isMobile ? (
                        <Amount amount={amount} setAmount={setAmount} />
                    ) : (
                        <input
                            type="number"
                            inputMode="decimal"
                            value={amount()}
                            onChange={(e) => {
                                setAmount(Number(e.currentTarget.value));
                            }}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    )}
                </div>
            </div>
            <div class="flex gap-4">
                <Checkbox
                    class="flex items-center space-x-2"
                    onChange={(checked: boolean) => setIsIncome(checked)}
                >
                    <CheckboxControl />
                    <span class="text-sm font-medium">Income</span>
                </Checkbox>
                <Checkbox
                    class="flex items-center space-x-2"
                    onChange={(checked: boolean) => setRecurring(checked)}
                >
                    <CheckboxControl />
                    <span class="text-sm font-medium">Recurring</span>
                </Checkbox>
            </div>
            {isMobile ? (
                <InputField
                    inputfield={title}
                    setInputField={setTitle}
                    inputtype="Title"
                />
            ) : (
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name of Transaction
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
            )}
            {isMobile ? (
                <DateField
                    datefield={date}
                    setDateField={setDate}
                    inputtype="Date"
                />
            ) : (
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Date
                    </label>
                    <div class="flex items-center gap-2">
                        <input
                            type="date"
                            value={date().toISOString().split("T")[0]}
                            onChange={(e) => {
                                const selectedDate = new Date(
                                    e.currentTarget.value + "T00:00:00"
                                );
                                setDate(new Date(selectedDate));
                            }}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                </div>
            )}
            {isIncome() ? (
                isMobile ? (
                    <CommandEntry
                        commandentry={categoryId}
                        setCommandEntry={setCategoryId}
                        commands={incomeCategories.map((category) => ({
                            id: category.id,
                            name: category.name,
                        }))}
                        inputtype="Income Category"
                    />
                ) : (
                    <ComboboxEntry
                        setComboboxEntry={setCategoryId}
                        combos={incomeCategories.map((category) => ({
                            id: category.id,
                            name: category.name,
                        }))}
                        inputtype="Income Category"
                        defaultValue={categoryId()}
                    />
                )
            ) : isMobile ? (
                <CommandEntry
                    commandentry={categoryId}
                    setCommandEntry={setCategoryId}
                    commands={expenseCategories.map((category) => ({
                        id: category.id,
                        name: category.name,
                    }))}
                    inputtype="Expense Category"
                />
            ) : (
                <ComboboxEntry
                    setComboboxEntry={setCategoryId}
                    combos={expenseCategories.map((category) => ({
                        id: category.id,
                        name: category.name,
                    }))}
                    inputtype="Expense Category"
                    defaultValue={categoryId()}
                />
            )}
            {isMobile ? (
                <CommandEntry
                    commandentry={cardId}
                    setCommandEntry={setCardId}
                    commands={sortedCards.map((card) => ({
                        id: card.id,
                        name: card.name,
                    }))}
                    inputtype="Card"
                />
            ) : (
                <ComboboxEntry
                    setComboboxEntry={setCardId}
                    combos={sortedCards.map((card) => ({
                        id: card.id,
                        name: card.name,
                    }))}
                    inputtype="Card"
                    value={cardId}
                />
            )}
            {isMobile ? (
                <CommandEntry
                    commandentry={paycheckId}
                    setCommandEntry={setPaycheckId}
                    commands={sortedPaychecks.map((paycheck) => ({
                        id: paycheck.id,
                        name: paycheck.title,
                    }))}
                    inputtype="Paycheck"
                />
            ) : (
                <ComboboxEntry
                    setComboboxEntry={setPaycheckId}
                    combos={sortedPaychecks.map((paycheck) => ({
                        id: paycheck.id,
                        name: paycheck.title,
                    }))}
                    inputtype="Paycheck"
                    defaultValue={paycheckId()}
                />
            )}
            {isMobile ? (
                <InputField
                    inputfield={notes}
                    setInputField={setNotes}
                    inputtype="Notes"
                />
            ) : (
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Notes
                    </label>
                    <div class="flex items-center gap-2">
                        <input
                            type="text"
                            value={notes()}
                            onChange={(e) => {
                                setNotes(e.currentTarget.value);
                            }}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
