import CardEntryDialog from "./components/cardentrydialog";
import CardEntryDrawer from "./components/cardentrydrawer";
interface CardEntryProps {
    userId: string;
    children: any;
}
export default function CardEntry({ userId, children }: CardEntryProps) {
    return (
        <div>
            <div class="block lg:hidden">
                <CardEntryDrawer userId={userId}>{children}</CardEntryDrawer>
            </div>
            <div class="hidden lg:block">
                <CardEntryDialog userId={userId}>{children}</CardEntryDialog>
            </div>
        </div>
    );
}
