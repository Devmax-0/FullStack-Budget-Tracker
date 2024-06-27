import { Trash } from "lucide-react";
import { eq } from "drizzle-orm";
import { Expenses } from "../../../../../../utils/schema";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";

const ExpenseListTable = ({ expenseList, getRefreshData }) => {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted");
      getRefreshData();
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 place-items-center bg-[#F1F5F9] p-2">
        <p className="font-bold">Name</p>
        <p className="font-bold">Amount</p>
        <p className="font-bold">Date</p>
        <p className="font-bold">Action</p>
      </div>
      {expenseList?.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-4 place-items-center bg-white p-2"
        >
          <p className="text-left">{expense.name}</p>
          <p>{expense.amount}</p>
          <p>{expense.createAt}</p>
          <p>
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteExpense(expense)}
            />
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
