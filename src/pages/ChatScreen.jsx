import { useState } from "react";
import CurrentUserText from "../components/CurrentUserText";
import InputArea from "../components/InputArea";
import Text from "../components/Text";
import { useEffect } from "react";
import { useParams, useRoutes } from "react-router-dom";
import { useFireStore } from "../hooks/useFireStore";
import { AiOutlineSetting } from "react-icons/ai";
import GroupSettingsModal from "../components/GroupSettingsModal";
import { useAuthContext } from "../contexts/AuthContext";
import MessagesContainer from "../components/MessagesContainer";
import toast from "react-hot-toast";

const ChatScreen = () => {
  const { id } = useParams();
  const { currentUser } = useAuthContext();

  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(null);
  const { snapshotListener } = useFireStore("groups");

  useEffect(() => {
    const getGroupData = async () => {
      snapshotListener(id, (doc) => {
        setGroup({ ...doc.data(), id: doc.id });
      });
    };

    getGroupData();
  }, []);

  // useEffect to get current user info
  const { get: getUser } = useFireStore("users");

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUser(currentUser.uid);
      setUser(data);
    };

    fetchUserData();
  }, []);

  // State for settings modal. The modal can only be in one of two states represented by the strings "visible" or "hidden".
  const [settingsModal, setSettingsModal] = useState("hidden");

  // Function to toggle modal visibility.
  const handleSettingsModalChange = () => {
    setSettingsModal((prev) => (prev === "hidden" ? "visible" : "hidden"));
  };

  return (
    group &&
    user && (
      <>
        {/* Settings modal */}
        <GroupSettingsModal
          settingsModal={settingsModal}
          handleSettingsModalChange={handleSettingsModalChange}
          group={group}
          user={user}
        />
        <div className="min-h-screen relative px-4  pb-52">
          <div className="sticky top-0 rounded-md bg-blue text-veryLightBlue w-full p-6 shadow-md flex items-center justify-between dark:bg-gray dark:text-veryLightGray">
            <div className="flex gap-8 items-center">
              <img
                src={group.coverImageRef}
                className="w-24 h-24 rounded-full"
              />
              <span className="text-2xl font-bold">{group.groupName}</span>
            </div>
            <button onClick={handleSettingsModalChange}>
              <AiOutlineSetting size={42} color="#DAFFFB" />
            </button>
          </div>
          <div className="p-5 lg:p-16">
            <MessagesContainer id={group.id} user={user} />
            <InputArea user={user} groupId={group.id} />
          </div>
        </div>
      </>
    )
  );
};

export default ChatScreen;
