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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
// import { Checkbox } from "@/components/ui/checkbox";

const ACCEPTED_SAMPLE_TYPES = [".geojson", ".gpkg"];

const generalFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 3 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      message: "Please provide a valid email adress",
    })
    .email()
    .optional(),
  study: z.boolean().default(false).optional(),
  studytitle: z.string().min(5, {
    message: "The title of your study must be at least 5 characters.",
  }),
  doi: z.string().url({ message: "Please enter a valid DOI." }),
  authors: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  abstract: z.string().max(1500).min(5),
  field: z.string({
    required_error: "Please select the scientific field of your model.",
  }),
  objective: z.string().max(1500).min(5),
  purpose: z.string().max(1500).min(5),
  type: z.string({
    required_error: "Please select your model type.",
  }),
  variable: z.string(),
  variableunit: z.string(),
  traindomain: z.string(),
  trainwhere: z.string(),
  trainsamples: z
    .any()
    .refine(
      (files) => ACCEPTED_SAMPLE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  preddomain: z.string(),
  predwhere: z.string(),
  software: z.string(),
  dependencies: z.string(),
  codeavailability: z.string(),
  dataavailability: z.string(),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<GeneralFormValues> = {
  abstract: "",
  authors: [{ value: "Max Mustermann" }],
};

export function GeneralForm() {
  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "authors",
    control: form.control,
  });

  function onSubmit(data: GeneralFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const study = useWatch({
    control: form.control,
    name: "study",
    defaultValue: false,
  });

  const traindomain = useWatch({
    control: form.control,
    name: "traindomain",
    defaultValue: "global",
  });

  const preddomain = useWatch({
    control: form.control,
    name: "preddomain",
    defaultValue: "global",
  });

  console.log(study);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="modelXY" {...field} />
              </FormControl>
              <FormDescription>
                This is the public display name for your model. You can still
                change this later. Please try to chose something easy to
                understand.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@test.com" {...field} />
              </FormControl>
              <FormDescription>
                Your e-mail adress, so that others can contact you concerning
                your model{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="study"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study</FormLabel>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormDescription>
                  Decide if you want to provide information on the study that
                  belongs to the model.
                </FormDescription>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {study ? (
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="studytitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Study title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Environmental study to find out..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The title of the belonging study.{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOI</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://doi.org/10.1111/2041-210X.13650"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The DOI of the belonging study.{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`authors.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Author(s)
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add the authors of the model and/or study.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                Add author
              </Button>
            </div>
            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abstract</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    If you want you can provide the abstract to your study.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : null}
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scientific field</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Soil science" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Meterology">Meteorology</SelectItem>
                  <SelectItem value="Landscape ecology">
                    Landscape ecology
                  </SelectItem>
                  <SelectItem value="Oceanography">Oceanography</SelectItem>
                  <SelectItem value="Earth science">Earth Sciences</SelectItem>
                  <SelectItem value="Environmental science">
                    Oceanography
                  </SelectItem>
                  <SelectItem value="Geology">Geology</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Soil science">Soil science</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Please select the scientific field of your model.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model objective</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                What does the model do in general? (Mapping and Interpolation,
                Inference and Explanation, Forecast and Transfer) (see Zurell et
                al., 2020) State specific research questions or hypotheses.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model purpose</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Clearly define the environmental problem the ML model aims to
                address and its potential impact.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Classification" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Classification">Classification</SelectItem>
                  <SelectItem value="Regression">Regression</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target variable</FormLabel>
              <FormControl>
                <Input placeholder="Species richness" {...field} />
              </FormControl>
              <FormDescription>
                The target variable your model aims to predict
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variableunit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit (Target variable)</FormLabel>
              <FormControl>
                <Input placeholder="Absolute count" {...field} />
              </FormControl>
              <FormDescription>
                The unit of the target variable your model aims to predict
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="traindomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spatial training domain</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Global" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="vegetation">
                    According to vegetation
                  </SelectItem>
                  <SelectItem value="climatic">Climatic</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The spatial training domain of your model.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {traindomain !== "global" ? (
          <FormField
            control={form.control}
            name="trainwhere"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spatial training domain description</FormLabel>
                <FormControl>
                  <Input placeholder="Boreal forest regions..." {...field} />
                </FormControl>
                <FormDescription>
                  Please provide further detail on where you have trained your
                  model.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <FormField
          control={form.control}
          name="trainsamples"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sample locations (file)</FormLabel>
              <FormControl>
                <Input
                  id="trainsamples"
                  type="file"
                  accept=".geojson, .gpkg"
                  placeholder="Sample file"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a <code>.geojson</code> or <code>.gpkg</code> with your
                sample locations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preddomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spatial prediction domain</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Global" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="vegetation">
                    According to vegetation
                  </SelectItem>
                  <SelectItem value="climatic">Climatic</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The spatial prediction domain of your model.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {preddomain !== "global" ? (
          <FormField
            control={form.control}
            name="predwhere"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spatial prediction domain description</FormLabel>
                <FormControl>
                  <Input placeholder="Boreal forest regions..." {...field} />
                </FormControl>
                <FormDescription>
                  Please provide further detail on where your model is
                  applicable to make reliable predictions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <FormField
          control={form.control}
          name="software"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Software</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Please provide information about the software used to develop
                the model (e.g. programming language, modelling framework)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dependencies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dependencies</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Please provide 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codeavailability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code availability</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.github.com/fab-scm/LPD"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide an URL to the location where one can access the
                model development code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataavailability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data availability</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://cloudbox.com/fab-scm/LPD"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please provide an URL to the location where one can access the
                data used for mode development (samples and predictors).
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
