import type { JSX } from "solid-js";
import PaycheckEntryDialog from "./components/paycheckentrydialog";
import PaycheckEntryDrawer from "./components/paycheckentrydrawer";

interface PaycheckEntryProps {
    userId: string;
    children: JSX.Element;
}

export default function PaycheckEntry(props: PaycheckEntryProps) {
    const { userId } = props;

    return (
        <div>
            <div class="block lg:hidden">
                <PaycheckEntryDrawer userId={userId}>
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
