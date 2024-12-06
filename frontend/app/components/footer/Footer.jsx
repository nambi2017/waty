"use client";
import { FetchSettingsData } from "@/app/hooks/settingsData";
import Image from "next/image";
import footerImg from "../../../public/footerlogo.svg";
import EnhancedShimmer from "../../components/shimmer/enhancedShimmer";

const Footer = () => {
  const { settingsData } = FetchSettingsData();
  const isLoading = !settingsData;

  return (
    <section id="footer" className="bg-mainColor">
      <div className="text-center">
        {/* Footer Heading */}
        {isLoading ? (
          <div className="pt-10 flex justify-center">
            <EnhancedShimmer className="w-3/4 md:w-1/2 h-12" />
          </div>
        ) : (
          <h1 className="text-contactColor pt-10 font-primary text-4xl font-bold max-sm:text-[20px]">
            {settingsData?.footerDescription}
          </h1>
        )}

        {/* Address */}
        {isLoading ? (
          <div className="pt-7 flex justify-center">
            <EnhancedShimmer className="w-2/3 md:w-1/3 h-4" />
          </div>
        ) : (
          <p className="text-white font-secondary text-xs text-opacity-80 pt-7">
            {settingsData?.address}
          </p>
        )}

        {/* Contact Button */}
        <button className="text-white font-secondary text-xs bg-black px-2 py-2 box-border pt-5">
          👋 Contact
        </button>

        {/* Footer Content */}
        <div className="flex justify-around items-center mt-5">
          {/* Footer Logo */}
          {isLoading ? (
            <EnhancedShimmer className="w-20 h-20 rounded" />
          ) : (
            <Image
              src={settingsData?.logo?.image || footerImg}
              alt="Footer logo"
              width={81}
              height={80}
              className="max-sm:w-[40px]"
            />
          )}

          {/* Rights Reserved Text */}
          {isLoading ? (
            <EnhancedShimmer className="w-48 h-4" />
          ) : (
            <p className="text-contactColor font-secondary text-xs max-sm:text-[8px] ml-10 max-sm:ml-0">
              {settingsData?.rightReservedText}
            </p>
          )}

          {/* Social Icons */}
          {isLoading ? (
            <EnhancedShimmer className="w-24 h-8" />
          ) : (
            <div className="flex items-center gap-5 max-sm:gap-2">
              {settingsData.externalLinks.map((icon, index) => (
                <Image
                  key={index}
                  width={34}
                  height={34}
                  src={icon.externalLinkImage}
                  alt=""
                  className="max-sm:w-[20px] max-sm:h-auto"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Footer;
