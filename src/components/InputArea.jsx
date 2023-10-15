import { IoSend } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";

const InputArea = () => {
  return (
    <div className="absolute left-0 right-0 bottom-0">
      <div className="z-10 bg-veryLightBlue fixed transform   py-8 px-16 flex items-start gap-5 text-blue">
        {/* <div className="fixed"> */}
        <textarea
          className="w-full p-5 border-blue border-2 rounded-xl shadow-md bg-transparent focus:border-darkBlue focus:outline-none"
          placeholder="Enter Yout message"
        ></textarea>
        <BsFillSendFill size={28} color="#176B87" className="cursor-pointer" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default InputArea;
