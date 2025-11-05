import type { Card, Category } from "@/types/db";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../../ui/dialog";
import { createSignal, createMemo, Show } from "solid-js";
import { ComboboxEntry } from "../../common/comboboxentry";
import { Button } from "../../ui/button";

interface CardDetailDialogProps {
    card: Card;
    categories: Category[];
    children: any;
}

export default function CardDetailDialog({
    card,
    categories,
    children,
}: CardDetailDialogProps) {
    const [name, setName] = createSignal(card.name);
    const [company, setCompany] = createSignal(card.company);
    const [lastFour, setLastFour] = createSignal(card.lastFour);
    const [type, setType] = createSignal(card.type);
    const [limit, setLimit] = createSignal(card.limit?.toString() || "0");
    const [balance, setBalance] = createSignal(card.balance?.toString() || "0");
    const [categoryId, setCategoryId] = createSignal<number | null>(
        card.categoryId ?? null
    );
    const [isOpen, setIsOpen] = createSignal(false);
    const [showUnsavedWarning, setShowUnsavedWarning] = createSignal(false);

    const sortedCategories = [...categories].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    const categoryOptions = [
        { id: 0, name: "No Category" },
        ...sortedCategories.map((cat) => ({ id: cat.id, name: cat.name })),
    ];

    const hasChanges = createMemo(() => {
        const currentCategoryId = categoryId();
        const originalCategoryId = card.categoryId ?? null;
        return (
            name() !== card.name ||
            company() !== card.company ||
            lastFour() !== card.lastFour ||
            type() !== card.type ||
            Number(limit()) !== (card.limit || 0) ||
            Number(balance()) !== (card.balance || 0) ||
            (currentCategoryId === 0 ? null : currentCategoryId) !==
                originalCategoryId
        );
    });

    async function handleSave() {
        await fetch("/api/cards", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: card.id,
                name: name(),
                company: company(),
                lastFour: lastFour(),
                type: type(),
                limit: Number(limit()),
                balance: Number(balance()),
                categoryId: categoryId() === 0 ? null : categoryId(),
            }),
        });
        window.location.reload();
    }

    function handleConfirmClose() {
        setName(card.name);
        setCompany(card.company);
        setLastFour(card.lastFour);
        setType(card.type);
        setLimit(card.limit?.toString() || "0");
        setBalance(card.balance?.toString() || "0");
        setCategoryId(card.categoryId ?? null);
        setShowUnsavedWarning(false);
        setIsOpen(false);
    }

    return (
        <Dialog
            open={isOpen()}
            onOpenChange={(open) => {
                if (!open && hasChanges()) {
                    setShowUnsavedWarning(true);
                } else {
                    setIsOpen(open);
                }
            }}
        >
            <DialogTrigger class="w-full block min-w-0">{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>{card.name}</DialogHeader>
                <Show when={showUnsavedWarning()}>
                    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
                            <h3 class="text-lg font-semibold mb-4">
                                Unsaved Changes
                            </h3>
                            <p class="mb-4">
                                You have unsaved changes. Do you want to discard
                                them?
                            </p>
                            <div class="flex gap-4 justify-end">
                                <Button
                                    variant="outline"
                                    onclick={() => setShowUnsavedWarning(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onclick={handleConfirmClose}
                                    class="bg-red-600 hover:bg-red-700"
                                >
                                    Discard Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Show>
                <div class="p-4 grid gap-4">
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name of Card
                        </label>
                        <input
                            type="text"
                            value={name()}
                            onInput={(e) => setName(e.currentTarget.value)}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Company
                        </label>
                        <input
                            type="text"
                            value={company()}
                            onInput={(e) => setCompany(e.currentTarget.value)}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last Four Digits
                        </label>
                        <input
                            type="text"
                            value={lastFour()}
                            onInput={(e) => setLastFour(e.currentTarget.value)}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Type
                        </label>
                        <input
                            type="text"
                            value={type()}
                            onInput={(e) => setType(e.currentTarget.value)}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Limit
                        </label>
                        <input
                            type="number"
                            value={limit()}
                            onInput={(e) => setLimit(e.currentTarget.value)}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Balance
                        </label>
                        <input
                            type="number"
                            value={balance()}
                            onInput={(e) => setBalance(e.currentTarget.value)}
                            class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <ComboboxEntry
                        setComboboxEntry={(id) => setCategoryId(id === 0 ? null : id)}
                        combos={categoryOptions}
                        inputtype="Category"
                        defaultValue={categoryId() ?? 0}
                    />
                    <Button onclick={handleSave} disabled={!hasChanges()}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
