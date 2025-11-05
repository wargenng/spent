import type { Category } from "@/types/db";
import { createSignal } from "solid-js";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../../ui/dialog";
import InputField from "../../common/inputfield";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "../../ui/drawer";
import CommandEntry from "../../common/commandentry";

interface CardEntryDrawerProps {
    userId: string;
    categories: Category[];
    children: any;
}

export default function CardEntryDrawer({
    userId,
    categories,
    children,
}: CardEntryDrawerProps) {
    const [name, setName] = createSignal("");
    const [company, setCompany] = createSignal("");
    const [lastFour, setLastFour] = createSignal("0000");
    const [type, setType] = createSignal("Credit");
    const [categoryId, setCategoryId] = createSignal(0); // Default to "No Category"

    const sortedCategories = [...categories].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    const categoryOptions = [
        { id: 0, name: "No Category" },
        ...sortedCategories.map((cat) => ({ id: cat.id, name: cat.name })),
    ];

    async function handleSubmit(e: Event) {
        e.preventDefault();
        await fetch("/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                name: name(),
                company: company(),
                lastFour: lastFour(),
                limit: 0,
                balance: 0,
                isPrimaryChecking: false,
                type: type(),
                categoryId: categoryId() === 0 ? null : categoryId(),
            }),
        });
        window.location.reload();
    }

    return (
        <Drawer side="right">
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Add New Card</DrawerHeader>
                <div class="p-4 grid gap-4">
                    <InputField
                        inputfield={name}
                        setInputField={setName}
                        inputtype="Name"
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
                    <CommandEntry
                        commandentry={categoryId}
                        setCommandEntry={setCategoryId}
                        commands={categoryOptions}
                        inputtype="Category"
                    />
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
                            Add new card
                        </button>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
