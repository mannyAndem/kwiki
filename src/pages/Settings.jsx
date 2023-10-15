import { useNavigate } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";
import { useAuthContext } from "../contexts/AuthContext";

const Settings = () => {
  const navigate = useNavigate();

  const { logOut } = useAuthContext();
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 text-darkBlue dark:text-veryLightGray">
      <h2 className="text-2xl">Settings</h2>
      <div className="flex flex-col justify-center my-32 mx-auto w-64">
        <div className="my-5 flex items-center justify-between">
          <span>Dark Mode</span>
          <ThemeToggler />
        </div>
        <button
          className="p-4 rounded-md dark:border-veryLightGray border border-blue"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Settings;
