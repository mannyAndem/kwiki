import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import googleLogo from "../assets/google-logo.png";

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

  // states to handle login progress
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handling normal email and password login
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setError(null);
      await login(formValues.email, formValues.password);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Failed to login please try again.");
      console.log(err);
    }
  };

  // handling google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Couldn't login, please try again");
    }
  };

  if (error) {
    toast.error(error);
    setError(null);
  }

  return (
    <div className="bg-veryLightBlue">
      <Toaster />
      <Navbar />
      <div className="text-blue p-32 flex justify-center">
        <div className="rounded-md shadow-lg p-16 bg-lightBlue bg-opacity-30">
          <h2 className="text-3xl mr-16">
            Welcome back, login to{" "}
            <span className="font-semibold text-blue">Kwiki</span>
          </h2>
          <form className="mt-16 flex flex-col gap-5" onSubmit={handleSubmit}>
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
            </div>
            {!loading && (
              <button
                type="submit"
                className="mt-8 bg-blue text-veryLightBlue rounded-md shadow-sm p-4"
              >
                Login
              </button>
            )}
            {loading && (
              <button
                type="submit"
                disabled
                className="flex items-center justify-center mt-8 bg-blue text-veryLightBlue rounded-md shadow-sm p-4"
              >
                <SpinnerCircular size={20} color="#DAFFFB" />
              </button>
            )}
            <div className="flex items-center gap-4">
              <hr className="w-full border-none h-2 bg-lightBlue rounded-lg" />
              <span>OR</span>
              <hr className="w-full border-none h-2 bg-lightBlue rounded-lg" />
            </div>
            <button
              type="button"
              className="flex justify-center items-center gap-2 bg-transparent border-blue border-2 text-blue rounded-md shadow-sm p-4"
              onClick={handleGoogleLogin}
            >
              Continue with Google
              <img src={googleLogo} className="w-5 h-5" />
            </button>
          </form>

          <span className="mt-12 block text-center underline">
            Don't have an account? Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
