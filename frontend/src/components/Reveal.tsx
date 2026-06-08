import React, { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "left" | "right" | "scale";

interface RevealProps {
  children: React.ReactNode;
  /** Element tag to render as. Defaults to a div. */
  as?: keyof JSX.IntrinsicElements;
  /** Entrance direction. */
  direction?: RevealDirection;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Extra classes applied to the wrapper. */
  className?: string;
  /** Reveal only once (default) or every time it enters the viewport. */
  once?: boolean;
  /** Any extra DOM props (id, onClick, etc.) are forwarded to the element. */
  [key: string]: unknown;
}

const directionClass: Record<RevealDirection, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

/**
 * Wraps content so it fades/slides into view when scrolled into the viewport.
 * Uses IntersectionObserver (no runtime cost when idle) and degrades gracefully
 * via the prefers-reduced-motion rules in index.css.
 */
export default function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  className = "",
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is unavailable, just show the content.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass[direction]} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
