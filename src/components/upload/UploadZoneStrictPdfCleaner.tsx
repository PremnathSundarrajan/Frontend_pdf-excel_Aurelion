import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Eraser, X, Archive } from "lucide-react";

interface UploadZoneProps {
    onUpload?: (files: File[]) => Promise<any> | void;
    disabled?: boolean;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function UploadZoneStrictPdfCleaner({ onUpload, disabled }: UploadZoneProps) {
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

    /** Merge incoming files into the existing list, deduplicating by name+size. */
    const addFiles = useCallback((incoming: File[]) => {
        setError(null);
        const pdfs = incoming.filter(f => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
        if (pdfs.length === 0) {
            setError("Only PDF files are accepted.");
            return;
        }
        setFiles(prev => {
            const existing = new Set(prev.map(f => `${f.name}_${f.size}`));
            const deduped  = pdfs.filter(f => !existing.has(`${f.name}_${f.size}`));
            return [...prev, ...deduped];
        });
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setError(null);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;
        const dropped = Array.from(e.dataTransfer.files || []);
        if (dropped.length > 0) addFiles(dropped);
    }, [disabled, addFiles]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const selected = Array.from(e.target.files || []);
        if (selected.length > 0) {
            addFiles(selected);
            e.currentTarget.value = "";
        }
    }, [disabled, addFiles]);

    const handleClean = async () => {
        setError(null);
        if (files.length === 0) {
            setError("No files selected.");
            return;
        }
        if (!onUpload) {
            setError("No upload handler provided.");
            return;
        }
        try {
            setLoading(true);
            await onUpload(files);
            setFiles([]);
        } catch (err: any) {
            setError(err?.message || "Processing failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto"
        >
            {/* ── Drop zone ── */}
            <label
                htmlFor="strict-pdf-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`upload-zone cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${
                    isDragging ? "upload-zone-active" : ""
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <input
                    id="strict-pdf-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    multiple={true}
                    disabled={disabled}
                />
                <div className="flex flex-col items-center gap-5">
                    <motion.div
                        animate={{ y: isDragging ? -4 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                            isDragging ? "bg-purple-500 shadow-medium" : "bg-purple-50/80"
                        }`}
                    >
                        <Eraser className={`w-7 h-7 transition-colors duration-200 ${
                            isDragging ? "text-white" : "text-purple-600"
                        }`} />
                    </motion.div>

                    <div className="text-center">
                        <p className="text-foreground font-medium mb-1.5">
                            {isDragging ? "Drop your PDFs here" : "Drop PDFs to clean"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Strict removal of Page 1 header (above table) and key-value footers.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Each file is processed independently — results packaged in a single ZIP.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 px-2.5 py-1.5 bg-secondary/70 rounded-full">
                            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-medium">
                                PDF ONLY (MULTIPLE FILES SUPPORTED)
                            </span>
                        </div>
                    </div>
                </div>
            </label>

            {/* ── Selected file list ── */}
            {files.length > 0 && (
                <div className="mt-5 w-full">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">
                            {files.length} file{files.length !== 1 ? "s" : ""} selected
                        </span>
                        <button
                            type="button"
                            onClick={() => { setFiles([]); setError(null); }}
                            disabled={disabled || loading}
                            className="text-xs text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                            Clear all
                        </button>
                    </div>

                    <ul className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        <AnimatePresence initial={false}>
                            {files.map((file, i) => (
                                <motion.li
                                    key={`${file.name}_${file.size}_${file.lastModified}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex items-center justify-between bg-secondary/40 border border-border/60 rounded-lg px-3 py-2.5"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <FileText className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate text-foreground">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatBytes(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(i)}
                                        disabled={disabled || loading}
                                        className="ml-3 flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                                        aria-label={`Remove ${file.name}`}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>

                    {/* ── Action buttons ── */}
                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            id="strict-pdf-clean-btn"
                            onClick={handleClean}
                            disabled={disabled || loading}
                            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <Archive className="w-4 h-4" />
                            {loading
                                ? "Processing…"
                                : `Clean All & Download ZIP`}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setFiles([]); setError(null); }}
                            disabled={disabled || loading}
                            className="px-3 py-2.5 text-sm border border-border rounded-lg text-muted-foreground hover:bg-secondary/50 transition-colors disabled:opacity-50"
                        >
                            Clear
                        </button>
                    </div>

                    {error && (
                        <div className="mt-3 text-sm text-red-600" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
