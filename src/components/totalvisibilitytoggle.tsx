import { createSignal, onMount, Show } from "solid-js";
import { Button } from "./ui/button";

interface TotalVisibilityToggleProps {
    formatedTotal: string;
}

export default function TotalVisibilityToggle({
    formatedTotal,
}: TotalVisibilityToggleProps) {
    const [isVisible, setIsVisible] = createSignal(false);

    onMount(() => {
        const stored = localStorage.getItem("totalVisibility");
        if (stored !== null) {
            setIsVisible(stored === "true");
        }
    });

    function toggleVisibility() {
        const newValue = !isVisible();
        setIsVisible(newValue);
        localStorage.setItem("totalVisibility", String(newValue));
    }

    return (
        <div class="flex items-center justify-between w-full">
            <Show when={isVisible()}>
                <h1 class="m-0 text-5xl font-bold">{formatedTotal}</h1>
            </Show>
            <Show when={!isVisible()}>
                <h1 class="m-0 text-5xl font-bold">••••••</h1>
            </Show>
            <Button
                variant="ghost"
                onclick={toggleVisibility}
                class="p-2 h-auto w-auto"
                aria-label={isVisible() ? "Hide total" : "Show total"}
            >
                <Show when={isVisible()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-600 dark:text-gray-400"
                    >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </Show>
                <Show when={!isVisible()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-600 dark:text-gray-400"
                    >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                </Show>
            </Button>
        </div>
    );
}
