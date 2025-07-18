import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CheckCircle, Upload, X } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { FileUpload as FileUploadType } from "@/types";

interface FileUploadProps {
  label: string;
  fieldName: string;
  file: FileUploadType | null;
  onFileChange: (fieldName: string, fileUpload: FileUploadType | null) => void;
  accept: string;
  loading: boolean;
}

export interface FileUploadHandle {
  clearFile: () => void;
}

const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(
  ({ label, fieldName, file, onFileChange, accept, loading }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

    const handleFileChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return onFileChange(fieldName, null);

        const allowedTypes = accept.split(",").map((type) => type.trim());
        const isValidType = allowedTypes.some((type) =>
          type.startsWith(".")
            ? selectedFile.name.toLowerCase().endsWith(type)
            : selectedFile.type === type
        );

        if (!isValidType) {
          return onFileChange(fieldName, {
            file: selectedFile,
            error: `Invalid file type. Please select a ${accept} file.`,
          });
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onFileChange(fieldName, {
            file: selectedFile,
            preview:
              content.substring(0, 200) + (content.length > 200 ? "..." : ""),
          });
        };
        reader.readAsText(selectedFile);
      },
      [fieldName, onFileChange, accept]
    );

    const handleFileSelect = useCallback(
      (selectedFile: File) => {
        const syntheticEvent = {
          target: { files: [selectedFile] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(syntheticEvent);
      },
      [handleFileChange]
    );

    const handleRemoveFile = useCallback(() => {
      if (fileInputRef.current) fileInputRef.current.value = "";
      onFileChange(fieldName, null);
    }, [fieldName, onFileChange]);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => prev + 1);
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => {
        const newCounter = prev - 1;
        if (newCounter === 0) setIsDragOver(false);
        return newCounter;
      });
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        setDragCounter(0);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) handleFileSelect(files[0]);
      },
      [handleFileSelect]
    );

    const handleClick = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    useImperativeHandle(ref, () => ({
      clearFile: handleRemoveFile,
    }));

    const getAcceptText = () => {
      const types = accept.split(",").map((type) => type.trim().toLowerCase());
      const labels: string[] = [];

      if (types.includes(".txt")) labels.push("text files");
      if (types.includes(".csv")) labels.push("CSV files");
      if (types.includes(".json")) labels.push("JSON files");
      if (types.includes(".zip")) labels.push("ZIP files");

      return labels.length > 0 ? labels.join(", ") : accept;
    };

    return loading ? (
      <div className="border border-dashed rounded-md px-4 py-6 text-center text-sm cursor-pointer transition border-green-300 bg-green-50">
        <LoadingSpinner message="Training model..." />
      </div>
    ) : (
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
        <div
          className={`border border-dashed rounded-md px-4 py-6 text-center text-sm cursor-pointer transition
            ${
              isDragOver
                ? "border-blue-400 bg-blue-50"
                : file?.error
                ? "border-red-300 bg-red-50"
                : file
                ? "border-green-300 bg-green-50"
                : "border-gray-300 bg-gray-50 hover:border-blue-300"
            }
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={`file-${fieldName}`}
          />

          {!file?.file && (
            <div className="space-y-1">
              <Upload className="w-5 h-5 mx-auto text-gray-500" />
              <p className="text-gray-700">Drag & drop or click to upload</p>
              <p className="text-gray-400">Please upload {getAcceptText()}</p>
            </div>
          )}

          {file?.file && !file.error && (
            <div className="space-y-1">
              <CheckCircle className="w-5 h-5 mx-auto text-green-600" />
              <p className="text-green-700">File uploaded</p>
              <p className="text-gray-600 break-all text-xs">
                {file.file.name}
              </p>
              <p className="text-gray-400 text-xs">
                {(file.file.size / 1024).toFixed(1)} KB
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="text-red-500 text-sm mt-1 hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          {file?.error && (
            <div className="space-y-1">
              <X className="w-5 h-5 mx-auto text-red-500" />
              <p className="text-red-600">Upload Error</p>
              <p className="text-gray-500 text-xs">{file.error}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                className="text-red-500 text-sm mt-1 hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
