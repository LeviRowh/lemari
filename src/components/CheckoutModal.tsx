import { useState } from "react";
import { X, CreditCard, Smartphone, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
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

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateCart: (items: CartItem[]) => void;
}

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

  const paymentMethods = [
    { id: "apple", name: "Apple Pay", icon: "🍎" },
    { id: "paypal", name: "PayPal", icon: "💳" },
    { id: "venmo", name: "Venmo", icon: "📱" },
    { id: "card", name: "Credit Card", icon: "💳" },
  ];

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
                      className={`p-4 border rounded text-center transition-all ${
                        selectedPayment === method.id
                          ? "border-foreground bg-secondary"
                          : "border-border/50 hover:border-foreground/50"
                      }`}
                    >
                      <span className="text-2xl block mb-1">{method.icon}</span>
                      <span className="text-xs tracking-wider">{method.name}</span>
                    </button>
                  ))}
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
