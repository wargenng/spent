import type { JSX } from "solid-js";
import PaycheckEntryDialog from "./components/paycheckentrydialog";
import PaycheckEntryDrawer from "./components/paycheckentrydrawer";

interface PaycheckEntryProps {
    userId: string;
    children: JSX.Element;
    buttonText?: string;
}

export default function PaycheckEntry(props: PaycheckEntryProps) {
    const { userId, buttonText } = props;

    return (
        <div>
            <div class="block lg:hidden">
                <PaycheckEntryDrawer userId={userId} buttonText={buttonText}>
                    {props.children}
                </PaycheckEntryDrawer>
            </div>
            <div class="hidden lg:block">
                <PaycheckEntryDialog userId={userId}>
                    {props.children}
                </PaycheckEntryDialog>
            </div>
        </div>
    );
}
