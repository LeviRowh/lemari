import { useEffect, useState, useRef, RefObject } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
}

export const useParallax = <T extends HTMLElement>(
  options: ParallaxOptions = {}
): [RefObject<T>, { transform: string; opacity: number }] => {
  const { speed = 0.5, direction = "up" } = options;
  const ref = useRef<T>(null);
  const [style, setStyle] = useState({ transform: "translateY(0px)", opacity: 1 });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      
      const multiplier = direction === "up" ? -1 : 1;
      const translateY = distanceFromCenter * speed * multiplier * 0.1;
      
      // Calculate opacity based on visibility
      const visibility = 1 - Math.abs(distanceFromCenter) / windowHeight;
      const opacity = Math.max(0.3, Math.min(1, visibility + 0.5));
      
      setStyle({
        transform: `translateY(${translateY}px)`,
        opacity,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return [ref, style];
};

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

export const useElementParallax = <T extends HTMLElement>(
  speed: number = 0.3
): [RefObject<T>, number] => {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      
      // Only apply parallax when element is near viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffset(rate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return [ref, offset];
};
