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
import { ICustomCategoryForm } from "@/utils/types";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { PopoverContent } from "@radix-ui/react-popover";
import { CircleOff } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

function CustomCategoryForm() {
  const form = useForm<ICustomCategoryForm>();

  const onSubmit = async (data: ICustomCategoryForm) => {
    console.log("CustomCategory: ", data);
    // reset();
  };

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input defaultValue={""} {...field} />
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
                        onEmojiSelect={(emoji: { native: string }) =>
                          field.onChange(emoji.native)
                        }
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
        </form>
      </Form>
    </div>
  );
}

export default CustomCategoryForm;
