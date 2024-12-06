"use client";
import { useState } from "react";
import { FetchSettingsData } from "@/app/hooks/settingsData";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import arrow from "../../assets/Frame 1000001083.png";
import hamburgerIcon from "../../../public/hamburger-icon.svg";
import closeIcon from "../../../public/header-cancelbtn.svg";
import EnhancedShimmer from "../../components/shimmer/enhancedShimmer";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { watyLearningData } = FetchWatyLearningHomepageData();
  const { settingsData } = FetchSettingsData();

  const headerData = watyLearningData?.header;
  const aboutData = watyLearningData?.about;

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const isSettingsLoading = !settingsData;
  const isWatyDataLoading = !watyLearningData;

  return (
    <section className="bg-mainColor min-h-screen text-white">
      {/* Header */}
      <header className="bg-transparent relative top-6 text-white border border-white border-opacity-10 rounded-xl mx-auto flex items-center justify-between  xl:w-[700px] lg:w-[700px] md:w-[700px] p-4">
        {/* Logo */}
        {isSettingsLoading ? (
          <EnhancedShimmer className="w-8 h-8 rounded-full ml-4" />
        ) : (
          <Image
            className="logo ml-4"
            src={settingsData?.logo?.image}
            alt="Logo"
            width={45}
            height={45}
          />
        )}

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="sm:block md:hidden p-2 focus:outline-none z-30"
        >
          <Image
            src={menuOpen ? closeIcon : hamburgerIcon}
            alt="Menu Toggle"
            width={24}
            height={24}
          />
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {isSettingsLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <EnhancedShimmer key={index} className="w-20 h-4 rounded" />
                ))
            : settingsData?.headerItems?.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.navTitle.toLowerCase()}`}
                  className={`hover:text-gray-400 text-base font-primary ${
                    index === settingsData.headerItems.length - 1 ? "mr-10" : ""
                  }`}
                >
                  {item.navTitle}
                </a>
              ))}
          <a href="#footer">
            {isSettingsLoading ? (
              <EnhancedShimmer className="w-32 h-10 rounded-full flex items-center justify-center gap-2" />
            ) : (
              <button className="text-white text-center font-secondary text-xs bg-white/15 pl-6 pr-8 py-3 box-border rounded-full flex items-center gap-2">
                {/* Phone Icon Image */}
                <Image
                  src={settingsData?.contactIcon} // Replace with the actual path to your phone icon
                  alt="Phone Icon"
                  width={20} // Set the appropriate width for the icon
                  height={20} // Set the appropriate height for the icon
                  className="object-contain"
                />
                {/* Phone Number Text */}
                <span>{settingsData?.contactUs}</span>
              </button>
            )}
          </a>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center md:hidden space-y-6 z-10">
            {isSettingsLoading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <EnhancedShimmer key={index} className="w-24 h-6 rounded" />
                  ))
              : settingsData?.headerItems?.map((item, index) => (
                  <a
                    key={index}
                    onClick={toggleMenu}
                    href={`#${item.navTitle.toLowerCase()}`}
                    className="hover:text-gray-400 text-lg font-primary"
                  >
                    {item.navTitle}
                  </a>
                ))}
          </nav>
        )}
      </header>

      {/* Landing page */}
      <div>
        {isSettingsLoading ? (
          <EnhancedShimmer className="w-24 h-24 mx-auto mt-20 rounded-full" />
        ) : (
          <Image
            src={settingsData?.logo?.image}
            width={100}
            height={100}
            alt="heroImg"
            className="mx-auto mt-20"
          />
        )}

        <div className="darksoul-glowing-button1 relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button
            className="relative darksoul-button1 text-btn tracking-wide bg-black font-bold leading-5 rounded-full border border-white font-primary box-border max-sm:z-0 px-6 py-3"
            type="button"
          >
            {isSettingsLoading ? (
              <EnhancedShimmer className="w-42 h-6 rounded" />
            ) : (
              settingsData?.siteName
            )}
          </button>
        </div>

        {isWatyDataLoading ? (
          <EnhancedShimmer className="h-12 w-1/4 mx-auto rounded" />
        ) : (
          <h1 className="font-oregano text-landingColor text-center text-ab mb-10 max-sm:text-2xl">
            {headerData?.motto}
          </h1>
        )}

        {/* Header Content */}
        {isWatyDataLoading ? (
          <div className="space-y-6 mt-5">
            <EnhancedShimmer className="h-12 w-3/4 mx-auto rounded" />
            {/* Header Title */}
            <EnhancedShimmer className="h-16 w-2/3 mx-auto rounded" />
            {/* Header Description */}
          </div>
        ) : (
          <>
            {/* Header Title with Two Lines */}
            <h1 className="font-bold text-center w-full mt-5 font-primary text-header max-sm:text-[20px]">
              <span className="block w-3/4 mx-auto">
                {/* First Line with narrower width */}
                {headerData?.headerTitle.split(" ").slice(0, 3).join(" ")}
                {/* Example: Split for demo purposes */}
              </span>
              <span className="block w-full mx-auto">
                {/* Second Line with full width */}
                {headerData?.headerTitle.split(" ").slice(3).join(" ")}
                {/* Rest of the title */}
              </span>
            </h1>

            {/* Header Description */}
            <p
              className="text-paraColor text-center mt-8 text-lg max-sm:text-[15px] font-secondary 
    leading-relaxed max-w-[60%] mx-auto"
            >
              {headerData?.headerDescription &&
                (() => {
                  const words = headerData.headerDescription.split(" ");
                  const firstLineWords = Math.ceil(words.length * 0.4); // 40% of total words
                  return (
                    <>
                      {words.slice(0, firstLineWords).join(" ")}{" "}
                      {/* First line */}
                      <br />
                      {words.slice(firstLineWords).join(" ")}{" "}
                      {/* Second line */}
                    </>
                  );
                })()}
            </p>
          </>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-center gap-8 mt-10 mb-10 xl:mb-0 lg:mb-0">
          {isWatyDataLoading ? (
            <>
              <EnhancedShimmer className="w-32 h-10 rounded-3xl" />
              <EnhancedShimmer className="w-32 h-10 rounded-3xl" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4 mb-10 max-sm:mb-0 xl:mb-0 lg:mb-0">
                <button className="bg-white text-black rounded-3xl py-2 pb-2 pl-2 pr-4 max-sm:p-1 max-sm:pr-4 flex items-center justify-center gap-3 px-6 transition-all duration-300">
                  <Image
                    src={arrow}
                    width={32}
                    height={32}
                    alt={arrow}
                    className="mx-auto max-sm:w-8"
                  />
                  <a href="#courses">
                    <h6 className="font-secondary box-border text-[16px] max-sm:text-[12px]">
                      {headerData.firstLinkTitle}
                    </h6>
                  </a>
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/${settingsData.contactNumber}`,
                      "_blank"
                    )
                  }
                  className=" max-sm:p-3 max-sm:pr-7 max-sm:pl-4 bg-white/15 border-2 border-white/15 text-white rounded-3xl pl-8 pr-11 py-3 flex items-center justify-center text-center font-secondary box-border text-[16px] max-sm:text-[12px]"
                >
                  {headerData.secondLinkTitle}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* About section */}
      <section className="2xl:pt-10 xl:pt-10 lg:pt-0" id="about">
        <div className="flex flex-col-reverse lg:flex-row items-center p-8 rounded-3xl max-w-5xl mx-auto border-2 border-white/25 shadow-lg lg:w-[80%] md:w-[80%] max-sm:w-[80%] bg-bgColor text-white relative xl:top-10 lg:top-10 md:top-0 sm:top-0 xl:pl-10 lg:pl-10 md:pl-10 sm:pl-0">
          {isWatyDataLoading ? (
            // About Section Shimmer
            <div className="w-full flex flex-col-reverse lg:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <EnhancedShimmer className="h-8 w-3/4 rounded" />
                {/* About Title */}
                <EnhancedShimmer className="h-10 w-full rounded" />
                {/* About Description */}
                <EnhancedShimmer className="h-32 w-full rounded" />
                {/* About Content */}
                {/* Stats Shimmer */}
                <div className="flex flex-row gap-10 pt-7">
                  <div className="flex flex-col gap-2">
                    <EnhancedShimmer className="h-10 w-24 rounded" />
                    <EnhancedShimmer className="h-6 w-20 rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <EnhancedShimmer className="h-10 w-24 rounded" />
                    <EnhancedShimmer className="h-6 w-20 rounded" />
                  </div>
                </div>
              </div>

              {/* About Image Shimmer */}
              <div className="lg:w-[400px] lg:h-[309px]">
                <EnhancedShimmer className="w-full h-full rounded-lg" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 md:text-left sm:text-left">
                <h2 className="font-tertiary text-3xl font-bold pb-2 text-ab max-sm:text-[20px] text-innovaColor">
                  {aboutData?.aboutTitle}
                </h2>
                <h1 className="font-primary text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pb-2 text-ab max-sm:text-[25px]">
                  {aboutData?.aboutDescription}
                </h1>
                <p className="font-secondary text-xl xl:w-[90%] lg:w-[90%] md:w-[100%] sm:w-[100%] text-para max-sm:text-[15px] text-innovaColor">
                  {aboutData?.aboutContent}
                </p>

                <p className="font-secondary text-xl xl:w-[90%] lg:w-[90%] md:w-[100%] sm:w-[100%] text-para max-sm:text-[15px] text-innovaColor mt-4">
                  {aboutData?.aboutSubContent}
                </p>

                <div className="flex flex-row gap-10 pt-7">
                  <div className="flex flex-col">
                    <span className="font-primary text-4xl max-sm:text-[30px] font-bold text-innovaColor">
                      {aboutData?.firstLinkDescription}
                    </span>
                    <span className="font-secondary text-lg max-sm:text-[15px] text-innovaColor">
                      {aboutData?.firstLinkTitle}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-primary text-4xl max-sm:text-[30px] font-bold text-innovaColor">
                      {aboutData?.secondLinkDescription}
                    </span>
                    <span className="font-secondary text-lg max-sm:text-[15px] text-innovaColor">
                      {aboutData?.secondLinkTitle}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {aboutData?.image?.image && (
                  <Image
                    src={aboutData.image.image}
                    alt="AboutImg"
                    width={400}
                    height={309.06}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </section>
  );
};

export default Header;
