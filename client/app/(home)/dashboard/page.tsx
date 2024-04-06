"use client";
import { DataTable } from "@/components/DataTable/DataTabe";
import TotalAmount from "@/components/TotalAmount";
import React, { useEffect, useState } from "react";

import { Expenses, columns } from "@/components/DataTable/columns";
import useAuth from "@/context/AuthContext";
import { get } from "@/utils/axiosService";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const [tableData, setTableData] = useState<Expenses[]>([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (token === "" && token === null) {
      router.push("/login");
    } else {
      getTableData();
    }
  }, [token]);

  const getTableData = async () => {
    const tableData = await get("/expenses", config);
    setTableData(tableData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-[100%] p-8 bg-gray-200 dark:bg-zinc-900">
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
        <DataTable columns={columns} data={tableData?.slice(1).slice(-5)} />
      </div>
    </div>
  );
};

export default Dashboard;
