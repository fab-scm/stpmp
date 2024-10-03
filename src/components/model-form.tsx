"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
// import { Checkbox } from "@/components/ui/checkbox";

const ACCEPTED_SAMPLE_TYPES = [".geojson", ".gpkg"];

const modelFormSchema = z.object({
  example: z
    .string(),
});

type ModelFormValues = z.infer<typeof modelFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ModelFormValues> = {
  example: "",
};

export function ModelForm() {
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ModelFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="example"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Example</FormLabel>
              <FormControl>
                <Input placeholder="exampleXY" {...field} />
              </FormControl>
              <FormDescription>
                This is an example form field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Update profile</Button> */}
      </form>
    </Form>
  );
}