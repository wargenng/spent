import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import type { Accessor, Setter } from "solid-js";
import { createSignal } from "solid-js";
import { Button } from "../ui/button";

interface CommandEntryProps {
    commandentry: Accessor<number>;
    setCommandEntry: Setter<number>;
    commands: {
        id: number;
        name: string;
    }[];
    inputtype: string;
}

export default function CommandEntry({
    commandentry,
    setCommandEntry,
    commands,
    inputtype,
}: CommandEntryProps) {
    const [drawerOpen, setDrawerOpen] = createSignal(false);

    return (
        <Drawer
            side="right"
            open={drawerOpen()}
            onOpenChange={(isOpen) => setDrawerOpen(isOpen)}
        >
            <DrawerTrigger class="w-full">
                <div class="flex flex-col justify-start gap-2 items-start">
                    <label class="text-sm font-medium">{inputtype}</label>
                    <Button variant="outline" class="w-full justify-start">
                        {
                            commands.find(
                                (command) => command.id === commandentry()
                            )?.name
                        }
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent class="h-full flex flex-col">
                <DrawerHeader>Enter {inputtype}</DrawerHeader>
                <Command
                    class="flex-1 flex flex-col min-h-0"
                    value={commandentry().toString()}
                    onValueChange={(e) => {
                        setCommandEntry(Number(e));
                        setDrawerOpen(false);
                    }}
                >
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList class="flex-1 max-h-none overflow-y-auto">
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {commands.map((command) => (
                                <CommandItem value={command.id.toString()}>
                                    {command.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                <DrawerFooter>
                    <DrawerClose class="w-full">
                        <Button variant="outline" class="w-full">
                            Done
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
