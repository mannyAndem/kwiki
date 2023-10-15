import SidebarIcon from "./SidebarIcon";
import { BiMessageDetail } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sticky top-0 dark:bg-gray p-12 h-screen w-full bg-blue flex flex-col">
      <h2 className="text-2xl font-bold text-veryLightBlue dark:text-veryLightGray">
        Kwiki
      </h2>
      <div className="h-full mt-16 flex flex-col justify-center gap-8">
        <SidebarIcon icon={<BiMessageDetail size={28} />} name="messages" />
        <SidebarIcon icon={<MdGroups2 size={28} />} name="groups" />
        <SidebarIcon icon={<RxAvatar size={28} />} name="profile" />
        <SidebarIcon icon={<FiSettings size={28} />} name="settings" />
      </div>
    </div>
  );
};

export default Sidebar;
