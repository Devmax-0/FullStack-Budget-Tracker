"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import BudgetItem from "../../budget/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "../../../../../components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import { generatePDF } from "../../../../../../utils/generatePDF";

const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpenseList();
  };

  const getExpenseList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

    setExpenseList(result);
  };

  const handleBudgetDelete = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
    }
    toast("Whole Budget Deleted");
    router.replace("/dashboard/budget");
  };

  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = () => {
    setLoading(true);
    generatePDF({
      title: budgetInfo.name,
      amount: `Rs.${budgetInfo.amount}`,
      expenses: expenseList.map((exp) => ({
        name: exp.name,
        amount: exp.amount,
        date: exp.createAt,
      })),
    });
    setLoading(false);
  };

  return (
    <div>
      <div className="p-10 ">
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <ArrowLeft onClick={() => router.back()} />
            <p className="text-2xl font-bold">My Expenses</p>
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handleGeneratePDF} disabled={loading}>
              {loading ? "Generating..." : "Generate PDF"}
            </button>
            <EditBudget
              budgetInfo={budgetInfo}
              getRefreshData={() => getBudgetInfo()}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex gap-2">
                  <Trash /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your particular Budget and
                    remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBudgetDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
          {budgetInfo ? (
            <BudgetItem budget={budgetInfo} />
          ) : (
            <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
          )}
          <AddExpense
            budgetId={params.id}
            user={user}
            getRefreshData={() => getBudgetInfo()}
          />
        </div>
        <div>
          <h2>Latest Expenses</h2>
          <ExpenseListTable
            expenseList={expenseList}
            getRefreshData={() => getBudgetInfo()}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
