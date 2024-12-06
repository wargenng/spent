import type { Category, Card } from "@/types/db";
import { createSignal } from "solid-js";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CardEntryProps {
    userId: string;
    categories: Category[];
    children: any;
}

export default function CardEntry({ userId, children }: CardEntryProps) {
    const [Card, setCard] = createSignal({
        userId: userId,
        name: "",
        company: "",
        lastFour: "0000",
        type: "credit",
    } as Card);

    return (
        <div>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Card</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
