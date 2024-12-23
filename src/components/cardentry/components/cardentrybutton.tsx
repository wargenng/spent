import CardEntry from "../cardentry";

export default function CardEntryButton({ userId }: { userId: string }) {
    return (
        <div class="flex flex-col items-center justify-center gap-2">
            <CardEntry userId={userId}>
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
            </CardEntry>
            <label class="text-xs">Add Card</label>
        </div>
    );
}
