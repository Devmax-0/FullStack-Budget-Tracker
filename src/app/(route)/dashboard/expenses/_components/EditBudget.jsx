"use client";

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../../../components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Budgets } from "../../../../../../utils/schema";
import { db } from "../../../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditBudget = ({ budgetInfo, getRefreshData }) => {
  const [emojieIcon, setEmojieIcon] = useState(budgetInfo?.icon);
  const [EmojiePicker, setEmojiePicker] = useState(false);

  const [budgetName, setBudgetName] = useState(budgetInfo?.name);
  const [budgetAmount, setBudgetAmount] = useState(budgetInfo?.amount);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: budgetName,
        amount: budgetAmount,
        icon: emojieIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      getRefreshData();
      toast("Budget Updated");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2" disabled={!budgetInfo}>
            <PenBox className="w-5" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <Button
                variant="outline"
                onClick={() => setEmojiePicker(!EmojiePicker)}
                className="m-2"
                size="lg"
              >
                {emojieIcon}
              </Button>

              <div className="absolute z-10">
                <EmojiPicker
                  open={EmojiePicker}
                  onEmojiClick={(e) => {
                    setEmojieIcon(e.emoji), setEmojiePicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <p className="text-black font-medium my-1">Budget Name</p>
                <Input
                  placeholder="e.g. Home Decor"
                  defaultValue={budgetInfo?.name}
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <p className="text-black font-medium my-1">Budget Amount</p>
                <Input
                  type="number"
                  placeholder="e.g. 5000Rs."
                  defaultValue={budgetInfo?.amount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  className="mt-5 w-full"
                  onClick={() => onUpdateBudget()}
                >
                  Update Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
