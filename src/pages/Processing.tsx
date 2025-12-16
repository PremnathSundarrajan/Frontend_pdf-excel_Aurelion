import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { ProcessingSteps } from "@/components/upload/ProcessingSteps";
import { FileText } from "lucide-react";

const Processing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileName = location.state?.fileName || "document.pdf";
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Simulate processing steps
    const intervals = [
      setTimeout(() => setCurrentStep(2), 1500),
      setTimeout(() => setCurrentStep(3), 3000),
      setTimeout(() => setCurrentStep(4), 4500),
      setTimeout(() => {
        setCurrentStep(5);
        // Navigate to results after completion
        setTimeout(() => navigate("/results/demo"), 500);
      }, 6000),
    ];

    return () => intervals.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* File info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/60 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              We're reading your document…
            </h1>
            <p className="text-muted-foreground">{fileName}</p>
          </motion.div>

          {/* Processing steps */}
          <ProcessingSteps currentStep={currentStep} />

          {/* Friendly message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-14"
          >
            This usually takes just a few seconds. Grab a coffee ☕
          </motion.p>
        </div>
      </main>
    </div>
  );
};

export default Processing;
