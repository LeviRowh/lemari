import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import NotificationBar from "@/components/NotificationBar";
import HeroSection from "@/components/HeroSection";
import ProductsSection, { type CartItem } from "@/components/ProductsSection";
import LookbookGallery from "@/components/LookbookGallery";
import CheckoutModal from "@/components/CheckoutModal";
import AboutSection from "@/components/AboutSection";
import NotificationPreferences from "@/components/NotificationPreferences";
import Footer from "@/components/Footer";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showNotificationBar, setShowNotificationBar] = useState(true);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Notification Bar */}
      {showNotificationBar && (
        <NotificationBar onClose={() => setShowNotificationBar(false)} />
      )}

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => setIsCheckoutOpen(true)}
          className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-foreground text-background px-6 py-4 shadow-2xl hover:bg-foreground/90 transition-all duration-300"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm tracking-wider uppercase">
            Bag ({totalItems})
          </span>
        </motion.button>
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <ProductsSection onCartUpdate={setCartItems} />

      {/* Lookbook Gallery */}
      <LookbookGallery />

      {/* About Section */}
      <AboutSection />

      {/* Notification Preferences */}
      <NotificationPreferences />

      {/* Footer */}
      <Footer />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onUpdateCart={setCartItems}
      />
    </div>
  );
};

export default Index;
