import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  index: number;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  popular,
  cta,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className={`relative bg-card rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5 ${
        popular
          ? "border-primary/40 shadow-medium ring-1 ring-primary/10"
          : "border-border/60 shadow-soft hover:shadow-medium"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-soft">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground tracking-tight">{price}</span>
        {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-success" />
            </div>
            <span className="text-sm text-foreground leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={popular ? "default" : "outline"}
        className="w-full"
        size="lg"
      >
        {cta}
      </Button>
    </motion.div>
  );
}
