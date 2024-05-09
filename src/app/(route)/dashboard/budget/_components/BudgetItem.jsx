import Link from "next/link";

const BudgetItem = ({ budget }) => {
  const calculateProgress = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  };

  return budget ? (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div className="p-5 border-2 rounded-lg hover:shadow-md cursor-pointer ">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 bg-[#F1F5F9] rounded-full">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm">{budget?.totalItem} Items</h2>
            </div>
          </div>
          <h2 className="font-bold text-lg">Rs.{budget?.amount}</h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              {budget?.totalSpend ? budget?.totalSpend : 0} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              {budget?.amount - budget?.totalSpend} Remaining
            </h2>
          </div>
          <div className="w-full bg-[#babec2] h-2 rounded-full">
            <div
              className=" bg-[#283841] h-2 rounded-full"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
};

export default BudgetItem;
