import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useFireStore } from "../hooks/useFireStore";

const Profile = () => {
  // const { currentUser } = useAuthContext();
  // const { get, data, loading, error } = useFireStore("users");

  // useEffect(() => {
  //   get(currentUser.uid);
  // }, []);

  return (
    <div className="p-5 lg:p-16">
      <div className="text-blue dark:text-veryLightGray">
        <div className="p-4 flex flex-col gap-2">
          <span className="font-bold">Name:</span>
          <span>Emmanuel Andem</span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <span className="font-bold">Username:</span>
          <span>manny</span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <span className="font-bold">Bio:</span>
          <span>I build cool stuff on the good ol' internet</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
