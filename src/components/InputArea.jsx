import { IoSend } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useThemeContext } from "../contexts/ThemeContext";
import { useState } from "react";
import { useFireStore } from "../hooks/useFireStore";

const InputArea = ({ groupId, user }) => {
  const { isLightTheme } = useThemeContext();

  const [messageInput, setMessageInput] = useState("");

  const handleChange = (e) => {
    setMessageInput(e.target.value);
  };

  const { setDocWithId, get } = useFireStore("messages");
  //  function to send message
  const sendMessage = async (message) => {
    const data = await get(groupId);
    const messages = data.messages;
    messages.push(message);
    await setDocWithId(groupId, { messages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      content: messageInput,
      sender: user,
    };
    sendMessage(message);
    setMessageInput("");
  };

  return (
    <form
      className="absolute right-0 left-0 bottom-20 px-5 z-10 dark:bg-black bg-veryLightBlue transform py-8 flex items-start gap-5 text-blue dark:text-veryLightGray lg:bottom-0 lg:px-16"
      onSubmit={(e) => handleSubmit(e)}
    >
      <textarea
        className="w-full p-5 dark:border-veryLightGray border-blue border-2 rounded-xl shadow-md bg-transparent focus:border-darkBlue dark:focus:border-lightGray focus:outline-none"
        placeholder="Enter Yout message"
        value={messageInput}
        onChange={(e) => handleChange(e)}
      ></textarea>
      <button type="submit">
        <BsFillSendFill
          size={28}
          color={isLightTheme ? "#176B87" : "#183D3D"}
          className="cursor-pointer"
        />
      </button>
    </form>
  );
};

export default InputArea;
