import {
    DatePicker,
    DatePickerContent,
    DatePickerContext,
    DatePickerControl,
    DatePickerRangeText,
    DatePickerTable,
    DatePickerTableBody,
    DatePickerTableCell,
    DatePickerTableCellTrigger,
    DatePickerTableHead,
    DatePickerTableHeader,
    DatePickerTableRow,
    DatePickerView,
    DatePickerViewControl,
    DatePickerViewTrigger,
} from "@/components/ui/date-picker";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";
import type { Accessor, Setter } from "solid-js";
import { createSignal, For } from "solid-js";
import { Button } from "../ui/button";

interface DateFieldProps {
    datefield: Accessor<Date>;
    setDateField: Setter<Date>;
    inputtype: string;
}

export default function DateField({
    datefield,
    setDateField,
    inputtype,
}: DateFieldProps) {
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
                        {(() => {
                            const date = datefield();
                            if (!date || isNaN(date.getTime())) {
                                return "Select date";
                            }
                            return date.toLocaleDateString();
                        })()}
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter {inputtype}</DrawerHeader>
                <DatePicker
                    open
                    onValueChange={(e) => {
                        if (e.valueAsString && e.valueAsString[0]) {
                            // Parse the formatted date string (e.g., "November 1, 2025")
                            const selectedDate = new Date(e.valueAsString[0]);
                            if (!isNaN(selectedDate.getTime())) {
                                setDateField(selectedDate);
                                // Close the drawer after selection
                                setDrawerOpen(false);
                            }
                        }
                    }}
                    class="p-4"
                >
                    <DatePickerControl></DatePickerControl>
                    <DatePickerContent>
                        <DatePickerView view="day">
                            <DatePickerContext>
                                {(context) => (
                                    <>
                                        <DatePickerViewControl>
                                            <DatePickerViewTrigger>
                                                <DatePickerRangeText />
                                            </DatePickerViewTrigger>
                                        </DatePickerViewControl>
                                        <DatePickerTable>
                                            <DatePickerTableHead>
                                                <DatePickerTableRow>
                                                    <For
                                                        each={
                                                            context().weekDays
                                                        }
                                                    >
                                                        {(weekDay) => (
                                                            <DatePickerTableHeader>
                                                                {weekDay.short}
                                                            </DatePickerTableHeader>
                                                        )}
                                                    </For>
                                                </DatePickerTableRow>
                                            </DatePickerTableHead>
                                            <DatePickerTableBody>
                                                <For each={context().weeks}>
                                                    {(week) => (
                                                        <DatePickerTableRow>
                                                            <For each={week}>
                                                                {(day) => (
                                                                    <DatePickerTableCell
                                                                        value={
                                                                            day
                                                                        }
                                                                    >
                                                                        <DatePickerTableCellTrigger>
                                                                            {
                                                                                day.day
                                                                            }
                                                                        </DatePickerTableCellTrigger>
                                                                    </DatePickerTableCell>
                                                                )}
                                                            </For>
                                                        </DatePickerTableRow>
                                                    )}
                                                </For>
                                            </DatePickerTableBody>
                                        </DatePickerTable>
                                    </>
                                )}
                            </DatePickerContext>
                        </DatePickerView>
                        <DatePickerView view="month">
                            <DatePickerContext>
                                {(context) => (
                                    <>
                                        <DatePickerViewControl>
                                            <DatePickerViewTrigger>
                                                <DatePickerRangeText />
                                            </DatePickerViewTrigger>
                                        </DatePickerViewControl>
                                        <DatePickerTable>
                                            <DatePickerTableBody>
                                                <For
                                                    each={context().getMonthsGrid(
                                                        {
                                                            columns: 4,
                                                            format: "short",
                                                        }
                                                    )}
                                                >
                                                    {(months) => (
                                                        <DatePickerTableRow>
                                                            <For each={months}>
                                                                {(month) => (
                                                                    <DatePickerTableCell
                                                                        value={
                                                                            month.value
                                                                        }
                                                                    >
                                                                        <DatePickerTableCellTrigger>
                                                                            {
                                                                                month.label
                                                                            }
                                                                        </DatePickerTableCellTrigger>
                                                                    </DatePickerTableCell>
                                                                )}
                                                            </For>
                                                        </DatePickerTableRow>
                                                    )}
                                                </For>
                                            </DatePickerTableBody>
                                        </DatePickerTable>
                                    </>
                                )}
                            </DatePickerContext>
                        </DatePickerView>
                        <DatePickerView view="year">
                            <DatePickerContext>
                                {(context) => (
                                    <>
                                        <DatePickerViewControl>
                                            <DatePickerViewTrigger>
                                                <DatePickerRangeText />
                                            </DatePickerViewTrigger>
                                        </DatePickerViewControl>
                                        <DatePickerTable>
                                            <DatePickerTableBody>
                                                <For
                                                    each={context().getYearsGrid(
                                                        {
                                                            columns: 4,
                                                        }
                                                    )}
                                                >
                                                    {(years) => (
                                                        <DatePickerTableRow>
                                                            <For each={years}>
                                                                {(year) => (
                                                                    <DatePickerTableCell
                                                                        value={
                                                                            year.value
                                                                        }
                                                                    >
                                                                        <DatePickerTableCellTrigger>
                                                                            {
                                                                                year.label
                                                                            }
                                                                        </DatePickerTableCellTrigger>
                                                                    </DatePickerTableCell>
                                                                )}
                                                            </For>
                                                        </DatePickerTableRow>
                                                    )}
                                                </For>
                                            </DatePickerTableBody>
                                        </DatePickerTable>
                                    </>
                                )}
                            </DatePickerContext>
                        </DatePickerView>
                    </DatePickerContent>
                </DatePicker>
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
