import { Instagram, Twitter } from "lucide-react";
import lemariLogo from "@/assets/lemari-logo.png";
import PaymentIcons from "./PaymentIcons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  const footerLinks = [
    {
      title: "Shop",
      links: ["New Arrivals", "Bestsellers", "All Products", "Gift Cards"],
    },
    {
      title: "Company",
      links: ["About Us", "Sustainability", "Careers", "Press"],
    },
    {
      title: "Support",
      links: ["Contact", "Shipping", "Returns", "Size Guide"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="bg-charcoal border-t border-border/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={lemariLogo}
              alt="Lemari"
              className="h-8 w-auto brightness-0 invert mb-6"
            />
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Elevated essentials for the modern wardrobe. Crafted with intention.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs tracking-luxury uppercase text-foreground/70 mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light luxury-link"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex justify-center">
          <PaymentIcons className="opacity-60" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Lemari. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
