import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useFireStore } from "../hooks/useFireStore";
import { useEffect, useState } from "react";
import Group from "../components/Group";
import JoinGroup from "../components/JoinGroup";

const Discover = () => {
  const { getCollection } = useFireStore("groups");
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const snapshot = await getCollection();
      const data = [];
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      setGroups(data);
    };

    fetchGroups();
  }, []);

  return (
    <div className="p-5 text-blue lg:p-16">
      <h2 className="text-3xl font-bold">Discover new groups</h2>

      <input
        type="search"
        className="my-8 pl-12 bg-search w-full p-3 bg-transparent rounded-xl border-2 border-blue"
        placeholder="Search for groups that match your interests"
      />

      <div className="flex flex-col gap-4">
        {groups && groups.map((group) => <JoinGroup group={group} />)}
      </div>
    </div>
  );
};

export default Discover;
