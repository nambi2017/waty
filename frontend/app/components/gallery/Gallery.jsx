"use client";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import GlowingButton from "../GlowingButton/GlowingButton";
import EnhancedShimmer from "../shimmer/enhancedShimmer";

const Gallery = () => {
  const { watyLearningData } = FetchWatyLearningHomepageData();
  const { title, items } = watyLearningData?.gallery || {
    title: "Gallery",
    items: [],
  };
  const isLoading = !watyLearningData;

  // Shimmer card for loading state
  const ShimmerCard = () => (
    <div className="relative h-[500px] max-sm:h-[200px] md:h-[300px] w-full">
      <EnhancedShimmer className="w-full h-full rounded-md" />
    </div>
  );

  // Array of 8 items for shimmer loading
  const shimmerCount = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section id="gallery" className="relative bg-mainColor text-white">
      {/* Title Button */}
      <div className="flex justify-center items-center pb-14">
        {isLoading ? (
          <EnhancedShimmer className="w-40 h-12 rounded-3xl" />
        ) : (
          <GlowingButton className="border-2 border-white/10 px-8 py-2 text-xl font-semibold tracking-widest rounded-3xl mb-4 uppercase">
            {title}
          </GlowingButton>
        )}
      </div>

      {/* Card Container */}
      <div className="relative rounded-lg shadow-lg">
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 gap-2">
          {isLoading
            ? // Map through shimmerCount array to create shimmer cards
              shimmerCount.map((index) => (
                <ShimmerCard key={`shimmer-${index}`} />
              ))
            : items.map((imageSet, index) => (
                <div
                  key={index}
                  className="relative h-[500px] max-sm:h-[200px] md:h-[300px] w-full group"
                >
                  <Image
                    src={imageSet.image}
                    alt={`Gallery image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md w-full h-auto overflow-hidden transition duration-300 group-hover:brightness-125"
                  />
                </div>
              ))}
        </div>

        {/* Centered Gallery Name Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isLoading ? (
            <EnhancedShimmer className="w-48 h-16 rounded" />
          ) : (
            <h2 className="text-white text-gallery max-sm:text-5xl bg-opacity-60 px-4 py-1 text-2xl font-bold rounded">
              {title}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
