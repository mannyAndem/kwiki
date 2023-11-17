import SidebarIcon from "./SidebarIcon";
import { BiMessageDetail } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";
import { GrSearchAdvanced } from "react-icons/gr";
import { AiOutlineFileSearch } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="z-50 justify-center fixed bottom-0 w-screen p-8 dark:bg-gray  bg-blue flex lg:sticky lg:h-screen lg:p-12 lg:w-full lg:flex-col lg:top-0 lg:bottom-auto lg:justify-start">
      <h2 className="hidden text-2xl font-bold text-veryLightBlue dark:text-veryLightGray lg:block">
        Kwiki
      </h2>
      <div className="h-full flex justify-center gap-8 lg:flex-col lg:mt-16">
        <SidebarIcon
          icon={<AiOutlineFileSearch size={28} color="#DAFFFB" />}
          name="discover"
        />
        <SidebarIcon
          icon={<MdGroups2 size={28} color="#DAFFFB" />}
          name="groups"
        />
        <SidebarIcon
          icon={<RxAvatar size={28} color="#DAFFFB" />}
          name="profile"
        />
        <SidebarIcon
          icon={<FiSettings size={28} color="#DAFFFB" />}
          name="settings"
        />
      </div>
    </div>
  );
};

export default Sidebar;
