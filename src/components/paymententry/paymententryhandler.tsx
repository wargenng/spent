import type { Card, Category } from "@/types/db";
import { toaster } from "@kobalte/core";
import {
    Toast,
    ToastContent,
    ToastDescription,
    ToastList,
    ToastProgress,
    ToastRegion,
    ToastTitle,
} from "@/components/ui/toast";
import { Button } from "../ui/button";

interface PaymentEntryProps {
    userId: string;
    categories: Category[];
    cards: Card[];
    children: any;
}

export default function PaymentEntry({
    userId,
    categories,
    cards,
    children,
}: PaymentEntryProps) {
    const showToast = () => {
        toaster.show((props) => (
            <Toast toastId={props.toastId}>
                <ToastContent>
                    <ToastTitle>Scheduled: Catch up</ToastTitle>
                    <ToastDescription>
                        Friday, February 10, 2023 at 5:57 PM
                    </ToastDescription>
                </ToastContent>
                <ToastProgress />
            </Toast>
        ));
    };

    return (
        <>
            <div onClick={showToast}>{children}</div>
            <ToastRegion swipeDirection="up">
                <ToastList />
            </ToastRegion>
        </>
    );
}
