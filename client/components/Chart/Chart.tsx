import { ExpenseTypes, Expenses } from "@/utils/types";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { calculateTotalExpenseByType } from "../../utils/totalExpenses";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

function Chart(props: { expenseData: Expenses[] }) {
  const { expenseData } = props;

  const uniqueTypes: { [key in ExpenseTypes]?: boolean } = {};
  const filteredExpenses: Expenses[] = [];

  expenseData?.forEach((expense: Expenses) => {
    if (!uniqueTypes[expense.type]) {
      filteredExpenses.push(expense);
      uniqueTypes[expense.type] = true;
    }
  });

  const data = {
    labels: filteredExpenses?.map((exp) => exp.type),
    datasets: [
      {
        label: `Total expenses: ${expenseData?.length}`,
        data: expenseData?.map((expense) =>
          calculateTotalExpenseByType(expenseData, expense.type)
        ),
        backgroundColor: "#22C55E",
      },
    ],
  };
  return (
    <div className="w-[400px] h-60 md:w-full">
      <Bar width={"900px"} height={"250px"} options={options} data={data} />
    </div>
  );
}

export default Chart;
