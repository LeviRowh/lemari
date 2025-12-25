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
      className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #e8e4df 0%, #d9d5d0 50%, #ccc8c3 100%)',
      }}
    >
      {/* Chrome Hearts-style large flowing organic shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${-parallaxOffset * 0.3}px)`,
        }}
      >
        {/* Main large curved shape - top right */}
        <div
          className="absolute -top-[20%] -right-[10%] w-[80%] h-[120%]"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 70% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 30%, transparent 70%)',
            filter: 'blur(2px)',
            transform: `rotate(-15deg) translateY(${parallaxOffset * 0.2}px)`,
          }}
        />
        
        {/* Secondary flowing curve - bottom left */}
        <div
          className="absolute -bottom-[30%] -left-[20%] w-[90%] h-[100%]"
          style={{
            background: 'radial-gradient(ellipse 80% 100% at 30% 70%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 70%)',
            filter: 'blur(3px)',
            transform: `rotate(20deg) translateY(${-parallaxOffset * 0.15}px)`,
          }}
        />

        {/* Accent curve - center flowing */}
        <div
          className="absolute top-[10%] left-[20%] w-[70%] h-[80%]"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.6) 0%, transparent 60%)',
            filter: 'blur(8px)',
            transform: `translateY(${parallaxOffset * 0.1}px) scale(${1 + parallaxOffset * 0.002})`,
          }}
        />

        {/* Soft highlight overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
          }}
        />
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Title */}
        <motion.h2
          ref={(el) => (elementsRef.current[0] = el)}
          className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8 text-neutral-800"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`,
          }}
        >
          The Philosophy
        </motion.h2>

        {/* Main Text */}
        <motion.p
          ref={(el) => (elementsRef.current[1] = el)}
          className="reveal text-lg md:text-xl font-light leading-relaxed text-neutral-700 mb-8"
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
          className="reveal text-base md:text-lg font-light leading-relaxed text-neutral-600 mb-12"
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
            <h3 className="font-serif text-xl mb-3 text-neutral-800">Quality</h3>
            <p className="text-sm text-neutral-600 font-light">
              Premium materials and expert craftsmanship in every piece
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3 text-neutral-800">Simplicity</h3>
            <p className="text-sm text-neutral-600 font-light">
              Clean lines and timeless silhouettes that never go out of style
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-3 text-neutral-800">Versatility</h3>
            <p className="text-sm text-neutral-600 font-light">
              Designed to mix, match, and adapt to your life
            </p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          ref={(el) => (elementsRef.current[4] = el)}
          className="reveal mt-20 pt-12 border-t border-neutral-400/30"
          style={{ 
            transitionDelay: "400ms",
            transform: `translateY(${parallaxOffset * 0.05}px)`,
          }}
        >
          <p className="font-serif text-xl md:text-2xl italic font-light text-neutral-700">
            "Less, but better."
          </p>
          <cite className="block mt-4 text-xs tracking-luxury uppercase text-neutral-500 not-italic">
            — Lemari Philosophy
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default AboutSection;
