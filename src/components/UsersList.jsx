import { useFireStore } from "../hooks/useFireStore";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const UsersList = ({
  usersListVisibilty,
  toggleUsersList,
  addNewMember,
  group,
}) => {
  const [users, setUsers] = useState(null);
  const { getCollection } = useFireStore("users");

  useEffect(() => {
    const fetchUsers = async () => {
      let snapshot = await getCollection();
      console.log(snapshot.docs);
      let data = [];
      snapshot.docs.forEach((doc) => {
        for (let i = 0; i < group.members.length; i++) {
          if (doc.id === group.members[i].id) {
            return;
          }
        }
        data.push({ ...doc.data(), id: doc.id });
      });

      console.log("loop done!");
      setUsers(data);
    };

    fetchUsers();
  }, [group]);

  users && console.log(users);

  return (
    <div
      className={`${
        usersListVisibilty === "visible" ? "absolute" : "hidden"
      } w-full h-[600px] lg:w-[600px] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  bg-lightBlue bg-opacity-80 rounded-lg shadow-md z-[100] text-darkBlue p-8 dark:bg-gray dark:text-veryLightGray`}
    >
      <div className="relative">
        <button className="cursor-pointer" onClick={toggleUsersList}>
          <AiOutlineClose
            size={32}
            color="#fff"
            className="absolute top-0 right-0"
          />
        </button>

        <h3 className="text-2xl font-bold">Users</h3>
        <ul className="my-4">
          {users &&
            users.map((user) => {
              return (
                <li key={user.id} className="flex justify-between items-center">
                  <span>{user.username}</span>{" "}
                  <button
                    onClick={() => addNewMember({ ...user, role: "member" })}
                  >
                    <AiOutlineUserAdd size={24} />
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
