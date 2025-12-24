import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import lemariLogo from "@/assets/lemari-logo.png";
import starVideo from "@/assets/star-background.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  }, []);

  // Cinematic parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate parallax values
  const videoScale = 1 + scrollY * 0.0003;
  const videoOpacity = Math.max(0, 1 - scrollY * 0.001);
  const contentY = scrollY * 0.4;
  const contentOpacity = Math.max(0, 1 - scrollY * 0.002);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `scale(${videoScale})`,
          opacity: videoOpacity,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={starVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4"
        style={{
          transform: `translateY(${contentY}px)`,
          opacity: contentOpacity,
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={lemariLogo}
            alt="Lemari"
            className="h-24 md:h-32 lg:h-40 w-auto object-contain brightness-0 invert"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-sm md:text-base tracking-ultra uppercase text-foreground/70 font-light text-center"
        >
          Elevated Essentials for the Modern Wardrobe
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-xs md:text-sm text-muted-foreground font-light max-w-md text-center"
        >
          Timeless pieces crafted with intention
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          onClick={scrollToProducts}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground transition-colors duration-300 animate-float"
        >
          <span className="text-xs tracking-luxury uppercase">Discover</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
