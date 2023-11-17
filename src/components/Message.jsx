import groupIcon from "../assets/Messaging-rafiki.svg";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <Link
      className="cursor-pointer relative dark:bg-lightGray dark:text-gray text-darkBlue flex items-center gap-5 rounded-lg p-4 shadow-md bg-lightBlue bg-opacity-50"
      to="/dashboard/chat"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={groupIcon} className="object-cover" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">Manic overlords</h3>
        <p>
          <span className="text-blue dark:text-black font-semibold">John:</span>{" "}
          We're getting acquired guys!
        </p>
      </div>
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs h-6 w-6 rounded-full bg-darkBlue text-veryLightBlue flex items-center justify-center">
        1
      </span>
    </Link>
  );
};

export default Message;
