"use client";

import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { user } = useUser();
  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace("/dashboard/budget");
    }

    console.log("Result", result);
  };

  useEffect(() => {
    user && checkUserBudget();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block bg-[#F1F5F9] shadow-sm">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
