import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-8">
          <FileQuestion className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          Page not found
        </h1>

        <p className="text-muted-foreground mb-8">
          Hmm, this page seems to have gone paperless too. Let's get you back on track.
        </p>

        <Link to="/">
          <Button size="lg">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
