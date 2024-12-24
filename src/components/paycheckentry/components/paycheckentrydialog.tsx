import { createSignal } from "solid-js";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";

interface PaycheckEntryProps {
    userId: string;
    children: any;
}

export default function PaycheckEntryDialog({
    userId,
    children,
}: PaycheckEntryProps) {
    const [title, setTitle] = createSignal(
        `${
            new Date().getDate() < 15 ? "Early" : "Late"
        } ${new Date().toLocaleString("default", { month: "long" })} Paycheck`
    );
    const [startDate, setStartDate] = createSignal(new Date());
    const [endDate, setEndDate] = createSignal(new Date());
    const [notes, setNotes] = createSignal("");

    async function handleSubmit(e: Event) {
        e.preventDefault();
        await fetch("/api/paychecks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                title: title(),
                startDate: startDate(),
                endDate: endDate(),
                notes: notes(),
            }),
        });
        window.location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Add New Paycheck</DialogHeader>
                <div class="p-4 grid gap-4">
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name of Paycheck
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
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Start Date
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                type="date"
                                value={startDate().toISOString().split("T")[0]}
                                onChange={(e) => {
                                    const selectedDate = new Date(
                                        e.currentTarget.value + "T00:00:00"
                                    );
                                    setStartDate(new Date(selectedDate));
                                }}
                                class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </div>
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            End Date
                        </label>
                        <div class="flex items-center gap-2">
                            <input
                                type="date"
                                value={endDate().toISOString().split("T")[0]}
                                onChange={(e) => {
                                    const selectedDate = new Date(
                                        e.currentTarget.value + "T00:00:00"
                                    );
                                    setEndDate(new Date(selectedDate));
                                }}
                                class="text-base rounded-lg w-full p-2.5 border border-gray-300"
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </div>
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
                            Add new paycheck
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
