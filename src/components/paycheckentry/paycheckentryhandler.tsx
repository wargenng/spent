import PaycheckEntryForm from "./paycheckentry";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createSignal } from "solid-js";
import { Button } from "../ui/button";

interface PaycheckEntryHandlerProps {
    userId: string;
    hasCards: boolean;
    children: any;
}

export default function PaycheckEntry({
    userId,
    hasCards,
    children,
}: PaycheckEntryHandlerProps) {
    const [open, setOpen] = createSignal(false);

    return (
        <div>
            {hasCards ? (
                <PaycheckEntryForm userId={userId}>
                    {children}
                </PaycheckEntryForm>
            ) : (
                <Dialog open={open()} onOpenChange={setOpen}>
                    <DialogTrigger> {children}</DialogTrigger>
                    <DialogContent class="w-5/6">
                        <DialogHeader>
                            <DialogTitle>
                                Paycheck Entry Requires Cards
                            </DialogTitle>
                            <DialogDescription>
                                Please add a card a paycheck.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter class="flex gap-2">
                            <Button
                                onclick={() => {
                                    setOpen(false);
                                }}
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
