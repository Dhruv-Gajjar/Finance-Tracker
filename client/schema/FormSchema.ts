import { z } from "zod";

// export const FormSchema = z.object({
//   title: z.string({
//     required_error: "Name is required",
//   }),
//   description: z.string({
//     required_error: "Description is required",
//   }),
//   amount: z.string({
//     required_error: "Amount is required",
//   }),
//   category: z.string({
//     message: "Please select a category!",
//   }),
//   type: z.string({
//     required_error: "Category is required",
//   }),
//   date: z.date({
//     required_error: "A date of birth is required.",
//   }),
// });

export const FormSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  amount: z.number().or(z.string()),
  category: z.string().nonempty({ message: "Category is required" }),
  date: z.date().or(z.string().nonempty({ message: "Date is required" })),
  userId: z.number().optional(),
  token: z.string().optional(),
  type: z.string().optional(),
  categoryId: z.number().optional(),
});
