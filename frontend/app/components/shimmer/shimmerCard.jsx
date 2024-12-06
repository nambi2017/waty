import React from "react";
import EnhancedShimmer from "./enhancedShimmer";

// Shimmer card component for loading state
const ShimmerCard = () => (
    <div className="w-full md:w-[calc(50%-1rem)] max-w-xl">
      {/* Card background shimmer */}
      <div className="relative">
        <EnhancedShimmer className="w-full h-[200px] rounded-lg" />
        
        {/* Overlayed content shimmer */}
        <div className="absolute inset-0 flex flex-col justify-around items-start p-6 md:p-8">
          {/* Title shimmer */}
          <EnhancedShimmer className="w-3/4 h-10 mb-4" />
          
          {/* Description shimmer */}
          <EnhancedShimmer className="w-full h-24" />
        </div>
      </div>
    </div>
  );

export default ShimmerCard;