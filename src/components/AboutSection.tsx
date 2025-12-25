import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Calculate parallax offset relative to section
  const relativeScroll = scrollY - sectionTop + window.innerHeight;
  const parallaxOffset = relativeScroll * 0.05;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 bg-charcoal relative overflow-hidden"
    >
      {/* Chrome Hearts-inspired flowing organic background */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--foreground)) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 20%, hsl(var(--foreground)) 0%, transparent 45%),
            radial-gradient(ellipse 70% 60% at 60% 80%, hsl(var(--foreground)) 0%, transparent 40%)
          `,
          transform: `translateY(${-parallaxOffset * 0.5}px) scale(${1 + parallaxOffset * 0.001})`,
          filter: 'blur(40px)',
        }}
      />
      
      {/* Subtle flowing curves overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 120% 100% at 30% 100%, hsl(var(--foreground)) 0%, transparent 60%),
            radial-gradient(ellipse 100% 120% at 70% 0%, hsl(var(--foreground)) 0%, transparent 50%)
          `,
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Title */}
        <motion.h2
          ref={(el) => (elementsRef.current[0] = el)}
          className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`,
          }}
        >
          The Philosophy
        </motion.h2>

        {/* Main Text */}
        <motion.p
          ref={(el) => (elementsRef.current[1] = el)}
          className="reveal text-lg md:text-xl font-light leading-relaxed text-foreground/80 mb-8"
          style={{ 
            transitionDelay: "100ms",
            transform: `translateY(${parallaxOffset * 0.2}px)`,
          }}
        >
          Lemari was born from a singular belief: that exceptional quality and 
          timeless design should form the foundation of every wardrobe. We create 
          pieces that transcend seasons and trends, crafted to become the building 
          blocks of your personal style.
        </motion.p>

        <motion.p
          ref={(el) => (elementsRef.current[2] = el)}
          className="reveal text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-12"
          style={{ 
            transitionDelay: "200ms",
            transform: `translateY(${parallaxOffset * 0.15}px)`,
          }}
        >
          Each garment is thoughtfully designed with an obsessive attention to detail—from 
          the weight of the fabric to the precision of every seam. We partner with the world's 
          finest mills and ateliers, ensuring that every piece not only looks beautiful but 
          feels extraordinary against your skin.
        </motion.p>

        {/* Values */}
        <motion.div
          ref={(el) => (elementsRef.current[3] = el)}
          className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16"
          style={{ 
            transitionDelay: "300ms",
            transform: `translateY(${parallaxOffset * 0.1}px)`,
          }}
        >
          <div>
            <h3 className="font-serif text-xl mb-3">Quality</h3>
            <p className="text-sm text-muted-foreground font-light">
              Premium materials and expert craftsmanship in every piece
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3">Simplicity</h3>
            <p className="text-sm text-muted-foreground font-light">
              Clean lines and timeless silhouettes that never go out of style
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3">Versatility</h3>
            <p className="text-sm text-muted-foreground font-light">
              Designed to mix, match, and adapt to your life
            </p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          ref={(el) => (elementsRef.current[4] = el)}
          className="reveal mt-20 pt-12 border-t border-border/30"
          style={{ 
            transitionDelay: "400ms",
            transform: `translateY(${parallaxOffset * 0.05}px)`,
          }}
        >
          <p className="font-serif text-xl md:text-2xl italic font-light text-foreground/70">
            "Less, but better."
          </p>
          <cite className="block mt-4 text-xs tracking-luxury uppercase text-muted-foreground not-italic">
            — Lemari Philosophy
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default AboutSection;
