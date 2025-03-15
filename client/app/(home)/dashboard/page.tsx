"use client";
import { DataTable } from "@/components/DataTable/DataTabe";
import TotalAmount from "@/components/TotalAmount";
import React, { useEffect, useState } from "react";

import Chart from "@/components/Chart/Chart";
import { columns } from "@/components/DataTable/columns";
import useAuth from "@/context/AuthContext";
import { useTransaction } from "@/context/TransactionsContext";
import useGlobalStore from "@/store/GlobalStore";
import { IIncomeExpenseForm } from "@/utils/types";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { username } = useGlobalStore();
  const { latestTransactions, incomes, expenses } = useTransaction();
  const chartData: IIncomeExpenseForm[] = [];

  return (
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
        <TotalAmount title="Total Spent" amount={10000} color="text-red-600" />
      </div>
      <div className="w-full grid md:grid-cols-2 items-center justify-between h-full gap-4">
        <Chart chartData={chartData} />
        {/* </div> */}
        {/* <div className="w-fit md:w-full h-full"> */}
        <DataTable columns={columns} data={latestTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
