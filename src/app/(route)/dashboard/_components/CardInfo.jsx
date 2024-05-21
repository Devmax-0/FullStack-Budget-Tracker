import { BsFillPiggyBankFill } from "react-icons/bs";
import { IoReceipt } from "react-icons/io5";
import { FaWallet } from "react-icons/fa";
import { useEffect, useState } from "react";
const CardInfo = ({ budgetList }) => {
  useEffect(() => {
    budgetList && calculateCardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetList]);
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpent, setTotalSpent] = useState();
  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpent_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpent_ = totalSpent_ + Number(element.totalSpend);
    });

    setTotalBudget(totalBudget_);
    setTotalSpent(totalSpent_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-[#F1F5F9] p-7 border rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm">Total Budget</p>
              <p className="font-bold text-2xl">Rs.{totalBudget}</p>
            </div>
            <BsFillPiggyBankFill className="bg-[#283841] p-3 h-12 w-12 rounded-full text-[#F1F5F9]" />
          </div>

          <div className="bg-[#F1F5F9] p-7 border rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm">Total Spent</p>
              <p className="font-bold text-2xl">Rs.{totalSpent}</p>
            </div>
            <IoReceipt className="bg-[#283841] p-3 h-12 w-12 rounded-full text-[#F1F5F9]" />
          </div>

          <div className="bg-[#F1F5F9] p-7 border rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm">No. of Budget</p>
              <p className="font-bold text-2xl">{budgetList?.length}</p>
            </div>
            <FaWallet className="bg-[#283841] p-3 h-12 w-12 rounded-full text-[#F1F5F9]" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
