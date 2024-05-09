"use client";

import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { eq, desc, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useEffect, useState } from "react";

const ExpensePage = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createAt: Expenses.createAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    console.log(result);

    setExpenseList(result);
  };

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
  };

  useEffect(() => {
    expenseList && getBudgetList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5">
      <p className="text-2xl font-bold">All Expenses</p>
      <ExpenseListTable
        expenseList={expenseList}
        getRefreshData={() => getBudgetList()}
      />
    </div>
  );
};

export default ExpensePage;
