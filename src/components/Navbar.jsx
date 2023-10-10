import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-16 py-8 flex items-center justify-between bg-veryLightBlue">
      <a href="#" className="brand font-bold text-blue text-2xl">
        Kwiki
      </a>
      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-6">
          <li className="p-2 text-xl font-semibold text-blue">
            <Link>Home</Link>
          </li>
          <li className="p-2 text-xl font-semibold text-blue">
            <Link>About</Link>
          </li>
          <li className="p-2 text-xl font-semibold text-blue">
            <Link>Team</Link>
          </li>
          <li className="p-2 text-xl font-semibold text-blue">
            <Link>Contact Us</Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <button className=" p-4 shadow-sm bg-transparent border-2 border-blue text-blue">
            Login
          </button>
          <button className=" p-4 shadow-sm bg-blue border-2 border-blue text-lightCream">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
