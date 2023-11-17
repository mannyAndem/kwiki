import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import googleLogo from "../assets/google-logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuthContext();

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // state to handle form input errors
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  // form validation
  const validateForm = () => {
    setFormErrors(null);

    const isValidEmail = formValues.email.length > 0;
    const isValidPassword = formValues.password.length >= 8;

    if (!isValidEmail) {
      setFormErrors((prev) => {
        if (prev === null) {
          return { email: "Invalid email format" };
        } else {
          return { ...prev, email: "Invalid email format" };
        }
      });
    }

    if (!isValidPassword) {
      setFormErrors((prev) => {
        if (prev === null) {
          return { password: "Password must be atleast 8 characters long" };
        } else {
          return {
            ...prev,
            password: "Password must be atleast 8 characters long",
          };
        }
      });
    }

    return formErrors === null;
  };

  // states to handle login progress
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handling normal email and password login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      setError(null);
      await login(formValues.email, formValues.password);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to login please try again.");
      console.log(err);
    }
  };

  return (
    <div className="bg-veryLightBlue min-h-screen">
      <Toaster />
      <Navbar />
      <div className="p-8 text-blue  flex justify-center">
        <div className="w-full rounded-md shadow-lg p-8 bg-lightBlue bg-opacity-30 lg:w-[500px]">
          <h2 className="text-2xl">
            Login to <span className="font-semibold text-blue">Kwiki</span>
          </h2>
          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Please enter your email"
                className="p-3 rounded-md bg-transparent border-2 border-blue focus:border-darkBlue focus:outline-none"
                value={formValues.email}
                onChange={(e) => handleChange(e)}
              />
              {formErrors?.email && (
                <span className="text-red-500 text-sm">{formErrors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Pasword</label>
              <input
                type="password"
                name="password"
                placeholder="Please enter your password"
                className="p-3 rounded-md bg-transparent border-2 border-blue focus:border-darkBlue focus:outline-none"
                value={formValues.password}
                onChange={(e) => handleChange(e)}
              />
              {formErrors?.password && (
                <span className="text-red-500 text-sm">
                  {formErrors.password}
                </span>
              )}
            </div>
            {!loading && (
              <button
                type="submit"
                className="mt-4 bg-blue text-veryLightBlue rounded-md shadow-sm p-4"
              >
                Login
              </button>
            )}
            {loading && (
              <button
                type="submit"
                disabled
                className="flex items-center justify-center mt-4 bg-blue text-veryLightBlue rounded-md shadow-sm p-4"
              >
                <SpinnerCircular size={20} color="#DAFFFB" />
              </button>
            )}
          </form>

          <Link to="/signup" className="mt-4 block text-center underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
