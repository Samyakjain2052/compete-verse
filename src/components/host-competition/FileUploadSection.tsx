
import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { FileState } from "./CompetitionForm";

type FileUploadSectionProps = {
  trainData: FileState;
  setTrainData: React.Dispatch<React.SetStateAction<FileState>>;
  testData: FileState;
  setTestData: React.Dispatch<React.SetStateAction<FileState>>;
  demoFile: FileState;
  setDemoFile: React.Dispatch<React.SetStateAction<FileState>>;
  idealData: FileState;
  setIdealData: React.Dispatch<React.SetStateAction<FileState>>;
};

const FileUploadSection = ({
  trainData,
  setTrainData,
  testData,
  setTestData,
  demoFile,
  setDemoFile,
  idealData,
  setIdealData,
}: FileUploadSectionProps) => {
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Dataset Uploads</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Training Data Upload */}
        <Card className="border border-dashed">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">
              Training Data <span className="text-red-500">*</span>
            </h4>
            {!trainData.file ? (
              <div className="flex flex-col items-center">
                <label htmlFor="train-data" className="w-full cursor-pointer">
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
                      handleFileChange(e, setTrainData, ["csv", "json"])
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
                <label htmlFor="test-data" className="w-full cursor-pointer">
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
                      handleFileChange(e, setTestData, ["csv", "json"])
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
              Submission Demo File <span className="text-red-500">*</span>
            </h4>
            {!demoFile.file ? (
              <div className="flex flex-col items-center">
                <label htmlFor="demo-file" className="w-full cursor-pointer">
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
                      handleFileChange(e, setDemoFile, ["csv", "json"])
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

        {/* Ideal Data Upload */}
        <Card className="border border-dashed">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">
              Ideal Data (Ground Truth)
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              The expected results/output for the competition. This will be used to evaluate submissions.
            </p>
            {!idealData.file ? (
              <div className="flex flex-col items-center">
                <label htmlFor="ideal-data" className="w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload CSV/JSON
                    </p>
                  </div>
                  <input
                    id="ideal-data"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e, setIdealData, ["csv", "json"])
                    }
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm truncate max-w-[70%]">
                  {idealData.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(setIdealData)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileUploadSection;
