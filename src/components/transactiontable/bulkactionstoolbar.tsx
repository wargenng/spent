import { createSignal } from "solid-js";
import type { Paycheck } from "@/types/db";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
} from "../ui/dialog";
import { ComboboxEntry } from "../common/comboboxentry";

interface BulkActionsToolbarProps {
    selectedCount: number;
    paychecks: Paycheck[];
    currentPaycheckId?: number;
    onDelete: () => Promise<void>;
    onMove: (targetPaycheckId: number) => Promise<void>;
    onCopy: (targetPaycheckId: number) => Promise<void>;
    onClearSelection: () => void;
}

export default function BulkActionsToolbar(props: BulkActionsToolbarProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = createSignal(false);
    const [isMoveDialogOpen, setIsMoveDialogOpen] = createSignal(false);
    const [isCopyDialogOpen, setIsCopyDialogOpen] = createSignal(false);
    const [targetPaycheckId, setTargetPaycheckId] = createSignal<number>(0);
    const [isLoading, setIsLoading] = createSignal(false);

    // Filter out current paycheck from options
    const availablePaychecks = () =>
        props.paychecks.filter((p) => p.id !== props.currentPaycheckId);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await props.onDelete();
            setIsDeleteDialogOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMove = async () => {
        if (!targetPaycheckId()) return;
        setIsLoading(true);
        try {
            await props.onMove(targetPaycheckId());
            setIsMoveDialogOpen(false);
            setTargetPaycheckId(0);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!targetPaycheckId()) return;
        setIsLoading(true);
        try {
            await props.onCopy(targetPaycheckId());
            setIsCopyDialogOpen(false);
            setTargetPaycheckId(0);
        } finally {
            setIsLoading(false);
        }
    };

    const openMoveDialog = () => {
        if (props.selectedCount === 0) return;
        // Set default to first available paycheck
        const first = availablePaychecks()[0];
        if (first) setTargetPaycheckId(first.id);
        setIsMoveDialogOpen(true);
    };

    const openCopyDialog = () => {
        if (props.selectedCount === 0) return;
        // Set default to first available paycheck
        const first = availablePaychecks()[0];
        if (first) setTargetPaycheckId(first.id);
        setIsCopyDialogOpen(true);
    };

    const hasSelection = () => props.selectedCount > 0;
    const canPerformActions = () => hasSelection() && availablePaychecks().length > 0;

    return (
        <>
            <div class="flex items-center gap-2 p-2 bg-muted/50 rounded-md border">
                <span class="text-sm font-medium">
                    {props.selectedCount} selected
                </span>
                <div class="flex-1" />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={props.onClearSelection}
                    disabled={!hasSelection()}
                >
                    Clear
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={openCopyDialog}
                    disabled={!canPerformActions()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-1"
                    >
                        <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Copy
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={openMoveDialog}
                    disabled={!canPerformActions()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-1"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                    Move
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                        if (hasSelection()) {
                            setIsDeleteDialogOpen(true);
                        }
                    }}
                    disabled={!hasSelection()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mr-1"
                    >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                    Delete
                </Button>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen()} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>Delete Transactions</DialogHeader>
                    <p class="py-4">
                        Are you sure you want to delete {props.selectedCount}{" "}
                        transaction{props.selectedCount > 1 ? "s" : ""}? This
                        action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isLoading()}
                        >
                            {isLoading() ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Move Dialog */}
            <Dialog open={isMoveDialogOpen()} onOpenChange={setIsMoveDialogOpen}>
                <DialogContent>
                    <DialogHeader>Move Transactions</DialogHeader>
                    <div class="py-4 space-y-4">
                        <p>
                            Move {props.selectedCount} transaction
                            {props.selectedCount > 1 ? "s" : ""} to another
                            paycheck:
                        </p>
                        <ComboboxEntry
                            setComboboxEntry={setTargetPaycheckId}
                            combos={availablePaychecks().map((p) => ({
                                id: p.id,
                                name: p.title,
                            }))}
                            inputtype="Paycheck"
                            value={() => targetPaycheckId()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsMoveDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleMove}
                            disabled={isLoading() || !targetPaycheckId()}
                        >
                            {isLoading() ? "Moving..." : "Move"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Copy Dialog */}
            <Dialog open={isCopyDialogOpen()} onOpenChange={setIsCopyDialogOpen}>
                <DialogContent>
                    <DialogHeader>Copy Transactions</DialogHeader>
                    <div class="py-4 space-y-4">
                        <p>
                            Copy {props.selectedCount} transaction
                            {props.selectedCount > 1 ? "s" : ""} to another
                            paycheck:
                        </p>
                        <p class="text-sm text-muted-foreground">
                            The date will keep the same day number but change to
                            the month of the target paycheck.
                        </p>
                        <ComboboxEntry
                            setComboboxEntry={setTargetPaycheckId}
                            combos={availablePaychecks().map((p) => ({
                                id: p.id,
                                name: p.title,
                            }))}
                            inputtype="Paycheck"
                            value={() => targetPaycheckId()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsCopyDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCopy}
                            disabled={isLoading() || !targetPaycheckId()}
                        >
                            {isLoading() ? "Copying..." : "Copy"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

