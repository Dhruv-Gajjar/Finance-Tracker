"use client";
import { DataTable } from "@/components/DataTable/DataTabe";
import TotalAmount from "@/components/TotalAmount";

import Chart from "@/components/Chart/Chart";
import { columns } from "@/components/DataTable/columns";
import { useTransaction } from "@/context/TransactionsContext";
import { getAllIncomes } from "@/services/income.service";
import useGlobalStore from "@/store/GlobalStore";
import { get } from "@/utils/axiosService";
import { IIncomeExpenseForm } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { username, userId, token } = useGlobalStore();
  const { latestTransactions, expenses } = useTransaction();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data: latestTransaction, isLoading: isLatestTransactionLoading } =
    useQuery({
      queryKey: ["latest-transactions"],
      queryFn: async () => {
        const latestTransaction = await get(
          `/latest-transaction/${userId}`,
          config
        );
        return latestTransaction;
      },
    });

  const { data: chartData, isLoading: isChartDataLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      const charstData = await get(`/chart-data/${userId}`, config);
      return charstData;
    },
  });

  console.log("Chart_Data: ", chartData);

  return (
    <>
      {isLatestTransactionLoading && isChartDataLoading && (
        <div className="w-full h-[80vh]">
          <p className="text-2xl font-semibold tracking-tight">Loading...</p>
        </div>
      )}

      <div className="flex flex-col items-center justify-between p-8 h-full bg-gray-200 dark:bg-zinc-900">
        <div className="self-start text-2xl text-foreground p-6">
          <p className="capitalize">Hello, {username} &#x1F44B;</p>
        </div>
        <div className="flex items-center justify-start flex-col w-full gap-4 md:flex-row">
          <TotalAmount
            title="Total Balance"
            amount={200000}
            color="text-green-600"
          />
          <TotalAmount
            title="Your Budget"
            amount={50000}
            color="text-green-600"
          />
          <TotalAmount
            title="Total Spent"
            amount={10000}
            color="text-red-600"
          />
        </div>
        <div className="w-full grid md:grid-cols-2 items-center justify-between h-full gap-4">
          {chartData && <Chart chartData={chartData.result} />}
          {/* </div> */}
          {/* <div className="w-fit md:w-full h-full"> */}
          {latestTransaction && (
            <DataTable columns={columns} data={latestTransactions} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
