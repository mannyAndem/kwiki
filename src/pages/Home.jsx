import { useEffect } from "react";
import heroIllustration from "../assets/Messaging-rafiki.svg";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const Home = () => {
  useEffect(() => {
    gsap.from(".illustration", {
      x: 500,
      ease: "bounce",
      duration: 2,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex px-16 py-24 bg-veryLightBlue text-blue items-center">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-16">
            Kwiki is the messaging app for everyone! experience the power of
            connection and community
          </h1>

          <div className="mx-auto flex gap-4">
            <button className="w-1/2 p-4 shadow-sm bg-transparent border-2 border-blue text-blue">
              Sign up
            </button>
            <button className="w-1/2 p-4 shadow-sm bg-blue border-2 border-blue text-lightCream">
              Log in
            </button>
          </div>
        </div>
        <div className="illustration w-1/2">
          <img src={heroIllustration} />
        </div>
      </div>
    </>
  );
};

export default Home;
