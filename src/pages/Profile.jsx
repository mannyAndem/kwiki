import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useFireStore } from "../hooks/useFireStore";

const Profile = () => {
  const { currentUser } = useAuthContext();
  const { get, data, loading, error } = useFireStore("users");

  useEffect(() => {
    get(currentUser.uid);
  }, []);

  return (
    !loading && (
      <div>
        <h1 className="text-center text-blue text-3xl">
          Welcome {data.firstName}
        </h1>
      </div>
    )
  );
};

export default Profile;
