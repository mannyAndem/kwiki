import { useEffect, useRef } from "react";
import CurrentUserText from "./CurrentUserText";
import Text from "./Text";
import { useFireStore } from "../hooks/useFireStore";
import { useState } from "react";

const MessagesContainer = ({ id, user }) => {
  const { snapshotListener } = useFireStore("messages");
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      snapshotListener(id, (data) => {
        setMessages(data.data().messages);
      });
    };

    getMessages();
  }, []);

  // nessagesContainer ref
  const messagesContainerRef = useRef(null);

  // useEffect to scroll to bottom of page when messages change
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
    });
  }, [messages]);
  return (
    messages && (
      <div
        className="flex flex-col gap-4 items-start"
        ref={messagesContainerRef}
      >
        {messages.map((message) =>
          message.sender.id !== user.id ? (
            <Text message={message} />
          ) : (
            <CurrentUserText message={message} />
          )
        )}
      </div>
    )
  );
};

export default MessagesContainer;
