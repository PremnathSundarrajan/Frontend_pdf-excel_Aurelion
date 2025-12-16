import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertCircle, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FileHistoryCardProps {
  id: string;
  fileName: string;
  date: string;
  accuracy: number;
  status: "complete" | "review";
  index: number;
}

export function FileHistoryCard({
  id,
  fileName,
  date,
  accuracy,
  status,
  index,
}: FileHistoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
      className="bg-card border border-border/60 rounded-xl p-4 shadow-soft hover:shadow-medium transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-4">
        {/* File info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-50/80 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{fileName}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {status === "complete" ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/8 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-success" />
              <span className="text-sm font-medium text-success">Done perfectly</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-warning/10 rounded-full">
              <AlertCircle className="w-3.5 h-3.5 text-warning" />
              <span className="text-sm font-medium text-warning">Needs review</span>
            </div>
          )}
        </div>

        {/* Accuracy */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Accuracy</p>
            <p className="font-semibold text-foreground">{accuracy}%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to={`/results/${id}`}>
            <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="soft" size="icon" className="rounded-xl h-9 w-9">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
