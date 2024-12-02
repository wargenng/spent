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

export const PaymentEntry = () => {
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
                    <Input id="date" name="date" type="date" />

                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" name="amount" type="number" />

                    <Label htmlFor="card">Card Used</Label>
                    <Input id="card" name="card" />

                    <Label htmlFor="purchaseType">Purchase Type</Label>
                    <Input id="purchaseType" name="purchaseType" />

                    <Label htmlFor="desc">Description</Label>
                    <Input id="desc" name="desc" />

                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" name="notes" />
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
