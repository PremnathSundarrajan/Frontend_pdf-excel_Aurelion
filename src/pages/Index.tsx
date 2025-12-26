import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UploadZone } from "@/components/upload/UploadZone";
import { UploadZoneEuro } from "@/components/upload/UploadZoneEuro";
import { ProcessingOverlay } from "@/components/upload/ProcessingOverlay";
import { Sparkles, Zap, Shield, Users, FileText, Euro } from "lucide-react";
import axios from "axios";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Reads documents like a human — just faster and more accurate",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your Excel in seconds, not hours of manual work",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your documents stay yours. Always encrypted, never stored",
  },
  {
    icon: Users,
    title: "Team Friendly",
    description: "Collaborate seamlessly with shared history and access",
  },
];

// Gentle fade-in animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type ConversionStatus = "idle" | "processing";

const Index = () => {
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [statusEuro, setStatusEuro] = useState<ConversionStatus>("idle");

  const handleUpload = async (files: File[]) => {
    console.log("handleUpload triggered with", files.length, "files.");
    if (files.length === 0) return;

    setStatus("processing");
    console.log("Status set to 'processing'");

    const formData = new FormData();
    files.forEach(file => {
      formData.append("pdfs", file);
    });

    console.log("FormData created. Calling API at http://localhost:3000/convert...");
    try {
      const response = await axios.post("https://convert-pdf-to-excel-1z5e.onrender.com/convert", formData, {
        responseType: 'blob', // Important for file downloads
      });
      console.log("API call successful. Response:", response);


      // Create a link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      const dateStr = new Date().toISOString().split('T')[0];
      let filename = `Converted_consignment_${dateStr}.xlsx`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch.length === 2)
          filename = filenameMatch[1];
      }
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      console.log("Triggering download for", filename);
      link.click();
      link.remove();

      // Reset state after download
      console.log("Setting status back to 'idle' in 1 second.");
      setTimeout(() => {
        setStatus("idle");
      }, 1000);

    } catch (error) {
      console.error("--- ERROR DURING UPLOAD ---");
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.toJSON());
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
      console.error("--- END ERROR ---");
      alert("An error occurred during the conversion. Please check the console for details.");
      setStatus("idle");
    }
  };

  // Handler for Euro invoice conversion (separate state)
  const handleUploadEuro = async (files: File[]) => {
    console.log("handleUploadEuro triggered with", files.length, "files.");
    if (files.length === 0) return;

    setStatusEuro("processing");
    console.log("StatusEuro set to 'processing'");

    const formData = new FormData();
    files.forEach(file => {
      formData.append("pdfs", file);
    });

    console.log("FormData created. Calling API at https://convert-pdf-to-excel-1z5e.onrender.com/convert-euro...");
    try {
      const response = await axios.post("https://convert-pdf-to-excel-1z5e.onrender.com/convert-euro", formData, {
        responseType: 'blob', // Important for file downloads
      });
      console.log("API call successful. Response:", response);

      // Create a link and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      const dateStr = new Date().toISOString().split('T')[0];
      let filename = `Converted_orderinfo_${dateStr}.xlsx`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch && filenameMatch.length === 2)
          filename = filenameMatch[1];
      }
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      console.log("Triggering download for", filename);
      link.click();
      link.remove();

      // Reset state after download
      console.log("Setting statusEuro back to 'idle' in 1 second.");
      setTimeout(() => {
        setStatusEuro("idle");
      }, 1000);

    } catch (error) {
      console.error("--- ERROR DURING EURO UPLOAD ---");
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.toJSON());
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      }
      console.error("--- END ERROR ---");
      alert("An error occurred during the Euro invoice conversion. Please check the console for details.");
      setStatusEuro("idle");
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pt-40 md:pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/60 rounded-full text-sm text-accent-foreground mb-8">
              <Sparkles className="w-4 h-4" />
              Consignment
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight"
          >
            Turn documents into Excel.{" "}
            <span className="gradient-text">Like magic.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-14 leading-relaxed"
          >
            Invoices, PDFs, scans — our AI understands them so you don't have to.
            Stop typing. Start converting.
          </motion.p>

          {/* Upload Zone */}
          <UploadZone onUpload={handleUpload} disabled={status === 'processing'} />

          {/* Trust message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm text-muted-foreground mt-10"
          >
            Loved by teams who hate manual data entry
          </motion.p>
        </div>
      </section>

      <ProcessingOverlay isOpen={status === "processing"} type="standard" />

      {/* Euro Invoice Converter Section */}
      <section className="py-20 md:py-24 px-4 bg-gradient-to-b from-emerald-50/50 to-background">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/60 rounded-full text-sm text-emerald-700 mb-8">
              <Euro className="w-4 h-4" />
              Order Info
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight"
          >
            Extract Order Info.{" "}
            <span className="text-emerald-600">Perfectly.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-14 leading-relaxed"
          >
            Specialized extraction for Order Info with € amounts.
            Preserves dates (dd.mm.yy), references with hyphens, and euro formatting.
          </motion.p>

          {/* Euro Upload Zone */}
          <UploadZoneEuro onUpload={handleUploadEuro} disabled={statusEuro === 'processing'} />

          {/* Trust message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm text-muted-foreground mt-10"
          >
            6 columns: Date • Client • Order No • Material • Delivery • Kgs • m<sup>3</sup> • Material Cost (€) • Extra Fee (€) • Total Cost (€)
          </motion.p>
        </div>
      </section>

      <ProcessingOverlay isOpen={statusEuro === "processing"} type="euro" />

      {/* Features Section */}
      <section className="py-24 md:py-32 px-4 bg-cream-100/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why teams choose Paperless
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Simple, fast, and reliable document conversion
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-card p-6 rounded-2xl border border-border/60 shadow-soft hover:shadow-medium transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/70 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to clean data
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: 1, title: "Upload your document", desc: "Drop any PDF, image, or scanned file" },
              { step: 2, title: "AI does the work", desc: "We find tables and organize your data" },
              { step: 3, title: "Download Excel", desc: "Clean, structured, ready to use" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.12, duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-5 bg-card p-5 rounded-2xl border border-border/60 shadow-soft"
              >
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-semibold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 px-4 bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto max-w-xl text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to go paperless?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            Start free. No credit card required.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-background text-foreground px-8 py-4 rounded-xl font-medium shadow-medium hover:shadow-large transition-all duration-200"
          >
            Start Converting for Free
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
