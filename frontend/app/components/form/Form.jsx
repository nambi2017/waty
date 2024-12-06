import Image from "next/image";
import form from "../../../public/formbackground.svg";
import formImg from "../../assets/formasimg.svg";
import arrowicon from "../../assets/formarrow2.svg";
import cancelBtn from "../../assets/xbtn.svg";

const Form = () => {
  return (
    
      <section
        style={{ backgroundImage: `url(${form.src})` }}
        className="bg-cover text-white rounded-xl shadow-lg w-[692px] h-[423.22px] mx-auto max-sm:w-[80%] max-sm:h-[550px]"
      >
        <form className="bg-white/5 flex justify-center items-center gap-10 max-sm:block max-w-xl h-[324.41px] max-sm:h-[450px] mx-auto relative top-12 rounded-xl max-sm:w-[80%]">
          <div className="text-white pl-4 mt-2">
            <h1 className="font-tertiary font-semibold text-3xl max-sm:text-xl max-sm:text-center max-sm:pt-5">
              Join Us Today!
            </h1>
            <p className="text-xs font-secondary pt-4 pb-4 font-medium text-white/80 max-sm:text-center">
              Take the First Step Towards Your Future Join Our Community of
              Lifelong Learners!
            </p>
            <Image
              src={formImg}
              alt="formImg"
              className="object-cover max-w-fit max-sm:mx-auto max-sm:w-[70%]"
            />
          </div>

          <div className="mt-20 max-sm:mt-0 max-sm:relative bottom-10">
            <button type="button" className="relative bottom-16 left-16 max-sm:pt-8 max-sm:left-52 max-sm:bottom-60">
              <Image src={cancelBtn} alt="cancelbtn" className="box-border" />
            </button>

            <input
              type="text"
              placeholder="Enter your name"
              className="font-secondary text-card bg-white/5 py-2 pr-24 pl-2 rounded-sm mb-5 border-2 border-white/5 relative right-2 max-sm:mx-auto max-sm:mt-14 mr-5"
            />
            
            <input
              type="text"
              placeholder="Email"
              className="font-secondary text-card bg-white/5 py-2 pr-24 pl-2 rounded-sm mb-5 border-2 border-white/5  max-sm:mx-auto mr-8"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="font-secondary text-card bg-white/5 py-2 pr-24 pl-2 rounded-sm mb-5 border-2 border-white/5  max-sm:mx-auto mr-8"
            />
            
            <button className="flex items-center justify-center space-x-36 px-2 py-1 rounded-full bg-white text-black max-sm:mx-auto">
              <span className="flex items-center justify-center">
                <Image src={arrowicon} alt="arrow" width={19} height={19} />
              </span>
              <span className="font-secondary text-card relative right-20 box-border">
                Enroll now
              </span>
            </button>
          </div>
        </form>
      </section>
  );
};

export default Form;
