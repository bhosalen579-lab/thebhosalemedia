"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A hook that creates a magnetic pull effect towards the cursor.
 * @param strength The multiplier of the pull (0.1 to 1.0)
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      
      // Calculate mouse position relative to the element's center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = clientX - centerX;
      const y = clientY - centerY;
      
      // Pull the element towards the cursor
      setPosition({ x: x * strength, y: y * strength });
    };

    const handleMouseLeave = () => {
      // Return to original position
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [strength]);

  return { ref, position };
}
