"use client";
import { FetchWatyLearningHomepageData } from "@/app/hooks/pageData";
import Image from "next/image";
import form from "../../../public/formbackground.svg";
import arrowicon from "../../assets/formarrow2.svg";
import cancelBtn from "../../assets/xbtn.svg";
import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const CourseData = ({ course, onClose }) => {
  const { watyLearningData } = FetchWatyLearningHomepageData();
  const courseFormData = watyLearningData?.form;

  const [loading, setLoading] = useState(false); // State to track loading

  // Handle form submission
  const handleEnrollClick = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loader

    // Collect form data
    const formData = new FormData(event.target);
    const senderName = formData.get("name");
    const senderEmail = courseFormData?.contactEmail;
    const phoneNumber = formData.get("phone");
    const receiverEmail = formData.get("email"); // Replace with recipient's email
    const message = `
  Name: ${senderName}

  Phone Number: ${phoneNumber}

  Course Title: ${course.courseTitle}

  ${course.courseDescription ? `Description: ${course.courseDescription}` : ""}
`;

    const emailContent = courseFormData?.emailContent;
    const emailContentForUs = courseFormData?.emailContentForUs;

    try {
      // Send email via API
      const response = await axios.post("/api/sendEmail", {
        senderEmail,
        receiverEmail,
        message,
        emailContent,
        emailContentForUs,
      });

      if (response.status === 200) {
        alert("Enrollment email sent successfully!");
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        `Error: ${error.response?.data?.error || "An unexpected error occurred"}`
      );
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${form.src})` }}
      className="bg-cover text-white rounded-xl shadow-lg w-[600px] h-[500px] mx-auto max-sm:w-[350px] max-sm:h-[480px]"
    >
      {/* Header Section */}
      <div className="text-white text-center pt-10">
        <h1 className="font-tertiary font-semibold text-2xl max-sm:text-[16px]">
          {course.courseTitle}
        </h1>
        {/* Cancel Button */}
        <button type="button" onClick={onClose}>
          <Image
            src={cancelBtn} // Ensure cancelBtn path is correct
            width={30}
            height={30}
            alt="cancelbtn"
            className="box-border relative left-64 bottom-7 max-sm:w-[18px] max-sm:relative max-sm:left-36 max-sm:bottom-6"
          />
        </button>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleEnrollClick}
        className="bg-white/5 border border-white/10 max-sm:block max-w-[400px] h-[350px] mx-auto rounded-xl max-sm:w-[85%] max-sm:h-[340px]"
      >
        <div className="max-sm:mt-0 flex flex-col items-center gap-4">
          {/* Form Inputs */}
          <input
            type="text"
            name="name"
            required
            placeholder={courseFormData?.nameTitle || "Name"}
            className="w-[350px] font-secondary text-sm max-sm:text-[12px] bg-white/5 py-2 pl-2 rounded-md mb-5 border border-white/5 max-sm:mx-auto mt-10 max-sm:w-[250px]"
          />

          <input
            type="email"
            name="email"
            required
            placeholder={courseFormData?.emailTitle || "Email"}
            className="w-[350px] font-secondary text-sm max-sm:text-[12px] bg-white/5 py-2 pl-2 rounded-md mb-5 border border-white/5 max-sm:mx-auto max-sm:w-[250px]"
          />

          <input
            type="tel"
            name="phone"
            required
            placeholder={courseFormData?.phoneTitle || "Phone Number"}
            className="w-[350px] font-secondary text-sm max-sm:text-[12px] bg-white/5 py-2 pl-2 rounded-md mb-5 border border-white/5 max-sm:mx-auto max-sm:w-[250px]"
            style={{
              appearance: "none", // Remove spinner
              WebkitAppearance: "none", // Remove spinner in webkit browsers (Chrome/Safari)
              MozAppearance: "none", // Firefox
              paddingRight: "20px", // Add padding to the right to prevent overlay issues
            }}
            // Ensure that only numbers can be entered
            onInput={(e) => {
              // Replace non-numeric characters with empty string
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`flex w-[350px] items-center justify-between px-2 py-2 rounded-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-white"
            } text-black max-sm:mx-auto max-sm:w-[250px]`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-lg" /> // Circular loader
            ) : (
              <>
                <span className="flex items-center justify-center max-sm:w-6 max-sm:h-6">
                  <Image src={arrowicon} alt="arrow" width={30} height={30} />
                </span>
                <span className="font-secondary text-sm max-sm:text-[12px] whitespace-nowrap box-border pr-32 max-sm:pr-20">
                  {course.enrollNowAction}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CourseData;
