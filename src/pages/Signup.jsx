import { isValidElement, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../contexts/AuthContext";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import googleLogo from "../assets/google-logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signUp, updateUserInfo, signInWithGoogle } = useAuthContext();

  const navigate = useNavigate();

  //   states to watch process of signing up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   state to hold input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  // state to hold form errors
  const [formErrors, setFormErrors] = useState(null);

  // handle form input change
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // form validation function
  const validateForm = () => {
    setFormErrors(null);

    // booleans that hold the validity or otherwise of the input fields
    const isValidFirstName = formData.firstName.length > 0;
  };

  // function to submit form
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
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      toast.error("Couldn't create account, please try again.");
      console.log(err);
    }
  };

  return (
    <div className="bg-veryLightBlue">
      <Toaster />
      <Navbar />
      <div className="p-8 text-blue flex justify-center">
        <div className="p-8 rounded-md shadow-md bg-opacity-30 bg-lightBlue lg:p-16">
          <h2 className="text-3xl mb-16">Create your Kwiki Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
          </form>
          <Link to="/login" className="mt-4 block text-center underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
