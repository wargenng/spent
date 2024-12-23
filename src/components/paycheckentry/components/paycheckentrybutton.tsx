import PaycheckEntry from "../paycheckentryhandler";

interface PaycheckEntryButtonProps {
    userId: string;
    hasCards: boolean;
}

export default function PaycheckEntryButton({
    userId,
    hasCards,
}: PaycheckEntryButtonProps) {
    return (
        <div class="flex flex-col items-center justify-center gap-2">
            <PaycheckEntry userId={userId} hasCards={hasCards}>
                <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#2c2c2c"
                            d="M12 4.75c.69 0 1.25.56 1.25 1.25v4.75H18a1.25 1.25 0 1 1 0 2.5h-4.75V18a1.25 1.25 0 1 1-2.5 0v-4.75H6a1.25 1.25 0 1 1 0-2.5h4.75V6c0-.69.56-1.25 1.25-1.25"
                        />
                    </svg>
                </div>
            </PaycheckEntry>
            <label class="text-xs">Add Check</label>
        </div>
    );
}
