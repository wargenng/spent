import { createSignal } from "solid-js";
import type { JSX } from "solid-js";
import DateField from "@/components/common/datefield";
import InputField from "@/components/common/inputfield";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface PaycheckEntryProps {
    userId: string;
    children: JSX.Element;
}

export default function PaycheckEntryDrawer(props: PaycheckEntryProps) {
    const { userId, children } = props;
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
        <Drawer side="right">
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Add New Paycheck</DrawerHeader>
                <div class="p-4 grid gap-4">
                    <InputField
                        inputfield={title}
                        setInputField={setTitle}
                        inputtype="Title"
                    />
                    <DateField
                        datefield={startDate}
                        setDateField={setStartDate}
                        inputtype="Start Date"
                    />
                    <DateField
                        datefield={endDate}
                        setDateField={setEndDate}
                        inputtype="End Date"
                    />
                    <InputField
                        inputfield={notes}
                        setInputField={setNotes}
                        inputtype="Notes"
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
                            Add new paycheck
                        </button>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
