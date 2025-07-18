import React, { useState, useCallback, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Step, WeeklyProduct } from "@/types";
import { uploadService } from "@/api/dashboard.service";
import ProgressIndicator from "@/components/coustomComponent/ProgressIndicator";
import TrainingSuccess from "@/components/coustomComponent/AnalysisReady";
import MLPredictionsDashboard from "@/components/coustomComponent/AnalysisResults";
import FileUpload, {
  FileUploadHandle,
} from "@/components/coustomComponent/FileUpload";

const ModelPrediction: React.FC = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const fileUploadRef = useRef<FileUploadHandle>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [trainingResults, setTrainingResults] = useState<any | null>(null);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<Step>(Step.Upload);
  const [analysisPayload, setAnalysisPayload] = useState<any>({});

  useEffect(() => {
    if (results) {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [results, error, isLoading, step]);

  const { mutate: uploadAndTrainMutate } = useMutation({
    mutationKey: ["uploadAndTrain"],
    mutationFn: async (file: File) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      return uploadService.uploadAndTrain(formData);
    },
    onSuccess: (res) => {
      setTrainingResults(res);
      setStep(Step.Ready);
      setIsLoading(false);
    },
    onError: () => {
      setError("Something went wrong");
      setIsLoading(false);
    },
  });

  const { mutate: predictResultsMutate } = useMutation({
    mutationKey: ["predictResults"],
    mutationFn: async (body: WeeklyProduct) => {
      setIsLoading(true);
      return uploadService.predictResults(body);
    },
    onSuccess: (res) => {
      setResults(res);
      setStep(Step.Prediction);
      setIsLoading(false);
    },
    onError: () => {
      setError("Something went wrong");
      setIsLoading(false);
    },
  });

  const handleFileChange = useCallback((_: string, fileUpload: any) => {
    if (fileUpload?.file) {
      handleReset();
      const validExtensions = [".csv", ".zip"];
      const fileName = fileUpload.file.name.toLowerCase();
      const isValid = validExtensions.some((ext) => fileName.endsWith(ext));
      fileUpload.error = isValid ? null : "Invalid file type";
      setFile(fileUpload?.file);
      setStep(Step.Training);
    } else {
      setResults(null);
      setTrainingResults(null);
      setError("");
      setFile(null);
      setStep(Step.Upload);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) {
        setError("Please provide a valid file");
        return;
      }
      setError("");
      await uploadAndTrainMutate(file);
    },
    [file, uploadAndTrainMutate]
  );

  const handleReset = useCallback(() => {
    setResults(null);
    setTrainingResults(null);
    setError("");
    setFile(null);
    setStep(Step.Upload);
    fileUploadRef.current?.clearFile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <section className="mb-8">
              <ProgressIndicator currentState={step} />

              {!trainingResults && (
                <FileUpload
                  ref={fileUploadRef}
                  label="Upload File To Train"
                  fieldName="file"
                  file={{ file, error }}
                  onFileChange={handleFileChange}
                  accept=".csv,.zip"
                  loading={isLoading}
                />
              )}

              {trainingResults && (
                <TrainingSuccess
                  result={trainingResults}
                  onChange={setAnalysisPayload}
                  loading={isLoading}
                />
              )}
            </section>

            <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                {(results || error || file || trainingResults) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2 text-sm font-medium rounded-md min-w-[140px] text-white bg-red-600 hover:bg-red-700"
                  >
                    Reset
                  </button>
                )}
                {step === Step.Training && (
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="px-5 py-2 text-sm font-medium rounded-md min-w-[140px] text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 disabled:text-green-500 disabled:cursor-not-allowed"
                  >
                    Train Model
                  </button>
                )}

                {step === Step.Ready && trainingResults && (
                  <button
                    disabled={isLoading}
                    onClick={() => predictResultsMutate(analysisPayload)}
                    className="px-5 py-2 text-sm font-medium rounded-md min-w-[140px] text-white bg-green-700 hover:bg-green-800 disabled:bg-green-200 disabled:text-green-500 disabled:cursor-not-allowed"
                  >
                    Predict
                  </button>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-8">
              <h3 className="text-base font-semibold mb-2">Error</h3>
              <p>{error}</p>
            </div>
          )}

          <div ref={resultRef}></div>

          {results && (
            <div className="bg-white rounded-lg shadow p-8">
              <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Analysis Results
                </h2>
              </header>
              <MLPredictionsDashboard {...results} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ModelPrediction;
