"use client";

import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { IoReceipt } from "react-icons/io5";
import { GiArmorDowngrade } from "react-icons/gi";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const sideNavItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budget",
      icon: <BsFillPiggyBankFill />,
      path: "/dashboard/budget",
    },
    {
      id: 3,
      name: "Expenses",
      icon: <IoReceipt />,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: <GiArmorDowngrade />,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5">
      <Image src={"/logo.svg"} alt="logo" width={140} height={40} />
      <div className="mt-10">
        {sideNavItems.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`flex gap-2 items-center text-gray-500 font-medium p-3 cursor-pointer rounded-md hover:bg-[#283841] hover:text-white mt-2 ${
                path == item.path && `bg-[#283841] text-white`
              }`}
            >
              <h2>{item.icon}</h2>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center s">
        <div className="flex justify-center gap-2 items-center">
          <UserButton />
          <h2>Profile</h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
