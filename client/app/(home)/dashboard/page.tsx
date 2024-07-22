"use client";
import { DataTable } from "@/components/DataTable/DataTabe";
import TotalAmount from "@/components/TotalAmount";
import React, { useEffect, useState } from "react";

import Chart from "@/components/Chart/Chart";
import { Expenses, columns } from "@/components/DataTable/columns";
import useAuth from "@/context/AuthContext";
import { get } from "@/utils/axiosService";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, token } = useAuth();
  const router = useRouter();
  const [tableData, setTableData] = useState<Expenses[]>([]);
  // const tempUser = JSON.parse(localStorage.getItem("user")!);
  const [tempUser, setTempUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setTempUser(JSON.parse(user));
      }
    }
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  console.log("User: ", user);

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["expenses"],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `http://localhost:5000/expenses/${1}`,
  //       config
  //     );
  //     console.log("EXPPPPP: ", response.data);
  //   },
  // });

  // useEffect(() => {
  //   if (token === "" || token === null) {
  //     console.log("Token: ", typeof token);
  //     router.push("/login");
  //   } else {
  //     getTableData();
  //   }
  // }, [token]);

  // const getTableData = async () => {
  //   // const tempUser = JSON.parse(localStorage.getItem("user")!);
  //   const tableData = await get(`/expenses/${tempUser?.userId}`, config);
  //   setTableData(tableData);
  // };

  return (
    <div className="flex flex-col items-center justify-between p-8 h-full bg-gray-200 dark:bg-zinc-900">
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
      <div className="w-fit md:w-full">
        {/* <Chart expenseData={tableData} /> */}
      </div>
      <div className="w-fit md:w-full h-full">
        <DataTable columns={columns} data={tableData?.slice(1).slice(-5)} />
      </div>
    </div>
  );
};

export default Dashboard;
