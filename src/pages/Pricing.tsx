import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingCard } from "@/components/pricing/PricingCard";
import { HelpCircle } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "Free",
    description: "Perfect for trying things out",
    features: [
      "5 documents per month",
      "Basic OCR accuracy",
      "Excel & CSV export",
      "Email support",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$19",
    description: "For individuals and small teams",
    features: [
      "100 documents per month",
      "Advanced AI accuracy",
      "Priority processing",
      "Inline editing",
      "API access",
      "Priority support",
    ],
    popular: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Team",
    price: "$49",
    description: "For growing businesses",
    features: [
      "Unlimited documents",
      "Highest AI accuracy",
      "Custom templates",
      "Team collaboration",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
  },
];

const faqs = [
  {
    q: "Can I change plans later?",
    a: "Yes! You can upgrade, downgrade, or cancel anytime. Changes take effect immediately.",
  },
  {
    q: "What file types are supported?",
    a: "We support PDF, PNG, JPG, JPEG, and DOCX files. More formats coming soon!",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use bank-level encryption and never store your documents longer than needed.",
  },
  {
    q: "What counts as a document?",
    a: "Each file you upload counts as one document, regardless of the number of pages.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Simple, honest pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Start free. Upgrade only if it helps. No hidden fees, no surprises.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-28">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
                cta={plan.cta}
                index={index}
              />
            ))}
          </div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Questions? We've got answers.
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about Paperless
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
                  className="bg-card border border-border/60 rounded-xl p-5 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground mb-1.5">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mt-20 p-8 bg-cream-100/60 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Reach out anytime.
            </p>
            <a
              href="mailto:hello@paperless.ai"
              className="text-primary font-medium hover:underline transition-colors duration-150"
            >
              hello@paperless.ai
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
