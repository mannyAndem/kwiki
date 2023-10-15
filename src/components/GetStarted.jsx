import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

const GetStarted = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.from(".get-started", {
      duration: 1.5,
      y: 500,
      opacity: 0,
      scrollTrigger: {
        // scrub: 1,
        trigger: ".get-started-section",
        start: "top 90%",
        end: "bottom 30%",
      },
    });
  }, []);

  return (
    <div className="get-started-section py-24 px-16">
      <div className="get-started p-16 bg-lightBlue flex flex-col items-center shadow-lg rounded-md">
        <p className="text-center text-veryLightBlue text-4xl mb-16">
          Join Kwiki today. Hop on the train to revolutionize online
          communication forever
        </p>
        <button className="p-6 rounded-md shadow-sm bg-blue text-veryLightBlue">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
