import { For, Show, createEffect, createMemo } from "solid-js";
import type { Card, Category, Paycheck } from "@/types/db";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { ComboboxEntry } from "../common/comboboxentry";
import { Checkbox, CheckboxControl } from "../ui/checkbox";
import type { TransactionFormState } from "../transactionentry/transactionentrylogic";

interface NewTransactionRowProps {
    formState: TransactionFormState;
    categories: Category[];
    cards: Card[];
    onSave: () => void;
    onCancel: () => void;
}

export default function NewTransactionRow(props: NewTransactionRowProps) {
    const incomeCategories = createMemo(() =>
        props.categories
            .filter((cat) => cat.isIncomeCategory === true)
            .sort((a, b) => a.name.localeCompare(b.name))
    );
    const expenseCategories = createMemo(() =>
        props.categories
            .filter((cat) => cat.isIncomeCategory === false)
            .sort((a, b) => a.name.localeCompare(b.name))
    );
    const sortedCards = createMemo(() =>
        [...props.cards].sort((a, b) => a.name.localeCompare(b.name))
    );

    // Reset category when income type changes
    createEffect(() => {
        const isIncome = props.formState.isIncome();
        const categories = isIncome ? incomeCategories() : expenseCategories();
        const currentCategoryId = props.formState.categoryId();
        const currentCategory = props.categories.find(
            (c) => c.id === currentCategoryId
        );

        // If current category doesn't match income type, reset to first of appropriate type
        if (
            currentCategory &&
            currentCategory.isIncomeCategory !== isIncome
        ) {
            props.formState.setCategoryId(categories[0]?.id ?? 0);
        }
    });

    return (
        <TableRow class="bg-muted/30">
            <TableCell class="w-[100px]">
                <div class="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        class="h-7 w-7 p-0"
                        onClick={props.onSave}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        class="h-7 w-7 p-0"
                        onClick={props.onCancel}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
            </TableCell>
            <TableCell class="w-[100px]">
                <input
                    type="date"
                    value={props.formState.date().toISOString().split("T")[0]}
                    onChange={(e) => {
                        const selectedDate = new Date(
                            e.currentTarget.value + "T00:00:00"
                        );
                        props.formState.setDate(new Date(selectedDate));
                    }}
                    class="text-sm rounded-lg w-full p-1.5 border border-gray-300"
                />
            </TableCell>
            <TableCell>
                <input
                    type="text"
                    value={props.formState.title()}
                    onChange={(e) =>
                        props.formState.setTitle(e.currentTarget.value)
                    }
                    placeholder="Transaction title"
                    class="text-sm rounded-lg w-full p-1.5 border border-gray-300"
                    onFocus={(e) => e.target.select()}
                />
            </TableCell>
            <TableCell>
                <div class="flex items-center gap-2">
                    <input
                        type="number"
                        inputMode="decimal"
                        value={props.formState.amount()}
                        onChange={(e) => {
                            props.formState.setAmount(
                                Number(e.currentTarget.value)
                            );
                        }}
                        placeholder="0.00"
                        class="text-sm rounded-lg w-full p-1.5 border border-gray-300"
                        onFocus={(e) => e.target.select()}
                    />
                    <Checkbox
                        class="flex items-center"
                        onChange={(checked: boolean) =>
                            props.formState.setIsIncome(checked)
                        }
                    >
                        <CheckboxControl />
                        <span class="text-xs ml-1">Income</span>
                    </Checkbox>
                </div>
            </TableCell>
            <TableCell class="w-[120px]">
                <ComboboxEntry
                    setComboboxEntry={props.formState.setCategoryId}
                    combos={
                        props.formState.isIncome()
                            ? incomeCategories().map((category) => ({
                                  id: category.id,
                                  name: category.name,
                              }))
                            : expenseCategories().map((category) => ({
                                  id: category.id,
                                  name: category.name,
                              }))
                    }
                    inputtype=""
                    value={props.formState.categoryId}
                />
            </TableCell>
            <TableCell class="w-[120px]">
                <ComboboxEntry
                    setComboboxEntry={props.formState.setCardId}
                    combos={sortedCards().map((card) => ({
                        id: card.id,
                        name: card.name,
                    }))}
                    inputtype=""
                    value={props.formState.cardId}
                />
            </TableCell>
        </TableRow>
    );
}

