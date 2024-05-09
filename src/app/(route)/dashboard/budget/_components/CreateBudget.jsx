"use client";

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
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets } from "../../../../../../utils/schema";
import { toast } from "sonner";

const CreateBudget = ({ getFreshData }) => {
  const [emojieIcon, setEmojieIcon] = useState("😄");
  const [EmojiePicker, setEmojiePicker] = useState(false);

  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const { user } = useUser();
  const handleCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: budgetName,
        amount: budgetAmount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojieIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      getFreshData();
      toast("New Budget Created");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-[#F1F5F9] p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create Budget</h2>
          </div>
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
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <p className="text-black font-medium my-1">Budget Amount</p>
                <Input
                  type="number"
                  placeholder="e.g. 5000Rs."
                  onChange={(e) => setBudgetAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  disabled={!(budgetName && budgetAmount)}
                  className="mt-5 w-full"
                  onClick={() => handleCreateBudget()}
                >
                  Create Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
