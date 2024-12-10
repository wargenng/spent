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
import {
    DatePicker,
    DatePickerContent,
    DatePickerContext,
    DatePickerControl,
    DatePickerInput,
    DatePickerRangeText,
    DatePickerTable,
    DatePickerTableBody,
    DatePickerTableCell,
    DatePickerTableCellTrigger,
    DatePickerTableHead,
    DatePickerTableHeader,
    DatePickerTableRow,
    DatePickerTrigger,
    DatePickerView,
    DatePickerViewControl,
    DatePickerViewTrigger,
} from "@/components/ui/date-picker";
import { For } from "solid-js";

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
    return (
        <Drawer side="right">
            <DrawerTrigger class="w-full">
                <div class="flex flex-col justify-start gap-2 items-start">
                    <label class="text-sm font-medium">{inputtype}</label>
                    <Button variant="outline" class="w-full justify-start">
                        {datefield().toLocaleDateString()}
                    </Button>
                </div>
            </DrawerTrigger>
            <DrawerContent class="h-full">
                <DrawerHeader>Enter {inputtype}</DrawerHeader>
                <DatePicker
                    open
                    onValueChange={(e) => {
                        const selectedDate = new Date(
                            e.valueAsString[0] + "T00:00:00"
                        );
                        setDateField(selectedDate);
                        console.log(selectedDate);
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
