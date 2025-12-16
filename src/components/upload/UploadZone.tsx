import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
  disabled: boolean;
}

export function UploadZone({ onUpload, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    console.log("File dropped");
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files);
    }
  }, [disabled, onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selected via input");
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
    }
  }, [disabled, onUpload]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <label
        htmlFor="file-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`upload-zone cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${
          isDragging ? "upload-zone-active" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileSelect}
          multiple
          disabled={disabled}
        />
        <div className="flex flex-col items-center gap-5">
          <motion.div
            animate={{ y: isDragging ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
              isDragging ? "bg-primary shadow-medium" : "bg-indigo-50/80"
            }`}
          >
            <Upload className={`w-7 h-7 transition-colors duration-200 ${
              isDragging ? "text-primary-foreground" : "text-primary"
            }`} />
          </motion.div>

          <div className="text-center">
            <p className="text-foreground font-medium mb-1.5">
              {isDragging ? "Drop PDF files here" : "Drop PDFs here or click to upload"}
            </p>
            <p className="text-sm text-muted-foreground">
              We'll turn them into Excel.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-1">
              <div
                className="flex items-center gap-1 px-2.5 py-1.5 bg-secondary/70 rounded-full"
              >
                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">
                  PDF
                </span>
              </div>
          </div>
        </div>
      </label>
    </motion.div>
  );
}
