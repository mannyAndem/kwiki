import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="get-started-section py-24 px-5 lg:px-16">
      <div className="get-started p-10 bg-lightBlue flex flex-col items-center shadow-lg rounded-md lg:p-16">
        <p className="text-center text-veryLightBlue text-2xl mb-16 lg:text-4xl">
          Join Kwiki today! Hop on the train to revolutionize messaging,
          forever.
        </p>
        <Link
          to="/signup"
          className="p-6 rounded-md shadow-sm bg-blue text-veryLightBlue"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
