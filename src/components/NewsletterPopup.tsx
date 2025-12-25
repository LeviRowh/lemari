import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import lemariLogo from "@/assets/lemari-logo.png";

interface NewsletterPopupProps {
  delaySeconds?: number;
}

const NewsletterPopup = ({ delaySeconds = 30 }: NewsletterPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem("newsletter-popup-shown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("newsletter-popup-shown", "true");
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-card border border-border/30 shadow-2xl max-w-md w-full pointer-events-auto overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12 text-center">
                {/* Logo */}
                <motion.img
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={lemariLogo}
                  alt="Lemari"
                  className="h-8 w-auto mx-auto mb-8 brightness-0 invert"
                />

                {!submitted ? (
                  <>
                    {/* Headline */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="font-serif text-2xl md:text-3xl font-light tracking-wide mb-3"
                    >
                      Join the Inner Circle
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-muted-foreground font-light mb-6"
                    >
                      Be first to access new collections, exclusive drops, and private events.
                    </motion.p>

                    {/* Incentive */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mb-8 py-4 px-6 bg-secondary/50 border border-border/30"
                    >
                      <p className="text-sm tracking-wider uppercase text-foreground/80">
                        Unlock 15% Off
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your first order as an insider
                      </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background/50 border-border/50 text-center tracking-wide placeholder:text-muted-foreground/50"
                      />
                      <Button
                        type="submit"
                        className="w-full bg-foreground text-background hover:bg-foreground/90 tracking-wider uppercase text-sm py-6"
                      >
                        Secure Early Access
                      </Button>
                    </motion.form>

                    {/* Fine Print */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="text-xs text-muted-foreground/60 mt-6"
                    >
                      By subscribing, you agree to receive marketing communications. Unsubscribe anytime.
                    </motion.p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="py-8"
                  >
                    <div className="text-4xl mb-4">✦</div>
                    <h3 className="font-serif text-xl font-light tracking-wide mb-2">
                      Welcome to the Circle
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Check your inbox for your exclusive 15% off code.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Decorative Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;