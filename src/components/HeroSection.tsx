import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import lemariLogo from "@/assets/lemari-logo.png";
import starVideo from "@/assets/star-background.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo */}
        <div className="fade-in-up">
          <img
            src={lemariLogo}
            alt="Lemari"
            className="h-24 md:h-32 lg:h-40 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Tagline */}
        <p className="mt-8 text-sm md:text-base tracking-ultra uppercase text-foreground/70 font-light fade-in-up delay-200 text-center">
          Elevated Essentials for the Modern Wardrobe
        </p>

        {/* Subtitle */}
        <p className="mt-4 text-xs md:text-sm text-muted-foreground font-light fade-in-up delay-300 max-w-md text-center">
          Timeless pieces crafted with intention
        </p>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToProducts}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground transition-colors duration-300 animate-float"
        >
          <span className="text-xs tracking-luxury uppercase">Discover</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
