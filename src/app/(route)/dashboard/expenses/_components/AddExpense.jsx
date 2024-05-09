import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useState } from "react";
import { db } from "../../../../../../utils/dbConfig";
import { toast } from "sonner";
import { Expenses, Budgets } from "../../../../../../utils/schema";
import moment from "moment";

const AddExpense = ({ budgetId, user, getRefreshData }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: expenseName,
        amount: expenseAmount,
        budgetId: budgetId,
        createAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    setExpenseName("");
    setExpenseAmount("");

    if (result) {
      getRefreshData();
      toast("New Expense Added");
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <p className="font-bold text-lg">Add Expense</p>
      <div className="mt-2">
        <p className="text-black font-medium my-1">Expense Name</p>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <p className="text-black font-medium my-1">Expense Amount</p>
        <Input
          type="number"
          placeholder="e.g. Rs.1000"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(expenseName && expenseAmount)}
        onClick={() => addNewExpense()}
        className="mt-3 w-full"
      >
        Add Expense
      </Button>
    </div>
  );
};

export default AddExpense;
