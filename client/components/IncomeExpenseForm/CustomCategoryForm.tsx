import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import useAuth from "@/context/AuthContext";
import { createCustomCategory } from "@/services/customCategory.service";
import { ICustomCategoryForm, Types } from "@/utils/types";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { PopoverContent } from "@radix-ui/react-popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleOff } from "lucide-react";
import React, { FC } from "react";
import { SubmitHandler, useForm, UseFormReset } from "react-hook-form";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useToast } from "../ui/use-toast";

interface CustomCategoryFormProps {
  type: string;
}

const CustomCategoryForm: FC<CustomCategoryFormProps> = ({ type }) => {
  const { user } = useAuth();
  const form = useForm<ICustomCategoryForm>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { status, error, mutate } = useMutation({
    mutationFn: createCustomCategory,
    onSuccess: (newCategory) => {
      queryClient.setQueryData(["custom-category"], newCategory);
      console.log("NEW_CAT: ", newCategory);
      toast({
        value: "default",
        title: "Category created succesfully!",
        className: "bg-green-600",
      });
    },
    onError: (error) => {
      toast({
        value: "warning",
        title: "Failed to create category!",
        className: "bg-red-600",
      });
    },
  });

  const onSubmit: SubmitHandler<ICustomCategoryForm> = async (
    data: ICustomCategoryForm
  ) => {
    mutate({
      name: data?.categoryName,
      icon: data?.icon,
      categoryType: type,
      userId: user?.id!,
    });
    form.setValue("categoryName", "");
    form.setValue("icon", "");
  };

  if (status === "error") {
    return <div className="text-2xl mx-auto text-red-600">{error.message}</div>;
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Transaction description (optional)
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full h-[100px]">
                        {form.watch("icon") ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-5xl" role="img">
                              {field.value}
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Click to change
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <CircleOff width={48} height={48} />
                            <p className="text-xs text-muted-foreground">
                              Click to select
                            </p>
                          </div>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Picker
                        data={data}
                        onEmojiSelect={(emoji: { native: string }) => {
                          console.log("Emoji: ", emoji);
                          field.onChange(emoji.native);
                        }}
                        theme={"auto"}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  This is how your category will appear in the app!
                </FormDescription>
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={status === "pending" ? true : false}
            >
              {status === "pending" ? "Loading..." : "Add"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  form.reset();
                }}
              >
                Cancle
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default CustomCategoryForm;
