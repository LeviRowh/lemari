import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LookbookImage {
  id: number;
  src: string;
  title: string;
  season: string;
}

const lookbookImages: LookbookImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1600&fit=crop",
    title: "Monochrome Elegance",
    season: "Autumn/Winter",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop",
    title: "Urban Minimalism",
    season: "Spring/Summer",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=1600&fit=crop",
    title: "Effortless Grace",
    season: "Resort",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop",
    title: "Timeless Silhouettes",
    season: "Autumn/Winter",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&h=1600&fit=crop",
    title: "Contemporary Noir",
    season: "Capsule Collection",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=1600&fit=crop",
    title: "Pure Essence",
    season: "Spring/Summer",
  },
];

const LookbookGallery = () => {
  const [selectedImage, setSelectedImage] = useState<LookbookImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax effect for images
  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = (rect.top + scrolled) * 0.03;
        const img = ref.querySelector("img");
        if (img) {
          img.style.transform = `translateY(${rate - scrolled * 0.05}px) scale(1.1)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLightbox = (image: LookbookImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % lookbookImages.length
        : (currentIndex - 1 + lookbookImages.length) % lookbookImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(lookbookImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "ArrowLeft") navigateImage("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <section ref={sectionRef} id="lookbook" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4">
            The Lookbook
          </h2>
          <p className="text-muted-foreground text-sm tracking-wider uppercase">
            A visual journey through our collections
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {lookbookImages.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => (imageRefs.current[index] = el)}
              className={`reveal group relative overflow-hidden cursor-pointer ${
                index === 0 || index === 3 ? "md:row-span-2" : ""
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
              onClick={() => openLightbox(image, index)}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 || index === 3
                    ? "aspect-[3/4] md:aspect-[3/5]"
                    : "aspect-[3/4]"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-xs tracking-luxury uppercase text-muted-foreground mb-2">
                    {image.season}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 md:left-8 z-50 p-3 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 md:right-8 z-50 p-3 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain"
              />
              
              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent"
              >
                <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                  {selectedImage.season}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-1">
                  {selectedImage.title}
                </h3>
              </motion.div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-wider text-muted-foreground">
              {currentIndex + 1} / {lookbookImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LookbookGallery;
