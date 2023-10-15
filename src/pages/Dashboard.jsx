import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Messages from "./Messages";
import Settings from "./Settings";
import Profile from "./Profile";
import Groups from "./Groups";
import { ThemeContext } from "../contexts/ThemeContext";
import ChatScreen from "./ChatScreen";

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isLightTheme } = useContext(ThemeContext);

  return (
    <div className={!isLightTheme && "dark"}>
      <div className="dark:bg-black bg-veryLightBlue min-h-screen grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Routes>
            <Route path="messages" element={<Messages />} />
            <Route path="groups" element={<Groups />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat" element={<ChatScreen />} />
          </Routes>
        </div>

        {/* <button
        className="border border-blue text-blue p-4"
        onClick={handleSignOut}
      >
        Sign Out
      </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
