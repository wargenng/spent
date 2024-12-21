import { createSignal } from "solid-js";
import InputField from "../common/inputfield";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "../ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "../ui/drawer";

export default function CardEntryButton({ userId }: { userId: string }) {
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
        <div class="flex flex-col items-center justify-center gap-2">
            <div class="block lg:hidden">
                <Drawer side="right">
                    <DrawerTrigger>
                        <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <rect width="24" height="24" fill="none" />
                                <path
                                    fill="#2c2c2c"
                                    d="M19 19h-2q-.425 0-.712-.288T16 18t.288-.712T17 17h2v-2q0-.425.288-.712T20 14t.713.288T21 15v2h2q.425 0 .713.288T24 18t-.288.713T23 19h-2v2q0 .425-.288.713T20 22t-.712-.288T19 21zM4 12h16V8H4zm0 8q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v5q0 .425-.288.713T21 12h-2q-2.075 0-3.537 1.463T14 17v2q0 .425-.288.713T13 20z"
                                />
                            </svg>
                        </div>
                    </DrawerTrigger>
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
            </div>
            <div class="hidden lg:block">
                <Dialog>
                    <DialogTrigger>
                        <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <rect width="24" height="24" fill="none" />
                                <path
                                    fill="#2c2c2c"
                                    d="M19 19h-2q-.425 0-.712-.288T16 18t.288-.712T17 17h2v-2q0-.425.288-.712T20 14t.713.288T21 15v2h2q.425 0 .713.288T24 18t-.288.713T23 19h-2v2q0 .425-.288.713T20 22t-.712-.288T19 21zM4 12h16V8H4zm0 8q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v5q0 .425-.288.713T21 12h-2q-2.075 0-3.537 1.463T14 17v2q0 .425-.288.713T13 20z"
                                />
                            </svg>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Add New Card</DialogHeader>
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
            </div>
            <label class="text-xs">Add Card</label>
        </div>
    );
}
