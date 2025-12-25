import { useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CartItem } from "./ProductsSection";
import PaymentIcons from "./PaymentIcons";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateCart: (items: CartItem[]) => void;
}

// Payment method data with SVG icons for Shopify-compatible checkout
const paymentMethods = [
  { id: "apple", name: "Apple Pay", icon: (
    <svg viewBox="0 0 38 24" className="w-12 h-8"><rect width="38" height="24" rx="3" fill="currentColor" className="text-secondary"/><path d="M12.3 8.4c.3-.4.5-1 .4-1.5-.5 0-1.1.3-1.4.7-.3.4-.5.9-.4 1.5.5 0 1.1-.3 1.4-.7zm.4.8c-.8 0-1.4.5-1.8.5-.4 0-1-.5-1.7-.5-.9 0-1.7.5-2.1 1.3-.9 1.6-.2 3.9.6 5.2.4.6.9 1.3 1.6 1.3.6 0 .9-.4 1.6-.4.7 0 .9.4 1.6.4.7 0 1.1-.6 1.5-1.2.5-.7.7-1.4.7-1.4 0 0-1.3-.5-1.3-2 0-1.3 1-1.9 1.1-1.9-.6-.9-1.6-1-1.9-1-.8-.1-1.6.4-1.9.4v-.2zm5.5 6.5v-7h2.4c1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1h-1.4v2.8h-1zm1-3.8h1.2c.8 0 1.2-.4 1.2-1.1 0-.7-.4-1.1-1.2-1.1h-1.2v2.2zm4.2 3.8c.8 0 1.4-.4 1.7-.9v.9h.9v-4.9h-1v.9c-.3-.6-.9-.9-1.6-.9-1.2 0-2 .9-2 2.5 0 1.5.8 2.4 2 2.4zm.3-.9c-.7 0-1.2-.6-1.2-1.5 0-1 .5-1.5 1.2-1.5.7 0 1.2.6 1.2 1.5 0 1-.5 1.5-1.2 1.5zm4.1 2.4c1 0 1.5-.4 1.9-1.4l1.8-4.9h-1l-1.1 3.5-1.1-3.5h-1l1.6 4.6-.1.3c-.2.4-.4.5-.8.5-.1 0-.3 0-.4 0v.8c.1.1.2.1.2.1z" fill="currentColor" className="text-foreground"/></svg>
  )},
  { id: "paypal", name: "PayPal", icon: (
    <svg viewBox="0 0 38 24" className="w-12 h-8"><rect width="38" height="24" rx="3" fill="currentColor" className="text-secondary"/><path d="M24.7 9.4c.3-1.9-.1-3.2-1.2-4.3-1.2-1.3-3.3-1.9-6-1.9H11c-.5 0-.9.3-1 .8L7.3 20.3c-.1.4.2.8.6.8h4.4l1.1-6.9v.2c.1-.5.5-.8 1-.8h2c4 0 7.2-1.6 8.1-6.3v.1z" fill="#003087"/><path d="M25.1 9.3c-1 4.7-4.1 6.3-8.1 6.3h-2c-.5 0-.9.3-1 .8l-1.3 8.2c0 .3.2.6.5.6h3.6c.4 0 .8-.3.9-.7l.7-4.8c.1-.4.5-.7.9-.7h.6c3.5 0 6.3-1.4 7.1-5.6.3-1.5.2-2.8-.6-3.7-.3-.2-.5-.4-.8-.5l-.5.1z" fill="#009cde"/></svg>
  )},
  { id: "gpay", name: "Google Pay", icon: (
    <svg viewBox="0 0 38 24" className="w-12 h-8"><rect width="38" height="24" rx="3" fill="currentColor" className="text-secondary"/><path d="M18.8 12.4v2.3h-.7v-5.6h1.9c.5 0 .9.1 1.2.4.3.3.5.7.5 1.1 0 .5-.2.8-.5 1.1-.3.3-.7.4-1.2.4h-1.2v.3zm0-2.7v2h1.2c.3 0 .6-.1.8-.3.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.8-.3h-1.2zm5.3.9c.5 0 .9.1 1.2.4.3.3.4.7.4 1.2v2.5h-.7v-.6c-.2.4-.6.7-1.2.7-.5 0-.9-.1-1.2-.4-.3-.3-.4-.6-.4-1s.1-.7.4-.9c.3-.2.7-.4 1.2-.4h1.2v-.1c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.8-.3-.2 0-.4 0-.6.1-.2.1-.4.2-.5.3l-.4-.5c.2-.2.4-.3.7-.4.3-.1.6-.2.9-.2h.1zm-.3 3.9c.3 0 .5-.1.7-.2.2-.1.4-.3.5-.6v-.6h-1.1c-.6 0-.9.2-.9.6 0 .2.1.4.3.5.2.1.4.2.6.2l-.1.1zm3.6 1.2l-1.6-4.3h.8l1.2 3.4 1.2-3.4h.8l-1.6 4.3h-.8z" fill="#5f6368"/><path d="M13.2 12.4c0-.3 0-.5-.1-.8h-3v1.5h1.7c-.1.4-.3.8-.6 1v.8h1c.6-.5.9-1.3.9-2.3l.1-.2z" fill="#4285f4"/><path d="M10.1 15.5c.9 0 1.6-.3 2.1-.8l-1-.8c-.3.2-.7.3-1.1.3-.8 0-1.5-.6-1.8-1.3H8.2v.8c.5 1 1.5 1.7 2.7 1.7l-.8.1z" fill="#34a853"/><path d="M8.3 11.9c-.1-.3-.2-.5-.2-.8s.1-.6.2-.8v-.9H7.2c-.3.5-.4 1.1-.4 1.7s.1 1.2.4 1.7l1.1-.9z" fill="#fbbc04"/><path d="M10.1 9c.5 0 .9.2 1.2.5l.9-.9c-.5-.5-1.3-.8-2.1-.8-1.2 0-2.2.7-2.7 1.7l1.1.9c.3-.8 1-1.4 1.8-1.4h-.2z" fill="#ea4335"/></svg>
  )},
  { id: "card", name: "Credit Card", icon: (
    <svg viewBox="0 0 38 24" className="w-12 h-8"><rect width="38" height="24" rx="3" fill="currentColor" className="text-secondary"/><rect x="4" y="7" width="30" height="3" fill="currentColor" className="text-muted-foreground"/><rect x="4" y="13" width="8" height="2" rx="1" fill="currentColor" className="text-muted-foreground/50"/><rect x="14" y="13" width="6" height="2" rx="1" fill="currentColor" className="text-muted-foreground/50"/></svg>
  )},
];

