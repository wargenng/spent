import type { Setter } from "solid-js";
import { createMemo, createSignal } from "solid-js";
import type { TransactionWithDetails } from "./types";

export function useTableFilters(data: () => TransactionWithDetails[]) {
    const [searchQuery, setSearchQuery] = createSignal("");
    const [categoryFilters, setCategoryFilters] = createSignal<string[]>([]);
    const [cardFilters, setCardFilters] = createSignal<string[]>([]);

    const filteredData = createMemo(() => {
        const query = searchQuery().toLowerCase();
        const categories = categoryFilters();
        const cards = cardFilters();

        return data().filter((transaction) => {
            // Multi-column search
            const matchesSearch = query
                ? transaction.title.toLowerCase().includes(query) ||
                  transaction.category.name.toLowerCase().includes(query) ||
                  transaction.card.name.toLowerCase().includes(query) ||
                  Math.abs(transaction.amount)
                      .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                      })
                      .toLowerCase()
                      .includes(query) ||
                  new Date(transaction.date)
                      .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                      })
                      .toLowerCase()
                      .includes(query)
                : true;
            const matchesCategory =
                categories.length === 0 ||
                categories.includes(transaction.category.name);
            const matchesCard =
                cards.length === 0 || cards.includes(transaction.card.name);

            return matchesSearch && matchesCategory && matchesCard;
        });
    });

    const toggleFilter = (
        value: string,
        checked: boolean,
        setter: Setter<string[]>
    ) => {
        setter((prev) => {
            if (checked) {
                if (prev.includes(value)) {
                    return prev;
                }
                return [...prev, value];
            }
            return prev.filter((entry) => entry !== value);
        });
    };

    const describeSelection = (values: string[]) => {
        if (values.length === 0) {
            return "All";
        }
        if (values.length <= 2) {
            return values.join(", ");
        }
        return `${values.length} selected`;
    };

    const categorySummary = createMemo(() =>
        describeSelection(categoryFilters())
    );
    const cardSummary = createMemo(() => describeSelection(cardFilters()));

    const toggleCategoryFilter = (name: string, checked: boolean) => {
        toggleFilter(name, checked, setCategoryFilters);
    };

    const toggleCardFilter = (name: string, checked: boolean) => {
        toggleFilter(name, checked, setCardFilters);
    };

    const clearAllFilters = () => {
        setSearchQuery("");
        setCategoryFilters([]);
        setCardFilters([]);
    };

    const hasActiveFilters = createMemo(() => {
        return (
            searchQuery().length > 0 ||
            categoryFilters().length > 0 ||
            cardFilters().length > 0
        );
    });

    return {
        searchQuery,
        setSearchQuery,
        categoryFilters,
        cardFilters,
        filteredData,
        categorySummary,
        cardSummary,
        toggleCategoryFilter,
        toggleCardFilter,
        clearAllFilters,
        hasActiveFilters,
    };
}



