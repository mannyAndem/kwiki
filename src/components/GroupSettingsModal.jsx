import { getDoc } from "firebase/firestore";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFireStore } from "../hooks/useFireStore";
import UsersList from "./UsersList";
import { TiTickOutline } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { FaEllipsisV } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const GroupSettingsModal = ({
  settingsModal,
  group,
  user,
  handleSettingsModalChange,
}) => {
  // state to hold usersListVisibilty
  const [usersListVisibilty, setUsersListVisibility] = useState("hidden");

  const { setDocWithId } = useFireStore("groups");

  // function to toggle users list visible or hidden

  const toggleUsersList = () => {
    if (usersListVisibilty === "hidden") {
      setUsersListVisibility("visible");
    } else {
      setUsersListVisibility("hidden");
    }
  };

  // navigate function
  const navigate = useNavigate();

  // function to add new member to group
  const addNewMember = async (newMember) => {
    let requestingUser = group.members.find((member) => member.id == user.id);

    try {
      if (requestingUser.role !== "admin") {
        throw new Error("not admin");
      }
      const newState = { ...group };
      newState.members.push(newMember);
      newState.requests = newState.requests.filter(
        (request) => request.id != newMember.id
      );
      await setDocWithId(group.id, newState);
    } catch (err) {
      if (err.message === "not admin") {
        toast.error("Only admins can add new members");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const deleteRequest = async (request) => {
    let requestingUser = group.members.find((member) => member.id == user.id);
    try {
      if (requestingUser.role !== "admin") {
        throw new Error("not admin");
      }
      const newState = { ...group };
      newState.requests = newState.requests.filter(
        (item) => item.id != request.id
      );
      await setDocWithId(group.id, newState);
    } catch (err) {
      if (err.message === "not admin") {
        toast.error("Only admins can add new members");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  // function to exit group
  const leaveGroupBtnRef = useRef(null);
  const leaveGroup = async () => {
    try {
      const newState = { ...group };
      newState.members = newState.members.filter(
        (member) => member.id != user.id
      );
      await setDocWithId(group.id, newState);
      navigate("/dashboard/groups");
    } catch (err) {
      toast.error("An error occured.");
    }
  };

  // state for actions on members
  const [memberActions, setMemberActions] = useState({
    visible: false,
    user: null,
  });

  const removeMember = (user) => {
    let newGroupState = { ...group };
    newGroupState.members = newGroupState.members.filter(
      (member) => member.id != user.id
    );
    setDocWithId(group.id, newGroupState);
  };

  // function to make admin
  const makeAdmin = (user) => {
    try {
      const newGroupState = { ...group };
      const index = newGroupState.members.indexOf(
        newGroupState.members.find((member) => member.id === user.id)
      );
      newGroupState.members[index].role = "admin";

      setDocWithId(group.id, newGroupState);
      setMemberActions({ visible: false, user: null });
    } catch (err) {
      toast.error("An error occurred.");
      console.error(err);
    }
  };

  // function to remove as admin
  const removeAdmin = (user) => {
    try {
      const newGroupState = { ...group };
      const index = newGroupState.members.indexOf(
        newGroupState.members.find((member) => member.id === user.id)
      );
      newGroupState.members[index].role = "member";
      setDocWithId(group.id, newGroupState);
      setMemberActions({ visible: false, user: null });
    } catch (err) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div
      className={`${
        settingsModal === "visible" ? "fixed" : "hidden"
      } max-h-[600px] w-full lg:w-[600px] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-lightBlue bg-opacity-80 rounded-lg shadow-md z-[100] text-darkBlue p-8 dark:bg-gray dark:text-veryLightGray`}
    >
      <Toaster />
      <UsersList
        usersListVisibilty={usersListVisibilty}
        toggleUsersList={toggleUsersList}
        addNewMember={addNewMember}
        group={group}
      />
      <div className="relative h-full">
        <button
          className="absolute top-0 right-0"
          onClick={handleSettingsModalChange}
        >
          <AiOutlineClose size={32} color="#fff" />
        </button>
        <div
          className={`
            ${memberActions.visible ? "flex" : "hidden"}
                 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-veryLightBlue rounded-md shadow-md p-8 flex-col gap-4 dark:bg-veryLightGray `}
        >
          <button
            onClick={() => setMemberActions({ visible: false, user: null })}
            className="flex justify-end"
          >
            <AiOutlineClose size={14} color="#04364A" />
          </button>

          <button
            className="bg-blue p-4 rounded-sm text-veryLightBlue dark:bg-gray dark:text-veryLightGray"
            onClick={() => removeMember(memberActions.user)}
          >
            Remove
          </button>
          {memberActions.user?.role === "admin" ? (
            <button
              className="bg-blue p-4 rounded-sm text-veryLightBlue dark:bg-gray dark:text-veryLightGray"
              onClick={() => removeAdmin(memberActions.user)}
            >
              Remove as admin
            </button>
          ) : (
            <button
              className="bg-blue p-4 rounded-sm text-veryLightBlue dark:bg-gray dark:text-veryLightGray"
              onClick={() => makeAdmin(memberActions.user)}
            >
              Make admin
            </button>
          )}
        </div>
        <h3 className="text-2xl font-bold whitespace-nowrap">Group Settings</h3>
        <div className="my-4">
          <h4 className="text-xl whitespace-nowrap">Member Requests</h4>
          <ul className="pl-4 flex flex-col gap-1">
            {group.requests.length > 0 ? (
              group.requests.map((request) => (
                <li key={request.id} className="flex items-center gap-3">
                  <span>
                    <span className="font-bold">{request.username}</span>{" "}
                    requested to join
                  </span>
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={() => addNewMember(request)}
                      className="p-2 rounded-md shadow-sm bg-blue border border-blue"
                    >
                      <TiTickOutline size={14} />
                    </button>
                    <button
                      onClick={() => deleteRequest(request)}
                      className="p-2 rounded-md shadow-sm bg-transparent border border-blue"
                    >
                      <IoCloseCircle size={14} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <span>No new requests</span>
            )}
          </ul>
        </div>
        <div className="h-1/2 my-4 ">
          <h4 className="text-xl">Members</h4>
          <ul className="pl-4 flex flex-col gap-2">
            {group?.members?.map((member) =>
              member.id != user.id ? (
                <li
                  className="flex items-center justify-between"
                  key={member.id}
                >
                  <span className="text-lg">
                    {member.username} {member.role === "admin" && "(Admin)"}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMemberActions({
                          user: member,
                          visible: true,
                        })
                      }
                    >
                      <FaEllipsisV size={18} />
                    </button>
                  </div>
                </li>
              ) : (
                <li
                  className="flex items-center justify-between"
                  key={member.id}
                >
                  <span className="text-lg">
                    You {member.role === "admin" && "(Admin)"}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="my-8 flex flex-col gap-4">
          {group.members.find((member) => member.id == user.id)?.role ===
            "admin" && (
            <button
              className="p-4 rounded-md bg-darkBlue text-veryLightBlue dark:bg-veryLightGray dark:text-gray"
              onClick={toggleUsersList}
            >
              Add member
            </button>
          )}
          <button
            className="p-4 rounded-md bg-red-500 text-veryLightBlue"
            onClick={leaveGroup}
            ref={leaveGroupBtnRef}
          >
            Leave group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupSettingsModal;
