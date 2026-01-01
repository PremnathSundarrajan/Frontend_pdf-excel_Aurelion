import { motion, AnimatePresence } from "framer-motion";
import { FileText, Euro, Loader2, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface ProcessingOverlayProps {
    isOpen: boolean;
    type?: "standard" | "euro";
    progress?: number;
    statusText?: string;
}

export function ProcessingOverlay({ isOpen, type = "standard", progress = 0, statusText }: ProcessingOverlayProps) {
    // Disable scrolling when overlay is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const defaultStatus = type === "euro"
        ? "Processing Order Info..."
        : "Analyzing your documents...";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-md bg-card border border-border/50 shadow-2xl rounded-3xl p-8 text-center"
                    >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${progress === 100
                                ? "bg-green-100 text-green-600"
                                : type === "euro" ? "bg-emerald-100 text-emerald-600" : "bg-accent text-primary"
                            }`}>
                            {progress === 100 ? (
                                <CheckCircle2 className="w-8 h-8" />
                            ) : type === "euro" ? (
                                <Euro className="w-8 h-8" />
                            ) : (
                                <FileText className="w-8 h-8" />
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {progress === 100
                                ? "Conversion Complete!"
                                : type === "euro" ? "Processing Order Info..." : "Converting your files..."}
                        </h2>

                        <p className="text-muted-foreground mb-8">
                            {progress === 100
                                ? "Your Excel file is being downloaded."
                                : "We're analyzing your documents and generating your Excel file."}
                        </p>

                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    className={`absolute top-0 left-0 h-full ${progress === 100 ? "bg-green-500" : type === "euro" ? "bg-emerald-500" : "bg-primary"
                                        }`}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                {progress < 100 && <Loader2 className="w-4 h-4 animate-spin" />}
                                <span>{statusText || defaultStatus}</span>
                                {progress > 0 && <span>({progress}%)</span>}
                            </div>
                        </div>

                        <p className="mt-8 text-xs text-muted-foreground">
                            Please don't close this window or refresh the page.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
