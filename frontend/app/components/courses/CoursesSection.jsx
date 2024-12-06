"use client";
import { useState, useEffect } from "react";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import EnhancedShimmer from "../shimmer/enhancedShimmer";
import CourseData from "../Coursedata/CourseData";

const CoursesSection = () => {
  const { watyLearningData } = FetchWatyLearningHomepageData();
  const {
    title = "Courses",
    subTitle = "",
    description = "",
    items = [],
  } = watyLearningData?.courses || {};

  const isLoading = !watyLearningData;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourseForDialog, setSelectedCourseForDialog] = useState(null); // New state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  // Set the first category and its courses when data loads
  useEffect(() => {
    if (!isLoading && items?.length > 0) {
      const firstCategory = items[0]?.courseCategory || "";
      setSelectedCategory(firstCategory);
      setSelectedCourses(items[0]?.courses || []);
    }
  }, [isLoading, items]);

  // Shimmer Card for Courses
  const ShimmerCard = () => (
    <div className="rounded-xl overflow-hidden shadow-lg bg-cardColor text-paraColor hover:text-white p-6">
      <EnhancedShimmer className="h-40 w-full mb-4 rounded-xl" />
      {/* Image Shimmer */}
      <EnhancedShimmer className="h-6 w-3/4 mb-4" /> {/* Title Shimmer */}
      <EnhancedShimmer className="h-4 w-1/2 mb-6" /> {/* Duration Shimmer */}
      <EnhancedShimmer className="h-10 w-32 rounded-full" />
      {/* Button Shimmer */}
    </div>
  );

  return (
    <section id="courses" className="bg-mainColor h-auto text-white">
      {/* Title Section */}
      <div className="text-center max-sm:pt-0">
        {isLoading ? (
          <>
            <EnhancedShimmer className="h-8 w-1/3 mx-auto mb-4" />
            <EnhancedShimmer className="h-6 w-2/4 mx-auto mb-4" />
            <EnhancedShimmer className="h-5 w-3/4 mx-auto" />
          </>
        ) : (
          <>
            <div className="text-center 2xl:pt-10 xl:pt-10 md:pt-0 max-sm:pt-10">
              <h1 className="font-bold font-tertiary xl:text-future lg:text-future md:text-3xl pb-5">
                {title}
              </h1>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold font-tertiary 2xl:text-future xl:text-future lg:text-future md:text-future sm:text-3xl pb-5">
                {subTitle}
              </h2>
              <h1 className="text-boost 2xl:text-hawk xl:text-hawk lg:text-hawk md:text-hawk sm:text-xl">
                {description}
              </h1>
            </div>
          </>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center items-center mt-16">
        {isLoading ? (
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {Array.from({ length: 3 }).map((_, index) => (
              <EnhancedShimmer key={index} className="h-10 w-32 rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 button-group scrollbar-hide">
            {items.map((category) => (
              <button
                key={category.courseCategory}
                onClick={(e) => {
                  const categoryCourses =
                    items.find(
                      (cat) => cat.courseCategory === category.courseCategory
                    )?.courses || [];
                  setSelectedCategory(category.courseCategory);
                  setSelectedCourses(categoryCourses);
                  e.target.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                className={`px-10 py-3 rounded-full font-primary font-bold text-xl max-sm:text-sm box-border whitespace-nowrap hover:bg-techColor hover:text-white ${
                  selectedCategory === category.courseCategory
                    ? "bg-techColor text-white border border-t-white border-b-transparent border-l-transparent border-r-transparent"
                    : "text-coursesColor border border-coursesColor/20"
                }`}
              >
                {category.courseCategory}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Courses Grid */}
      <div className="flex justify-center mb-20 max-sm:mb-10">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-16 2xl:w-[80%] xl:w-[80%] lg:w-[80%] md:w-[90%] max-sm:w-[80%] mb-5">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ShimmerCard key={index} />
              )) // Show Shimmer Cards
            : selectedCourses.map((course, index) => (
                <div
                  key={`${course.courseTitle}-${index}`}
                  className="group rounded-xl overflow-hidden shadow-lg bg-cardColor text-paraColor hover:text-white flex flex-col justify-between h-full"
                >
                  {/* Course Image */}
                  <Image
                    src={course.image}
                    alt={course.courseTitle}
                    className="w-[90%] object-cover mx-auto rounded-xl relative top-4 group-hover:text-white"
                    width={300}
                    height={200}
                  />

                  {/* Course Details */}
                  <div className="px-6 py-6 flex-grow">
                    {/* Title and Duration */}
                    <div className="flex justify-between items-center mb-1">
                      <h2 className="font-primary font-bold text-heading">
                        {course.courseTitle}
                      </h2>
                      <p className="font-secondary text-card group-hover:text-white">
                        {course.courseDuration}
                      </p>
                    </div>
                    {/* Description */}
                    <p className="font-secondary text-paraColor text-[13px] group-hover:text-white truncate w-full">
                      {course.courseDescription}
                    </p>
                  </div>

                  {/* Pricing and Enroll Button */}
                  <div
                    className={`px-6 pb-6 flex items-center ${
                      course.price && course.discountedPrice
                        ? "justify-between"
                        : course.price
                          ? "justify-between"
                          : "justify-end"
                    }`}
                  >
                    {/* Pricing Section */}
                    {course.price && course.discountedPrice ? (
                      <div className="flex">
                        <p className="font-secondary font-bold text-paraColor text-[16px] group-hover:text-white">
                          {course.discountedPrice}
                          <span className="font-secondary ms-4 font-bold text-paraColor text-[16px] group-hover:text-white line-through">
                            {course.price}
                          </span>
                        </p>
                      </div>
                    ) : course.price ? (
                      <p className="font-secondary font-bold text-paraColor text-[16px] group-hover:text-white">
                        {course.price}
                      </p>
                    ) : null}

                    {/* Enroll Button */}
                    <button
                      onClick={() => {
                        setSelectedCourseForDialog(course); // Set course for dialog
                        setIsDialogOpen(true); // Open dialog
                      }}
                      className="relative whitespace-nowrap transition-all duration-200 flex items-center gap-3 px-5 py-2 text-white rounded-xl bg-gradient-to-r from-[#6B0EAD] to-[#E346EB] shadow-black shadow-2xl transform hover:scale-105"
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

                      <span className="relative z-10 font-secondary text-[10px] text-white font-bold">
                        {course.enrollNowAction}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Dialog for Selected Course */}
      {isDialogOpen && selectedCourseForDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <CourseData course={selectedCourseForDialog} onClose={toggleDialog} />
        </div>
      )}
    </section>
  );
};

export default CoursesSection;
