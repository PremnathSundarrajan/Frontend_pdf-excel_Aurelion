import { Link } from "react-router-dom";
import { FileSpreadsheet, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream-100/60 border-t border-border/40">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-soft">
                <FileSpreadsheet className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg tracking-tight">Paperless</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Turn messy documents into clean Excel sheets. 
              No more manual data entry. Ever.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-foreground mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Paperless. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made By Aurelion 
          </p>
        </div>
      </div>
    </footer>
  );
}
