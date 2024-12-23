import PaycheckEntryDialog from "./components/paycheckentrydialog";
import PaycheckEntryDrawer from "./components/paycheckentrydrawer";

interface PaycheckEntryProps {
    userId: string;
    children: any;
}

export default function PaycheckEntry({
    userId,
    children,
}: PaycheckEntryProps) {
    return (
        <div>
            <div class="block lg:hidden">
                <PaycheckEntryDrawer userId={userId}>
                    {children}
                </PaycheckEntryDrawer>
            </div>
            <div class="hidden lg:block">
                <PaycheckEntryDialog userId={userId}>
                    {children}
                </PaycheckEntryDialog>
            </div>
        </div>
    );
}
