import { Link } from "react-router-dom";

const SidebarIcon = ({ icon, name }) => {
  console.log(name);
  return (
    <Link
      to={`/dashboard/${name}`}
      className="flex justify-between items-center dark:text-veryLightGray text-veryLightBlue"
    >
      <span className="capitalize text-xl ">{name}</span>
      {icon}
    </Link>
  );
};

export default SidebarIcon;
