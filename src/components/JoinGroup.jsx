import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useFireStore } from "../hooks/useFireStore";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const JoinGroup = ({ group }) => {
  const { currentUser } = useAuthContext();

  const { setDocWithId } = useFireStore("groups");
  const { get } = useFireStore("users");

  // state tp hold whether request has been sent or not
  const [hasSentRequest, setHasSentRequest] = useState(false);

  useEffect(() => {
    const hasSentRequest = group.requests.find(
      (request) => request.id === currentUser.uid
    );
    if (hasSentRequest) {
      setHasSentRequest(true);
    }
  }, []);
  const requestToJoin = async () => {
    try {
      if (hasSentRequest) {
        throw new Error("already sent request");
      }
      const user = await get(currentUser.uid);
      const newGroupState = { ...group };
      newGroupState.requests.push(user);
      await setDocWithId(group.id, newGroupState);
      toast.success(`Your request to join ${group.groupName} has been sent.`);
    } catch (err) {
      console.error(err);
      if (err.message === "already sent request") {
        toast.error("You have already sent a request to join this group.");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleClick = async () => {
    await requestToJoin();
  };

  return (
    <div className=" dark:bg-lightGray dark:text-gray text-darkBlue flex items-center gap-5 rounded-lg p-4 shadow-md bg-lightBlue bg-opacity-50 justify-between">
      <Toaster />
      <div className="w-16 h-16 full overflow-hidden rounded-[50%]">
        <img src={group.coverImageRef} className="object-cover" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{group.groupName}</h3>
        <p>{group.groupDescription}</p>
      </div>
      {hasSentRequest ? (
        <button
          className="p-3 opacity-50 rounded-md bg-darkBlue text-veryLightBlue flex items-center justify-center"
          onClick={handleClick}
          disabled
        >
          Join
        </button>
      ) : (
        <button
          className="p-3 rounded-md bg-darkBlue text-veryLightBlue flex items-center justify-center"
          onClick={handleClick}
        >
          Join
        </button>
      )}
    </div>
  );
};

export default JoinGroup;
