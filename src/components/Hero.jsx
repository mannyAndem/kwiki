import heroIllustration from "../assets/Messaging-rafiki.svg";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".copy", {
      x: -500,
      opacity: 0,
      duration: 1.5,
    });
    tl.from(".illustration", {
      y: 500,
      opacity: 0,
      duration: 1.5,
    });
  }, []);

  return (
    <div className="flex flex-col py-16 px-5 text-blue items-center lg:flex-row lg:px-16">
      <div className="copy w-full lg:w-1/2">
        <h1 className="text-4xl text-center font-bold mb-16 lg:text-left">
          Kwiki is the messaging app for everyone! experience the power of
          connection and community
        </h1>

        <div className="mx-auto flex gap-4">
          <Link
            to="signup"
            className="flex items-center justify-center rounded-sm w-1/2 p-4 shadow-sm bg-transparent border-2 border-blue text-blue"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-sm w-1/2 p-4 shadow-sm bg-blue border-2 border-blue text-veryLightBlue"
          >
            Log in
          </Link>
        </div>
      </div>
      <div className="illustration w-full lg:w-1/2">
        <img src={heroIllustration} />
      </div>
    </div>
  );
};

export default Hero;
