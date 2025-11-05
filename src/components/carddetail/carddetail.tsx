import type { Card, Category } from "@/types/db";
import CardDetailDialog from "./components/carddetaildialog";
import CardDetailDrawer from "./components/carddetaildrawer";

interface CardDetailProps {
    card: Card;
    categories: Category[];
}

export default function CardDetail(props: CardDetailProps) {
    const cardGradient =
        "bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600";
    const cardShadow =
        "shadow-lg hover:shadow-xl transition-shadow duration-200";

    return (
        <div class="w-full min-w-0">
            <div class="block lg:hidden">
                <CardDetailDrawer
                    card={props.card}
                    categories={props.categories}
                >
                    <div
                        class={`w-full min-w-0 h-52 ${cardGradient} ${cardShadow} rounded-xl p-5 flex flex-col justify-between cursor-pointer transform hover:scale-[1.02] transition-transform duration-200`}
                    >
                        <div class="flex justify-start">
                            <h2 class="text-lg font-bold text-white mb-1">
                                {props.card.name}
                            </h2>
                        </div>
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-white font-semibold">
                                    {props.card.type}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-white font-bold text-lg">
                                    •••• {props.card.lastFour}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardDetailDrawer>
            </div>
            <div class="hidden lg:block">
                <CardDetailDialog
                    card={props.card}
                    categories={props.categories}
                >
                    <div
                        class={`w-full min-w-0 h-52 ${cardGradient} ${cardShadow} rounded-xl p-5 flex flex-col justify-between cursor-pointer transform hover:scale-[1.02] transition-transform duration-200`}
                    >
                        <div class="flex justify-start">
                            <h2 class="text-lg font-bold text-white mb-1">
                                {props.card.name}
                            </h2>
                        </div>
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-white font-semibold">
                                    {props.card.type}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-white font-bold text-lg">
                                    •••• {props.card.lastFour}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardDetailDialog>
            </div>
        </div>
    );
}
