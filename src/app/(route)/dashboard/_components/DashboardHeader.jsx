import { MdMenu } from "react-icons/md";
import { UserButton } from "@clerk/nextjs";

const DashboardHeader = ({ toggleSidebar }) => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center">
      <button className="md:hidden text-2xl" onClick={toggleSidebar}>
        <MdMenu />
      </button>
      <div className="text-2xl">Track your Budget</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
