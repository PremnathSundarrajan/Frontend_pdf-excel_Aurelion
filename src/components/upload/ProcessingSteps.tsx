import { motion } from "framer-motion";
import { Eye, Table, Layers, FileSpreadsheet, Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: Step[] = [
  { id: 1, label: "Looking at the document", icon: Eye },
  { id: 2, label: "Finding tables", icon: Table },
  { id: 3, label: "Organizing the data", icon: Layers },
  { id: 4, label: "Getting Excel ready", icon: FileSpreadsheet },
];

interface ProcessingStepsProps {
  currentStep: number;
}

export function ProcessingSteps({ currentStep }: ProcessingStepsProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.35, ease: "easeOut" }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                isCurrent
                  ? "bg-teal-50/80 border border-teal-500/15 shadow-soft"
                  : isComplete
                  ? "bg-teal-50/40"
                  : "bg-secondary/40"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isComplete
                    ? "bg-teal-500 text-white"
                    : isCurrent
                    ? "bg-gradient-to-b from-teal-500 to-teal-600 text-white shadow-soft"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Icon className={`w-5 h-5 ${isCurrent ? "animate-pulse-soft" : ""}`} />
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <p
                  className={`font-medium transition-colors duration-200 ${
                    isPending ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted-foreground"
                  >
                    Working on it...
                  </motion.p>
                )}
              </div>

              {/* Progress indicator for current step */}
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-5 h-5 border-2 border-teal-500/80 border-t-transparent rounded-full"
                  />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
