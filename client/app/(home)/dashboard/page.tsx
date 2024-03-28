import { DataTable } from "@/components/DataTable/DataTabe";
import TotalAmount from "@/components/TotalAmount";
import React from "react";

import { Payment, columns } from "@/components/DataTable/columns";
import { ExpenseFormModal } from "@/components/ExpenseFormModal/ExpenseFormModal";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "m5gr84i9",
      amount: 350,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "m5gr84i9",
      amount: 350,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "gjalasdf",
      amount: 400,
      status: "success",
      email: "ten99@yahoo.com",
    },
  ];
}

const Dashboard = async () => {
  const data = await getData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-[100%] p-8 bg-gray-200 dark:bg-zinc-900">
      <div className="self-end">
        <ExpenseFormModal />
      </div>
      <div className="flex items-center justify-between mx-auto gap-16">
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
      <div>Chart will go here...</div>
      <div className="w-full h-full">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
