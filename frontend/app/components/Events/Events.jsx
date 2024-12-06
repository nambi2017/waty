"use client";
import { useState } from "react";
import EventsData from "../Eventsdata/EventsData";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import GlowingButton from "../GlowingButton/GlowingButton";
import EnhancedShimmer from "../shimmer/enhancedShimmer";

const Events = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEnrollNowClick = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  const { watyLearningData } = FetchWatyLearningHomepageData();
  const { title, description, items } = watyLearningData?.events || {
    title: "Events",
    description: "",
    items: [],
  };

  const isLoading = !watyLearningData;

  // Shimmer card component for loading state
  const ShimmerCard = () => (
    <div className="flex flex-col md:flex-row items-center justify-around p-8 rounded-3xl xl:w-[864px] xl:h-[425.2px] lg:w-[864px] lg:h-[425.2px] md:w-full sm:w-full sm:h-auto mx-auto border border-white border-opacity-10 shadow-lg bg-bgColor text-white relative top-20 mb-10">
      <div className="bg-bgColor text-white rounded-2xl flex flex-col w-1/2">
        {/* Title shimmer */}
        <EnhancedShimmer className="h-8 w-3/4 mb-6" />

        {/* Description shimmer */}
        <EnhancedShimmer className="h-20 w-full mb-8" />

        {/* Button shimmer */}
        <EnhancedShimmer className="h-12 w-[150px] rounded-3xl" />
      </div>

      <div className="w-1/2">
        {/* Image shimmer */}
        <EnhancedShimmer className="h-[240px] w-[362.83px] rounded-xl" />

        {/* Date and time shimmer */}
        <div className="flex flex-row xl:gap-20 lg:gap-20 md:gap-20 sm:flex sm:justify-center gap-16 pt-10 pb-10">
          <span className="flex flex-col gap-2">
            <EnhancedShimmer className="h-4 w-20" />
            <EnhancedShimmer className="h-5 w-32" />
          </span>

          <span className="flex flex-col gap-2">
            <EnhancedShimmer className="h-4 w-20" />
            <EnhancedShimmer className="h-5 w-32" />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="events"
      className="bg-mainColor 2xl:h-auto xl:h-auto lg:h-auto md:h-auto sm:h-screen"
    >
      <div className="flex justify-center items-center">
        {isLoading ? (
          <EnhancedShimmer className="h-12 w-40 rounded-3xl" />
        ) : (
          <GlowingButton className="border-2 border-white/10 px-9 bg-black/25 py-2 text-xl font-semibold tracking-widest rounded-3xl mb-5 text-white uppercase">
            {title}
          </GlowingButton>
        )}
      </div>

      <div>
        {isLoading ? (
          <EnhancedShimmer className="h-12 w-72 mx-auto mt-5" />
        ) : (
          <p className="text-boost 2xl:text-hawk xl:text-hawk lg:text-hawk md:text-hawk max-sm:text-sm text-center pt-5">
            {description}
          </p>
        )}
      </div>

      {isLoading ? (
        // Show two shimmer cards while loading
        <>
          <ShimmerCard />
          <ShimmerCard />
        </>
      ) : (
        items.map((event, index) => (
          <div
            key={index}
            className="bg-finalEventColor flex flex-col md:flex-row sm:flex-col items-center justify-around p-8 rounded-3xl xl:w-[864px] xl:h-[400px] lg:w-[864px] lg:h-[425.2px] md:w-[700px] max-sm:w-[350px] max-sm:h-[500px] mx-auto border border-white border-opacity-10 shadow-lg text-white relative top-20 mb-10 max-sm:top-10 max-sm:block"
          >
            <div className="text-white rounded-2xl flex flex-col relative md:w-1/2">
              <h1 className="font-primary xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl font-semibold relative bottom-20 max-sm:top-2">
                {event.courseTitle}
              </h1>

              {/* Description with consistent height */}
              <div className="h-[80px] max-sm:h-[60px] flex items-center max-sm:mt-10">
                {event.courseDescription ? (
                  <p className="text-paraColor font-secondary text-sm max-sm:text-xs w-[80%]">
                    {event.courseDescription}
                  </p>
                ) : (
                  <p className="text-paraColor font-secondary text-sm max-sm:text-xs w-[80%] invisible">
                    Placeholder text for consistent height
                  </p>
                )}
              </div>

              <div>
              <button
                  onClick={() => handleEnrollNowClick(event)}
                  className="relative max-sm:w-[100px] font-primary text-[18px] max-sm:text-[12px] max-sm:px-1 max-sm:py-2 whitespace-nowrap transition-all duration-200 p-2 box-border w-[150px] xl:top-14 lg:top-14 md:top-14 max-sm:top-72 text-white rounded-2xl bg-gradient-to-r from-[#6B0EAD] to-[#E346EB] shadow-black shadow-2xl transform hover:scale-105"
                >
                  {/* Inner Shadow */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: `inset -2px -3px 6px rgba(255, 255, 255, 0.25)`,
                    }}
                  ></div>

                  {/* Decorative Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent pointer-events-none rounded-2xl"></div>

                  {/* Button Text */}
                  <span className="relative z-10 font-secondary text-white font-bold">
                    {event.enrollNowAction}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <Image
                src={event.image}
                width={900}
                height={614}
                alt="card-image"
                className="rounded-xl object-contain h-auto mt-5 max-sm:mt-0 w-[362.83px]"
              />
              <div className="flex flex-row xl:gap-20 lg:gap-20 md:gap-20 sm:flex sm:justify-center gap-16 xl:pt-10 lg:pt-10 md:pt-10 pb-10 max-sm:pt-3 max-sm:justify-center">
                <span className="flex flex-col">
                  <p className="font-secondary text-sm text-paraColor">
                    {event.courseDateTitle}
                  </p>
                  <p className="font-secondary text-base max-sm:text-sm text-paraColor">
                    {event.courseDate}
                  </p>
                </span>

                <span className="flex flex-col">
                  <p className="font-secondary text-sm text-paraColor">
                    {event.coursePeriodTitle}
                  </p>
                  <p className="font-secondary text-base max-sm:text-sm text-paraColor">
                    {event.coursePeriod}
                  </p>
                </span>
              </div>
            </div>
          </div>
        ))
      )}

      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeDialog} // Close dialog when clicking outside the content
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EventsData event={selectedEvent} onClose={closeDialog} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
