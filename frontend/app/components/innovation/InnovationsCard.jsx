"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import EnhancedShimmer from "../shimmer/enhancedShimmer";
import ShimmerCard from "../shimmer/shimmerCard";

// Custom arrow SVG components
const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const InnovationsCard = () => {
  const { watyLearningData } = FetchWatyLearningHomepageData();
  const { 
    title = "", 
    description = "", 
    items = [] 
  } = watyLearningData?.vision || {};
  const isLoading = !watyLearningData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    let intervalId;
    if (!isPaused && items.length > 0) {
      intervalId = setInterval(goToNext, 3000); // 3 second interval
    }
    return () => clearInterval(intervalId);
  }, [isPaused, goToNext, items.length]);

  // Shimmer content for loading state
  const shimmerContent = (
    <>
      <EnhancedShimmer className="w-3/4 md:w-1/2 h-12 mb-4" />
      <EnhancedShimmer className="w-full max-w-4xl h-20 mb-10" />
      <div className="flex gap-8 justify-center">
        <ShimmerCard />
        <ShimmerCard />
      </div>
    </>
  );

  return (
    <section className="bg-mainColor h-auto py-16 max-sm:py-0 mt-10 md:mt-0 max-sm:mt-0">
      <div className="flex flex-col items-center">
        {isLoading ? (
          shimmerContent
        ) : (
          <>
            <h1 className="font-tertiary mt-10 font-bold text-2xl max-sm:text-lg md:text-3xl lg:text-4xl text-center tracking-wide text-innovaColor mb-4">
              {title}
            </h1>
            <p className="font-secondary text-lg max-sm:text-sm md:text-xl lg:text-xl text-center max-w-4xl tracking-wide text-innovaColor mb-10">
              {description}
            </p>
          </>
        )}

        {/* Carousel Section */}
        {!isLoading && items.length > 0 && (
          <div
            className="relative w-full max-w-7xl mx-auto px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-[430px] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => {
                  const isCenter = idx === currentIndex;
                  const isLeft =
                    idx === currentIndex - 1 ||
                    (currentIndex === 0 && idx === items.length - 1);
                  const isRight =
                    idx === currentIndex + 1 ||
                    (currentIndex === items.length - 1 && idx === 0);

                  if (!isCenter && !isLeft && !isRight) return null;

                  return (
                    <motion.div
                      key={idx}
                      className={`absolute w-full md:w-[320px] lg:w-[550px] h-[400px] 
                        rounded-lg overflow-hidden ${isCenter ? "z-20" : "z-10"}`}
                      initial={{
                        scale: 0.8,
                        x: isLeft ? -300 : isRight ? 300 : 0,
                        opacity: 0.5,
                      }}
                      animate={{
                        scale: isCenter ? 1 : 0.8,
                        x: isLeft ? -300 : isRight ? 300 : 0,
                        opacity: isCenter ? 1 : 0.5,
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex flex-col justify-start p-8 bg-gradient-to-t from-black/70 to-transparent">
                          <h2 className="font-primary font-bold text-xl lg:text-2xl text-white mb-2">
                            {item.title}
                          </h2>
                          <p className="pt-10 text-base lg:text-lg text-white overflow-hidden text-ellipsis">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg- text-white bg-gradient-to-b from-[#6A5ACD] to-[#483D8B]
                rounded-full p-2 shadow-lg hover:bg-white hover:text-black border-arrowBtnColor border transition-colors z-30"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-gradient-to-b from-[#6A5ACD] to-[#483D8B]
                rounded-full p-2 shadow-lg hover:bg-white hover:text-black border border-arrowBtnColor transition-colors z-30"
            >
              <ChevronRight />
            </button>

            {/* Progress indicators */}
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {items.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 
                    ${idx === currentIndex ? "bg-arrowBtnColor" :"bg-dotColor"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InnovationsCard;
