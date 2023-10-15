import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-16 py-8 flex items-center justify-between">
      <a href="#" className="brand font-bold text-blue text-2xl">
        Kwiki
      </a>
      <div className="flex items-center gap-8">
        <ul className="flex items-center gap-6">
          <li className="p-2 text-blue">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 text-blue">
            <Link>About</Link>
          </li>
          <li className="p-2 text-blue">
            <Link>Team</Link>
          </li>
          <li className="p-2 text-blue">
            <Link>Contact Us</Link>
          </li>
        </ul>
        <div className="flex gap-4 items-stretch">
          <Link
            to="/login"
            className=" p-4 shadow-sm bg-transparent border-2 border-blue text-blue"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className=" p-4 shadow-sm bg-blue border-2 border-blue text-veryLightBlue"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
