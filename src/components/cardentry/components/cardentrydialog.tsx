import { createSignal } from "solid-js";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../../ui/dialog";

interface CardEntryDialogProps {
    userId: string;
    children: any;
}

export default function CardEntryDialog({
    userId,
    children,
}: CardEntryDialogProps) {
    const [name, setName] = createSignal("");
    const [company, setCompany] = createSignal("");
    const [lastFour, setLastFour] = createSignal("0000");
    const [type, setType] = createSignal("Credit");

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
            }),
        });
        window.location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Add New Card</DialogHeader>
                <div class="p-4 grid gap-4">
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name of Card
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                type="text"
                                value={name()}
                                onChange={(e) => {
                                    setName(e.currentTarget.value);
                                }}
                                class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name of Company
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                type="text"
                                value={company()}
                                onChange={(e) => {
                                    setCompany(e.currentTarget.value);
                                }}
                                class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last Four Digits of Card
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                type="text"
                                value={lastFour()}
                                onChange={(e) => {
                                    setLastFour(e.currentTarget.value);
                                }}
                                class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Type of Card
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                type="text"
                                value={type()}
                                onChange={(e) => {
                                    setType(e.currentTarget.value);
                                }}
                                class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
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
                            Add new card
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
