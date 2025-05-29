import React, { useState, useRef } from "react";
import { Upload, File, ArrowUpCircle } from "lucide-react";
import Button from "../ui/Button";
import { useApp } from "../../context/AppContext";

const FileUpload: React.FC = () => {
  const { uploadStatement } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadStatement(selectedFile);
      setSelectedFile(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Upload Statement
      </h2>

      {selectedFile ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* File Info Section */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <File className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-semibold text-gray-800">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · PDF
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={handleUpload}
              >
                <ArrowUpCircle className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="p-8 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              Drag and drop your statement here, or
              <br />
              <button
                type="button"
                className="mx-1 text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                onClick={triggerFileInput}
              >
                browse to select a file
              </button>
            </p>

            <p className="text-sm text-gray-500">
              Supported format: PDF (Max. 10MB)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
