
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Upload, X } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

type FileState = {
  file: File | null;
  preview: string | null;
  name: string;
};

const HostCompetition = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("create");
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      hostName: "",
      rules: "",
      prizes: "",
    },
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<FileState>>,
    acceptedFileTypes: string[]
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const fileType = file.name.split(".").pop()?.toLowerCase() || "";
    if (!acceptedFileTypes.includes(fileType)) {
      toast.error(
        `Invalid file type. Please upload a ${acceptedFileTypes.join(", ")} file.`
      );
      return;
    }

    setFile({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    });
  };

  const removeFile = (
    setFile: React.Dispatch<React.SetStateAction<FileState>>
  ) => {
    setFile({
      file: null,
      preview: null,
      name: "",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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

    // Submit form
    console.log({
      ...values,
      trainData: trainData.file,
      testData: testData.file,
      demoFile: demoFile.file,
    });

    toast.success("Competition created successfully!");
    // In a real application, we would send this data to the backend
    // and then navigate to the dashboard
    setActiveTab("manage");
  };

  return (
    <div className="container max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Host a Competition
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create">Create Competition</TabsTrigger>
          <TabsTrigger value="manage">Manage Competitions</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-8">
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dataset Uploads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Training Data Upload */}
                      <Card className="border border-dashed">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">
                            Training Data{" "}
                            <span className="text-red-500">*</span>
                          </h4>
                          {!trainData.file ? (
                            <div className="flex flex-col items-center">
                              <label
                                htmlFor="train-data"
                                className="w-full cursor-pointer"
                              >
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload CSV/JSON
                                  </p>
                                </div>
                                <input
                                  id="train-data"
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileChange(e, setTrainData, [
                                      "csv",
                                      "json",
                                    ])
                                  }
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-sm truncate max-w-[70%]">
                                {trainData.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(setTrainData)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Test Data Upload */}
                      <Card className="border border-dashed">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">
                            Test Data <span className="text-red-500">*</span>
                          </h4>
                          {!testData.file ? (
                            <div className="flex flex-col items-center">
                              <label
                                htmlFor="test-data"
                                className="w-full cursor-pointer"
                              >
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload CSV/JSON
                                  </p>
                                </div>
                                <input
                                  id="test-data"
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileChange(e, setTestData, [
                                      "csv",
                                      "json",
                                    ])
                                  }
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-sm truncate max-w-[70%]">
                                {testData.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(setTestData)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Demo File Upload */}
                      <Card className="border border-dashed">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">
                            Submission Demo File{" "}
                            <span className="text-red-500">*</span>
                          </h4>
                          {!demoFile.file ? (
                            <div className="flex flex-col items-center">
                              <label
                                htmlFor="demo-file"
                                className="w-full cursor-pointer"
                              >
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload CSV/JSON
                                  </p>
                                </div>
                                <input
                                  id="demo-file"
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileChange(e, setDemoFile, [
                                      "csv",
                                      "json",
                                    ])
                                  }
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-sm truncate max-w-[70%]">
                                {demoFile.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(setDemoFile)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>

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
        </TabsContent>

        <TabsContent value="manage" className="space-y-8">
          <ManagementDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ManagementDashboard = () => {
  // For demo purposes, we'll create some mock data
  const mockCompetitions = [
    {
      id: 1,
      title: "Data Science Challenge 2023",
      participants: 125,
      submissions: 432,
      status: "Active",
    },
    {
      id: 2,
      title: "ML Algorithm Competition",
      participants: 87,
      submissions: 256,
      status: "Active",
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Competitions</CardTitle>
        </CardHeader>
        <CardContent>
          {mockCompetitions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                You haven't created any competitions yet.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("create-tab")?.click()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Competition
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Participants</th>
                    <th className="px-4 py-3 text-left">Submissions</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCompetitions.map((competition) => (
                    <tr key={competition.id} className="border-b">
                      <td className="px-4 py-3">
                        <span className="font-medium">{competition.title}</span>
                      </td>
                      <td className="px-4 py-3">{competition.participants}</td>
                      <td className="px-4 py-3">{competition.submissions}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {competition.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submission Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold">688</div>
              <p className="text-sm text-muted-foreground mt-1">
                Total Submissions
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-semibold">27</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Today's Submissions
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold">212</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Unique Participants
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-semibold text-green-600">175</div>
                <p className="text-xs text-muted-foreground mt-1">Verified</p>
              </div>
              <div>
                <div className="text-2xl font-semibold text-yellow-600">23</div>
                <p className="text-xs text-muted-foreground mt-1">Pending</p>
              </div>
              <div>
                <div className="text-2xl font-semibold text-red-600">14</div>
                <p className="text-xs text-muted-foreground mt-1">Rejected</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Review Pending Verifications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forum Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Recent Posts</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm">
                    Question about the training dataset format...
                  </li>
                  <li className="text-sm">
                    Is there a deadline extension possible?
                  </li>
                  <li className="text-sm">
                    Having trouble with the submission process...
                  </li>
                </ul>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Moderate Forum
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostCompetition;
