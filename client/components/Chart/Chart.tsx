// import { IIncomeExpenseForm } from "@/utils/types";
// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   Title,
//   Tooltip,
// } from "chart.js";
// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { calculateTotalExpenseByType } from "../../utils/totalExpenses";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
// };

// function Chart(props: { expenseData: IIncomeExpenseForm[] }) {
//   const { expenseData } = props;

//   const uniqueTypes: { [key in string]?: boolean } = {};
//   const filteredExpenses: IIncomeExpenseForm[] = [];

//   expenseData?.forEach((expense: IIncomeExpenseForm) => {
//     if (!uniqueTypes[expense.type]) {
//       filteredExpenses.push(expense);
//       uniqueTypes[expense.type] = true;
//     }
//   });

//   const data = {
//     labels: filteredExpenses?.map((exp) => exp.type),
//     datasets: [
//       {
//         label: `Total expenses: ${expenseData?.length}`,
//         data: expenseData?.map((expense) =>
//           calculateTotalExpenseByType(expenseData, expense.type)
//         ),
//         backgroundColor: "#22C55E",
//       },
//     ],
//   };
//   return (
//     <div className="h-full w-full">
//       <Bar width={"900px"} height={"600px"} options={options} data={data} />
//     </div>
//   );
// }

// export default Chart;

import { IIncomeExpenseForm } from "@/utils/types";
import React, { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateTotalExpenseByType } from "../../utils/totalExpenses";

interface ChartProps {
  chartData: IIncomeExpenseForm[];
}

const Chart: FC<ChartProps> = ({ chartData }) => {
  console.log("CHART_DATA: ", chartData);
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" stackId="a" fill="#22C55E" />
          <Bar dataKey="expense" stackId="a" fill="#22C55E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
