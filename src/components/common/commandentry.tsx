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
    return (
        <Drawer side="right">
            <DrawerTrigger class="w-full">
                <div class="flex flex-col justify-start gap-2 items-start">
                    <label class="text-sm font-medium">{inputtype}</label>
                    <Button variant="outline" class="w-full justify-start">
                        {commandentry()}
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter {inputtype}</DrawerHeader>
                <Command
                    value={commandentry().toString()}
                    onValueChange={(e) => {
                        setCommandEntry(Number(e));
                        console.log(e);
                    }}
                >
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
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
