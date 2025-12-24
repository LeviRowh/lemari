import { useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

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

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 bg-charcoal"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Title */}
        <h2
          ref={(el) => (elementsRef.current[0] = el)}
          className="reveal font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8"
        >
          The Philosophy
        </h2>

        {/* Main Text */}
        <p
          ref={(el) => (elementsRef.current[1] = el)}
          className="reveal text-lg md:text-xl font-light leading-relaxed text-foreground/80 mb-8"
          style={{ transitionDelay: "100ms" }}
        >
          Lemari was born from a singular belief: that exceptional quality and 
          timeless design should form the foundation of every wardrobe. We create 
          pieces that transcend seasons and trends, crafted to become the building 
          blocks of your personal style.
        </p>

        <p
          ref={(el) => (elementsRef.current[2] = el)}
          className="reveal text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-12"
          style={{ transitionDelay: "200ms" }}
        >
          Each garment is thoughtfully designed with an obsessive attention to detail—from 
          the weight of the fabric to the precision of every seam. We partner with the world's 
          finest mills and ateliers, ensuring that every piece not only looks beautiful but 
          feels extraordinary against your skin.
        </p>

        {/* Values */}
        <div
          ref={(el) => (elementsRef.current[3] = el)}
          className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16"
          style={{ transitionDelay: "300ms" }}
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
        </div>

        {/* Quote */}
        <blockquote
          ref={(el) => (elementsRef.current[4] = el)}
          className="reveal mt-20 pt-12 border-t border-border/30"
          style={{ transitionDelay: "400ms" }}
        >
          <p className="font-serif text-xl md:text-2xl italic font-light text-foreground/70">
            "Less, but better."
          </p>
          <cite className="block mt-4 text-xs tracking-luxury uppercase text-muted-foreground not-italic">
            — Lemari Philosophy
          </cite>
        </blockquote>
      </div>
    </section>
  );
};

export default AboutSection;
