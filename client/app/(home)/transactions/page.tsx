"use client";
import { DataTable } from "@/components/DataTable/DataTabe";
import { Expenses, columns } from "@/components/DataTable/columns";
import useAuth from "@/context/AuthContext";
import { get } from "@/utils/axiosService";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const { token } = useAuth();
  const [tableData, setTableData] = useState<Expenses[]>([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getTableData = async () => {
    const tableData = await get("/expenses", config);
    setTableData(tableData);
  };

  useEffect(() => {
    getTableData();
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-[100%] p-8 bg-gray-200 dark:bg-zinc-900">
      <h4 className="font-bold text-xl self-start mb-6">Transactions</h4>
      <div className="w-full">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default Transactions;
