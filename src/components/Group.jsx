import { Link } from "react-router-dom";

const Group = ({ group }) => {
  return (
    <Link
      className="cursor-pointer relative dark:bg-lightGray dark:text-gray text-darkBlue flex items-center gap-5 rounded-lg p-4 shadow-md bg-lightBlue bg-opacity-50"
      to={`/dashboard/groups/${group.id}`}
    >
      <div className="w-16 h-16 full overflow-hidden rounded-[50%]">
        <img src={group.coverImageRef} className="object-cover" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{group.groupName}</h3>
        <p>{group.groupDescription}</p>
      </div>
    </Link>
  );
};

export default Group;
