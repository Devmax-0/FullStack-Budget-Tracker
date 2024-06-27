"use client";

import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    user && checkUserBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex">
      <div className="md:w-16 lg:w-64">
        <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="p-2 md:p-5">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
