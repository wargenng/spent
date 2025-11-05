import type { Card, Category } from "@/types/db";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "../../ui/drawer";
import { createSignal, createMemo, Show } from "solid-js";
import CommandEntry from "../../common/commandentry";
import InputField from "../../common/inputfield";
import { Button } from "../../ui/button";

interface CardDetailDrawerProps {
    card: Card;
    categories: Category[];
    children: any;
}

export default function CardDetailDrawer({
    card,
    categories,
    children,
}: CardDetailDrawerProps) {
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

    function handleClose() {
        if (hasChanges()) {
            setShowUnsavedWarning(true);
        } else {
            setIsOpen(false);
        }
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
        <Drawer
            side="bottom"
            open={isOpen()}
            onOpenChange={(isOpen) => {
                if (!isOpen && hasChanges()) {
                    setShowUnsavedWarning(true);
                } else {
                    setIsOpen(isOpen);
                }
            }}
        >
            <DrawerTrigger class="w-full block min-w-0">
                {children}
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>{card.name}</DrawerHeader>
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
                    <InputField
                        inputfield={name}
                        setInputField={setName}
                        inputtype="Name of Card"
                    />
                    <InputField
                        inputfield={company}
                        setInputField={setCompany}
                        inputtype="Company"
                    />
                    <InputField
                        inputfield={lastFour}
                        setInputField={setLastFour}
                        inputtype="Last Four Digits"
                    />
                    <InputField
                        inputfield={type}
                        setInputField={setType}
                        inputtype="Type"
                    />
                    <InputField
                        inputfield={limit}
                        setInputField={setLimit}
                        inputtype="Limit"
                    />
                    <InputField
                        inputfield={balance}
                        setInputField={setBalance}
                        inputtype="Balance"
                    />
                    <CommandEntry
                        commandentry={() => categoryId() ?? 0}
                        setCommandEntry={(id) =>
                            setCategoryId(id === 0 ? null : id)
                        }
                        commands={categoryOptions}
                        inputtype="Category"
                    />
                    <Button onclick={handleSave} disabled={!hasChanges()}>
                        Save Changes
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
