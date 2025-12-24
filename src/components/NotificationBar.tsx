import { useState, useEffect } from "react";
import { X, Mail, Phone, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NotificationBarProps {
  onClose?: () => void;
}

const NotificationBar = ({ onClose }: NotificationBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsExpanded(false);
      setSubmitted(false);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-border/30">
      {/* Main bar */}
      <div className="flex items-center justify-center py-3 px-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 text-sm tracking-luxury uppercase text-foreground/80 hover:text-foreground transition-colors duration-300"
        >
          <Bell className="w-4 h-4" />
          <span className="font-light">Be the first to know</span>
        </button>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="absolute right-4 text-foreground/50 hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded form */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 pt-2">
          {submitted ? (
            <p className="text-center text-sm text-foreground/80 animate-fade-in">
              Thank you for subscribing to Lemari updates.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 text-sm"
                    required
                  />
                </div>
                <div className="flex-1 relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-foreground text-background hover:bg-foreground/90 text-sm tracking-wider uppercase px-6"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Sign up for exclusive access to new collections, events, and more.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
