
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CompetitionService from "@/services/competition-service";
import FileUploadSection from "./FileUploadSection";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  hostName: z.string().min(3, {
    message: "Host name must be at least 3 characters.",
  }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
  maxAge: z.number().min(13).max(100).optional(),
  rules: z.string().min(10, {
    message: "Rules must be at least 10 characters.",
  }),
  prizes: z.string().optional(),
  algorithm: z.string({
    required_error: "Please select a scoring algorithm.",
  }),
});

export type FileState = {
  file: File | null;
  preview: string | null;
  name: string;
};

type CompetitionFormProps = {
  onSuccess: () => void;
};

const CompetitionForm = ({ onSuccess }: CompetitionFormProps) => {
  const [trainData, setTrainData] = React.useState<FileState>({
    file: null,
    preview: null,
    name: "",
  });
  const [testData, setTestData] = React.useState<FileState>({
    file: null,
    preview: null,
    name: "",
  });
  const [demoFile, setDemoFile] = React.useState<FileState>({
    file: null,
    preview: null,
    name: "",
  });
  const [idealData, setIdealData] = React.useState<FileState>({
    file: null,
    preview: null,
    name: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      hostName: "",
      rules: "",
      prizes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Check if all required files are uploaded
    if (!trainData.file || !testData.file || !demoFile.file) {
      toast.error("Please upload all required dataset files");
      return;
    }

    // Validate dates
    if (values.startDate >= values.endDate) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      // Create FormData for submission
      const formData = new FormData();
      
      // Add form values
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else {
            formData.append(key, String(value));
          }
        }
      });
      
      // Add files
      formData.append('trainData', trainData.file as File);
      formData.append('testData', testData.file as File);
      formData.append('demoFile', demoFile.file as File);
      
      // Add ideal data if provided
      if (idealData.file) {
        formData.append('idealData', idealData.file);
      }

      // Submit to API
      const result = await CompetitionService.createCompetition(formData);
      
      if (result.success) {
        toast.success("Competition created successfully!");
        onSuccess();
      } else {
        toast.error("Failed to create competition");
      }
    } catch (error) {
      console.error("Error creating competition:", error);
      toast.error("An error occurred while creating the competition");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competition Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competition Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter competition title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Host Name */}
              <FormField
                control={form.control}
                name="hostName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host Organization Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter organization name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Max Age */}
              <FormField
                control={form.control}
                name="maxAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Age Limit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 25 (leave empty for no limit)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseInt(e.target.value)
                            : undefined;
                          field.onChange(value);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty for no age restriction
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Algorithm */}
              <FormField
                control={form.control}
                name="algorithm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scoring Algorithm</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a scoring algorithm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rmse">RMSE Scoring</SelectItem>
                        <SelectItem value="f1">F1-Score Ranking</SelectItem>
                        <SelectItem value="auc-roc">AUC-ROC Scoring</SelectItem>
                        <SelectItem value="accuracy">Accuracy Scoring</SelectItem>
                        <SelectItem value="mae">MAE Scoring</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This determines how submissions will be ranked
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Rules */}
            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition Rules</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter competition rules and guidelines..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prizes */}
            <FormField
              control={form.control}
              name="prizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prizes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prize details..."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the prizes for winners
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dataset Uploads */}
            <FileUploadSection 
              trainData={trainData} 
              setTrainData={setTrainData}
              testData={testData} 
              setTestData={setTestData}
              demoFile={demoFile} 
              setDemoFile={setDemoFile}
              idealData={idealData} 
              setIdealData={setIdealData}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Create Competition
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompetitionForm;
