import { Mail, Phone, MapPin, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer id="contact" className="relative py-10 sm:py-12 md:py-16 bg-gradient-to-br from-card to-muted/30 border-t border-border mt-12 sm:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              FACEPrep Campus
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Empowering students with comprehensive curriculum information and career guidance for a brighter future.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/colleges" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Colleges
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactElement = document.getElementById("contact");
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactElement = document.getElementById("contact");
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:connect@faceprep.in" className="break-all hover:text-primary transition-colors">
                  connect@faceprep.in
                </a>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:+917904318695" className="hover:text-primary transition-colors">
                  +91 79043 18695
                </a>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>No.12, Lakshmi Nagar, Thottipalayam Pirivu, Avinashi Road, Coimbatore-641014.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-border">
          <p className="text-xs sm:text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} FACEPrep Campus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
