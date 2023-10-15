import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import GetStarted from "../components/GetStarted";

const Home = () => {
  return (
    <div className="bg-veryLightBlue">
      <Navbar />
      <Hero />
      <Features />
      <GetStarted />
    </div>
  );
};

export default Home;
