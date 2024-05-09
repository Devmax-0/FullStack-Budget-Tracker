import { UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center">
      <div className="text-2xl">Track your Budget</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
