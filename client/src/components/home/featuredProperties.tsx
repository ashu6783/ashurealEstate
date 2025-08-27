"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
}

interface InfiniteMovingCardProps {
  properties: Property[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteMovingCard: React.FC<InfiniteMovingCardProps> = ({
  properties,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!start && containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      let duration = "40s";
      if (speed === "fast") duration = "20s";
      else if (speed === "slow") duration = "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }, [start, direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-6 py-4 w-max animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] bg-white overflow-hidden"
          >
           <div className="h-48 w-full flex items-center justify-center relative overflow-hidden rounded-xl shadow-lg bg-black/40 backdrop-blur-md border border-white/10">
  <div className="relative z-10 text-white font-bold text-lg p-4 text-center">
    {property.title}
  </div>
</div>


            <div className="p-4">
              <p className="text-gray-700 text-sm line-clamp-2">{property.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[#B8860B] font-semibold text-base">{property.price}</span>
                <button className="px-3 py-1 bg-[#B8860B] text-white rounded-md text-sm hover:bg-[#c7a03c] transition-colors duration-300">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMovingCard;
