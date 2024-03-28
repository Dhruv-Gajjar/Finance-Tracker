type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const Payment: Payment[] = [
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
    id: "m5gr84i9",
    amount: 350,
    status: "success",
    email: "ken99@yahoo.com",
  },
];
