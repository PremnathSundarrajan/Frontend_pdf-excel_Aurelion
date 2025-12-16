import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileHistoryCard } from "@/components/dashboard/FileHistoryCard";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Upload, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockFiles = [
  {
    id: "1",
    fileName: "Q4_invoices_2024.pdf",
    date: "Today, 2:34 PM",
    accuracy: 99,
    status: "complete" as const,
  },
  {
    id: "2",
    fileName: "supplier_contracts.pdf",
    date: "Yesterday, 10:15 AM",
    accuracy: 97,
    status: "complete" as const,
  },
  {
    id: "3",
    fileName: "handwritten_receipt.jpg",
    date: "Dec 10, 2024",
    accuracy: 85,
    status: "review" as const,
  },
  {
    id: "4",
    fileName: "expense_report_nov.pdf",
    date: "Dec 8, 2024",
    accuracy: 98,
    status: "complete" as const,
  },
  {
    id: "5",
    fileName: "vendor_list.png",
    date: "Dec 5, 2024",
    accuracy: 94,
    status: "complete" as const,
  },
];

const stats = [
  { label: "Total Files", value: "127", icon: FileText },
  { label: "This Month", value: "23", icon: Upload },
  { label: "Avg Accuracy", value: "97%", icon: Target },
  { label: "Time Saved", value: "42h", icon: Clock },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                Your Documents
              </h1>
              <p className="text-muted-foreground">
                Track and manage all your converted files
              </p>
            </div>
            <Link to="/">
              <Button>
                <Plus className="w-4 h-4" />
                New Upload
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.35, ease: "easeOut" }}
                className="bg-card border border-border/60 rounded-xl p-5 shadow-soft"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* File list */}
          <div className="space-y-3">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold text-foreground mb-4"
            >
              Recent Files
            </motion.h2>
            {mockFiles.map((file, index) => (
              <FileHistoryCard
                key={file.id}
                id={file.id}
                fileName={file.fileName}
                date={file.date}
                accuracy={file.accuracy}
                status={file.status}
                index={index}
              />
            ))}
          </div>

          {/* Empty state placeholder */}
          {mockFiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No documents yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                Upload your first document to get started with Paperless
              </p>
              <Link to="/">
                <Button>
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
