import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  // State for expanded and not expanded state on mobile nav
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    // If expanded is true set to false, if false set to true.
    setExpanded((prev) => (prev ? false : true));
  };

  return (
    <nav className="px-5 lg:px-16 py-8 flex items-center justify-between">
      <a href="#" className="brand font-bold text-blue text-2xl">
        Kwiki
      </a>
      <button className="lg:hidden z-50" onClick={toggleMenu}>
        {expanded ? (
          <AiOutlineClose size={32} color="#DAFFFB" />
        ) : (
          <HiMenu size={32} color="#176B87" />
        )}
      </button>
      <div
        className={`${
          expanded ? "scale-x-100" : "scale-x-0"
        } transform transition-all duration-300 ease-in-out origin-right pt-24 px-4 bg-blue lg:bg-transparent z-40 absolute top-0 right-0 h-full flex-col w-[50vw] lg:static lg:pt-0 lg:flex-row lg:h-auto lg:px-0 lg:scale-x-100 lg:w-auto lg:flex items-center gap-8`}
      >
        <ul className="flex flex-col lg:flex-row items-center gap-6">
          <li className="p-2 text-veryLightBlue lg:text-blue">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 text-veryLightBlue lg:text-blue">
            <Link>About</Link>
          </li>
          <li className="p-2 text-veryLightBlue lg:text-blue">
            <Link>Team</Link>
          </li>
          <li className="p-2 text-veryLightBlue lg:text-blue">
            <Link>Contact Us</Link>
          </li>
        </ul>
        <div className="flex flex-col mt-12 lg:mt-0 lg:flex-row gap-4">
          <Link
            to="/login"
            className="flex justify-center items-center p-4 shadow-sm bg-transparent border-2 lg:border-blue lg:text-blue border-veryLightBlue text-veryLightBlue font-semibold rounded-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="flex justify-center items-center p-4 shadow-sm lg:bg-blue border-2 lg:border-blue lg:text-veryLightBlue border-veryLightBlue bg-veryLightBlue text-bluefont-semibold rounded-md"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
