"use client";

import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { useEffect, useState } from "react";
import { db } from "../../../../utils/dbConfig";
import { Expenses, Budgets } from "../../../../utils/schema";
import { sql, desc, getTableColumns, eq } from "drizzle-orm";
import BarChartDash from "./_components/BarChartDash";
import BudgetItem from "../dashboard/budget/_components/BudgetItem";
import ExpenseListTable from "../dashboard/expenses/_components/ExpenseListTable";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

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

    setExpenseList(result);
  };

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
        totalItem: sql`COALESCE(COUNT(${Expenses.id}), 0)`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    console.log("Budget List Data:", result); // Log the result

    setBudgetList(result);
    getAllExpenses();
  };

  return (
    <div className="p-2 md:p-5">
      <p className="font-bold text-3xl">Hi, {user?.fullName}</p>
      <p className="text-gray-500">
        Here Whats happening, Lets Manage your Money
      </p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDash budgetList={budgetList} />

          <ExpenseListTable
            expenseList={expenseList}
            getRefreshData={() => getBudgetList()}
          />
        </div>

        <div>
          <div className="grid gap-5">
            <h2 className="font-bold text-xl">Latest Budgets</h2>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
