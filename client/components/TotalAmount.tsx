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
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="flex items-center font-bold text-md w-60">
            <span>
              <DollarSign className="h-6 w-6" />
            </span>{" "}
            {title}
          </p>
        </CardTitle>
        {/* <CardDescription>{Card Description}</CardDescription> */}
      </CardHeader>
      <CardContent>
        {/* <p className={`text-3xl font-bold ${color}`}>$ {amount}</p> */}
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
