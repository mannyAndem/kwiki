import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useFireStore } from "../hooks/useFireStore";
import { useEffect, useState } from "react";
import Group from "../components/Group";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import { SpinnerCircular } from "spinners-react";
import toast, { Toaster } from "react-hot-toast";
import { useThemeContext } from "../contexts/ThemeContext";

const Groups = () => {
  // consuming theme context
  const { isLightTheme } = useThemeContext();

  const [groups, setGroups] = useState(null);

  const { currentUser } = useAuthContext();
  const { getCollection } = useFireStore("groups");

  // state to keep track of groups loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const snapshot = await getCollection();
        let data = [];
        snapshot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        data = data.filter((doc) => {
          return doc.members.find((member) => member.id === currentUser.uid);
        });
        setGroups(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("An error occurred :(");
        console.error(err);
      }
    };

    fetchGroups();
  }, []);

  groups && console.log(groups);
  return (
    <div className="p-5 text-blue lg:p-16">
      <Toaster />
      <h2 className="text-3xl font-bold">Your groups</h2>
      <div className="mt-16 flex flex-col gap-4">
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SpinnerCircular size={140} color="#176B87" />
          </div>
        )}
        {groups &&
          groups.map((group) => <Group key={group.id} group={group} />)}
        {!loading && !groups && (
          <p className="text-2xl font-semibold">
            You haven't joined any groups yet. Go to the discover page and
            discover new groups.
          </p>
        )}
      </div>
      <Link
        to="create"
        className="cursor-pointer bottom-32 right-5  fixed lg:bottom-16 lg:right-16"
      >
        <AiFillPlusCircle
          size={56}
          color={isLightTheme ? "#176B87" : "#5C8374"}
        />
      </Link>
    </div>
  );
};

export default Groups;