const CheckoutModal = ({ isOpen, onClose, cartItems, onUpdateCart }: CheckoutModalProps) => {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const updateQuantity = (id: number, delta: number) => {
    const newCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
      .filter((item) => item.quantity > 0);
    onUpdateCart(newCart);
  };

  const removeItem = (id: number) => {
    onUpdateCart(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-l border-border/30 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border/30">
          <SheetTitle className="font-serif text-xl font-light tracking-wide">
            {step === "cart" ? "Shopping Bag" : "Checkout"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {step === "cart" ? (
            <>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your bag is empty</p>
                  <Button
                    variant="outline"
                    className="mt-6 tracking-wider uppercase text-xs"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-32 object-cover bg-secondary"
                      />
                      <div className="flex-1">
                        <p className="text-xs tracking-luxury uppercase text-muted-foreground">
                          {item.category}
                        </p>
                        <h4 className="font-serif text-sm mt-1">{item.name}</h4>
                        <p className="text-sm mt-1">${item.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 ml-auto text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="p-6 space-y-6">
              {/* Payment Methods */}
              <div>
                <Label className="text-xs tracking-luxury uppercase text-muted-foreground">
                  Payment Method
                </Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 border rounded text-center transition-all flex flex-col items-center gap-2 ${
                        selectedPayment === method.id
                          ? "border-foreground bg-secondary"
                          : "border-border/50 hover:border-foreground/50"
                      }`}
                    >
                      {method.icon}
                      <span className="text-xs tracking-wider">{method.name}</span>
                    </button>
                  ))}
                </div>
                
                {/* Accepted Payment Methods */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground mb-3">We accept</p>
                  <PaymentIcons className="justify-center" />
                </div>
              </div>

              <Separator className="bg-border/30" />

              {/* Shipping Info */}
              <div className="space-y-4">
                <Label className="text-xs tracking-luxury uppercase text-muted-foreground">
                  Shipping Address
                </Label>
                <Input placeholder="Full Name" className="bg-background/50 border-border/50" />
                <Input placeholder="Email Address" className="bg-background/50 border-border/50" />
                <Input placeholder="Address" className="bg-background/50 border-border/50" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="City" className="bg-background/50 border-border/50" />
                  <Input placeholder="Postal Code" className="bg-background/50 border-border/50" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border/30 p-6 space-y-4 bg-card">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator className="bg-border/30 my-2" />
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {step === "cart" ? (
              <Button
                onClick={() => setStep("checkout")}
                className="w-full bg-foreground text-background hover:bg-foreground/90 tracking-wider uppercase text-sm py-6"
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Button
                disabled={!selectedPayment}
                className="w-full bg-foreground text-background hover:bg-foreground/90 tracking-wider uppercase text-sm py-6 disabled:opacity-50"
              >
                Complete Order
              </Button>
            )}

            {step === "checkout" && (
              <button
                onClick={() => setStep("cart")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Bag
              </button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CheckoutModal;
