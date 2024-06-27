"use client";

import { useState } from "react";
import Image from "next/image";
import { MdDashboard, MdMenu } from "react-icons/md";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { IoReceipt } from "react-icons/io5";
import { GiArmorDowngrade } from "react-icons/gi";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

const SideNav = ({ isOpen, toggleSidebar }) => {
  const path = usePathname();

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

  return (
    <div
      className={`fixed md:fixed z-10 py-5 px-10 bg-white rounded-lg shadow-xl md:bg-transparent md:h-screen md:p-8 ${
        isOpen ? "block" : "hidden"
      } md:block transition-transform`}
    >
      <div className="flex justify-between items-center gap-5 px-5 md:py-10 ">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={140}
          height={40}
          className="block"
        />
        <button className="md:hidden text-2xl" onClick={toggleSidebar}>
          <RxCross2 />
        </button>
      </div>
      <div className="mt-10 md:mt-0">
        {sideNavItems.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`flex gap-2 items-center text-gray-500 font-medium p-3 cursor-pointer rounded-md hover:bg-[#283841] hover:text-white mt-2 ${
                path == item.path && "bg-[#283841] text-white"
              }`}
              onClick={toggleSidebar}
            >
              <div className="md:hidden">{item.icon}</div>
              <h2 className="hidden md:block">{item.icon}</h2>
              <h2 className="block">{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
