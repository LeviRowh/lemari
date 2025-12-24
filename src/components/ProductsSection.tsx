import { useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Silk Essentials Blouse",
    price: 285,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    description: "Luxuriously soft silk blouse with a relaxed silhouette. Perfect for elevated everyday wear.",
  },
  {
    id: 2,
    name: "Tailored Wide-Leg Trousers",
    price: 340,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
    description: "Impeccably tailored trousers in premium wool blend. A sophisticated foundation piece.",
  },
  {
    id: 3,
    name: "Cashmere Oversized Coat",
    price: 895,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop",
    description: "Enveloping warmth in pure cashmere. The ultimate statement in understated luxury.",
  },
  {
    id: 4,
    name: "Minimalist Leather Bag",
    price: 420,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
    description: "Hand-stitched Italian leather with a timeless silhouette. Built to last generations.",
  },
  {
    id: 5,
    name: "Organic Cotton Tee",
    price: 125,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
    description: "The perfect tee, elevated. Premium organic cotton with exceptional drape.",
  },
  {
    id: 6,
    name: "Structured Blazer",
    price: 485,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    description: "Sharp lines and impeccable construction. Transitions seamlessly from day to evening.",
  },
];

interface CartItem extends Product {
  quantity: number;
}

interface ProductsSectionProps {
  onCartUpdate: (items: CartItem[]) => void;
}

const ProductsSection = ({ onCartUpdate }: ProductsSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Image parallax effect
  useEffect(() => {
    const handleImageParallax = () => {
      productRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const img = ref.querySelector("img");
        if (img && rect.top < window.innerHeight && rect.bottom > 0) {
          const parallaxOffset = (rect.top - window.innerHeight / 2) * 0.08;
          img.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`;
        }
      });
    };

    window.addEventListener("scroll", handleImageParallax, { passive: true });
    return () => window.removeEventListener("scroll", handleImageParallax);
  }, []);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart: CartItem[];
    
    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    onCartUpdate(newCart);
  };

  return (
    <section id="products" ref={sectionRef} className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Parallax */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          style={{
            transform: `translateY(${(scrollY - 800) * 0.05}px)`,
          }}
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4">
            The Collection
          </h2>
          <p className="text-muted-foreground text-sm tracking-wider uppercase">
            Curated essentials for every moment
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              className="reveal product-card group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="overlay flex-col gap-4 p-6">
                  <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl text-center">{product.name}</h3>
                  <p className="text-lg font-light">${product.price}</p>
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs tracking-wider uppercase border-foreground/30 hover:bg-foreground hover:text-background"
                    >
                      Quick View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="text-xs tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              {/* Product Info (visible on mobile) */}
              <div className="mt-4 text-center sm:hidden">
                <p className="text-xs tracking-luxury uppercase text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl bg-card border-border/50 p-0 overflow-hidden">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              {/* Details */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <DialogHeader>
                  <p className="text-xs tracking-luxury uppercase text-muted-foreground mb-2">
                    {selectedProduct.category}
                  </p>
                  <DialogTitle className="font-serif text-2xl md:text-3xl font-light">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-2xl font-light mt-4">${selectedProduct.price}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-6 flex-1">
                  {selectedProduct.description}
                </p>
                <Button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90 tracking-wider uppercase text-sm py-6"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsSection;
export type { CartItem };
