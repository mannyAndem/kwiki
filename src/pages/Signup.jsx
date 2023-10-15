import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../contexts/AuthContext";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import googleLogo from "../assets/google-logo.png";

const Signup = () => {
  const { signUp, updateUserInfo, signInWithGoogle } = useAuthContext();

  const navigate = useNavigate();

  //   states to watch process of signing up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // function to submit form

  //   state to hold input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  // handle form input change
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // handle signin with google
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      setError(null);
      await signInWithGoogle();
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Couldn't create account, please try again.");
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      const userCred = await signUp(formData.email, formData.password);
      const docRef = await updateUserInfo(
        userCred.user.uid,
        formData.firstName,
        formData.lastName,
        formData.username
      );
      console.log(docRef);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Couldn't create account, please try again.");
      console.log(err);
    }
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="bg-veryLightBlue">
      <Toaster />
      <Navbar />
      <div className="p-32 text-blue flex justify-center">
        <div className="p-32 rounded-md shadow-md bg-opacity-30 bg-lightBlue">
          <h2 className="text-3xl mb-16">Create your Kwiki Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label>First Name</label>
                <input
                  name="firstName"
                  placeholder="Enter your first name"
                  className="p-3 rounded-md bg-transparent border-2 border-blue"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Last Name</label>
                <input
                  name="lastName"
                  placeholder="Enter your last name"
                  className="p-3 rounded-md bg-transparent border-2 border-blue"
                  value={formData.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Pick a username"
                  className="p-3 rounded-md bg-transparent border-2 border-blue"
                  value={formData.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  className="p-3 rounded-md bg-transparent border-2 border-blue"
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Create your password"
                  className="p-3 rounded-md bg-transparent border-2 border-blue"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="p-3 rounded-md bg-transparent border-2 border-blue"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            {!loading && (
              <button
                type="submit"
                className="w-full text-xl font-bold mt-16 bg-blue rounded-md text-veryLightBlue shadow-md p-4"
              >
                Sign up
              </button>
            )}
            {loading && (
              <button
                type="submit"
                disabled
                className="w-full flex items-center justify-center opacity-50 text-xl font-bold mt-16 bg-blue rounded-md text-veryLightBlue shadow-md p-4"
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
        </div>
      </div>
    </div>
  );
};

export default Signup;
