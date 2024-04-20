import { DollarSign } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const TotalAmount = (props: {
  title: string;
  amount: number;
  color?: string;
}) => {
  const { title, amount, color } = props;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <p className="flex items-center text-[15px] text-gray-400 w-60">
            {title}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`flex items-center text-3xl font-bold ${color}`}>
          <span>
            <DollarSign className="h-8 w-8" />
          </span>{" "}
          {amount}
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalAmount;
