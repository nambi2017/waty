import React from "react";

const EnhancedShimmer = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base shimmer with curved borders */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-700/20 to-gray-800/20 rounded-xl" />
      
      {/* Glowing gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent animate-shimmer rounded-xl" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/2 to-purple-500/2 blur-sm animate-pulse rounded-xl" />
      
      {/* Content placeholder */}
      <div className="w-full h-full bg-transparent" />
    </div>
  );
};

export default EnhancedShimmer;