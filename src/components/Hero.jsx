import heroIllustration from "../assets/Messaging-rafiki.svg";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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
    <div className="flex p-16 text-blue items-center">
      <div className="copy w-1/2">
        <h1 className="text-4xl font-bold mb-16">
          Kwiki is the messaging app for everyone! experience the power of
          connection and community
        </h1>

        <div className="mx-auto flex gap-4">
          <button className="rounded-sm w-1/2 p-4 shadow-sm bg-transparent border-2 border-blue text-blue">
            Sign up
          </button>
          <button className="rounded-sm w-1/2 p-4 shadow-sm bg-blue border-2 border-blue text-veryLightBlue">
            Log in
          </button>
        </div>
      </div>
      <div className="illustration w-1/2">
        <img src={heroIllustration} />
      </div>
    </div>
  );
};

export default Hero;
