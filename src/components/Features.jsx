import featuresImg from "../assets/Messaging-pana.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

const Features = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        // scrub: 1,
        trigger: ".features-section",
        start: "top 90%",
        end: "bottom 30%",
      },
    });
    tl.from(".features-img", {
      opacity: 0,
      x: -300,
      duration: 1.5,
    });
    tl.from(".feature", {
      opacity: 0,
      x: 500,
      duration: 1.5,
      stagger: 0.5,
    });
  }, []);

  return (
    <div className="features-section px-16 py-24 text-blue">
      <h2 className="text-center font-bold text-4xl">Why Kwiki?</h2>
      <div className="flex items-center gap-8 mt-10">
        <img src={featuresImg} className="features-img w-1/2" />
        <ul className="flex flex-col">
          <li className="feature text-xl font-bold py-8 border-b border-lightBlue">
            Connect with likeminded individuals
          </li>
          <li className="feature text-xl font-bold py-8 border-b border-lightBlue">
            Joins groups and conversations that interest you
          </li>
          <li className="feature text-xl font-bold py-8 border-b border-lightBlue">
            Secure, safe and reliable
          </li>
          <li className="feature text-xl font-bold py-8 border-b border-lightBlue">
            All your messages in one place!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
