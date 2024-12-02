import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { Payment } from "@/types/db";
import { useState } from "react";

export const PaymentEntry = () => {
    const [payment, setPayment] = useState({
        date: new Date(),
        amount: 0,
        cardId: 0,
        purchaseTypeId: 0,
        description: "",
        notes: "",
    } as Payment);

    return (
        <Drawer>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone.
                    </DrawerDescription>
                </DrawerHeader>
                <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                        id="date"
                        name="date"
                        type="date"
                        value={payment.date.toISOString().split("T")[0]}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                date: new Date(e.target.value),
                            })
                        }
                    />

                    <Label htmlFor="amount">Amount</Label>
                    <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={payment.amount}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                amount: parseFloat(e.target.value),
                            })
                        }
                    />

                    <Label htmlFor="card">Card Used</Label>
                    <Input
                        id="card"
                        name="card"
                        value={payment.cardId}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                cardId: parseInt(e.target.value),
                            })
                        }
                    />

                    <Label htmlFor="purchaseType">Purchase Type</Label>
                    <Input
                        id="purchaseType"
                        name="purchaseType"
                        value={payment.purchaseTypeId}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                purchaseTypeId: parseInt(e.target.value),
                            })
                        }
                    />

                    <Label htmlFor="desc">Description</Label>
                    <Input
                        id="desc"
                        name="desc"
                        value={payment.description}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                description: e.target.value,
                            })
                        }
                    />

                    <Label htmlFor="notes">Notes</Label>
                    <Input
                        id="notes"
                        name="notes"
                        value={payment.notes}
                        onChange={(e) =>
                            setPayment({ ...payment, notes: e.target.value })
                        }
                    />
                </div>
                <DrawerFooter>
                    <form method="POST" className="grid p-6">
                        <Button type="submit">Submit</Button>
                    </form>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
