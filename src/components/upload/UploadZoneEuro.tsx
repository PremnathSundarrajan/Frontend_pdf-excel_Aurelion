import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Euro } from "lucide-react";

interface UploadZoneEuroProps {
    onUpload?: (files: File[]) => Promise<any> | void;
    disabled?: boolean;
}

export function UploadZoneEuro({ onUpload, disabled }: UploadZoneEuroProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const addFiles = (incoming: File[]) => {
        setError(null);
        // avoid duplicates by name+size+lastModified
        setFiles((prev) => {
            const existingKeys = new Set(prev.map(f => `${f.name}_${f.size}_${f.lastModified}`));
            const toAdd = incoming.filter(f => !existingKeys.has(`${f.name}_${f.size}_${f.lastModified}`));
            return prev.concat(toAdd);
        });
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        const dropped = Array.from(e.dataTransfer.files || []);
        if (dropped.length > 0) {
            addFiles(dropped);
        }
    }, [disabled]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const selected = Array.from(e.target.files || []);
        if (selected.length > 0) {
            addFiles(selected);
            // allow re-selecting same file later
            e.currentTarget.value = "";
        }
    }, [disabled]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto"
        >
            <label
                htmlFor="file-upload-euro"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`upload-zone cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${isDragging ? "upload-zone-active" : ""
                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input
                    id="file-upload-euro"
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
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${isDragging ? "bg-emerald-600 shadow-medium" : "bg-emerald-50/80"
                            }`}
                    >
                        <Euro className={`w-7 h-7 transition-colors duration-200 ${isDragging ? "text-white" : "text-emerald-600"
                            }`} />
                    </motion.div>

                    <div className="text-center">
                        <p className="text-foreground font-medium mb-1.5">
                            {isDragging ? "Drop Order Info PDFs here" : "Drop Order Info PDFs here or click to upload"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            We'll extract tables with € amounts to Excel.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <div
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-100/70 rounded-full"
                        >
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-xs text-emerald-700 font-medium">
                                PDF → € Excel
                            </span>
                        </div>
                    </div>
                </div>
            </label>

            {/* File list and actions */}
            {files.length > 0 && (
                <div className="mt-6 w-full max-w-xl mx-auto">
                    <div className="mb-3 font-medium">Order Info files to convert ({files.length})</div>
                    <ul className="space-y-2">
                        {files.map((file, i) => (
                            <li key={`${file.name}_${file.size}_${file.lastModified}`} className="flex items-center justify-between border border-emerald-200 rounded p-3 bg-emerald-50/30">
                                <div className="min-w-0">
                                    <div className="truncate font-medium">{file.name}</div>
                                    <div className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB • {file.type || 'unknown'}</div>
                                </div>
                                <div className="ml-4">
                                    <button
                                        type="button"
                                        onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                                        className="text-sm text-red-600 hover:underline"
                                        disabled={disabled || loading}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={async () => {
                                setError(null);
                                if (files.length === 0) {
                                    setError('No files selected.');
                                    return;
                                }
                                if (!onUpload) {
                                    setError('No upload handler provided.');
                                    return;
                                }
                                try {
                                    setLoading(true);
                                    await onUpload(files);
                                    // clear selected files after successful upload/convert
                                    setFiles([]);
                                } catch (err: any) {
                                    setError(err?.message || 'Upload failed.');
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            disabled={disabled || loading}
                            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-60 transition-colors"
                        >
                            {loading ? 'Converting Euro Invoice...' : 'Convert Euro Invoice'}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setFiles([]); setError(null); }}
                            disabled={disabled || loading}
                            className="px-3 py-2 border rounded hover:bg-gray-50 transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    {error && <div className="mt-3 text-sm text-red-600" role="alert">{error}</div>}
                </div>
            )}
        </motion.div>
    );
}
