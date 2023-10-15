import Message from "../components/Message";

const Messages = () => {
  return (
    <div className="p-16">
      <h2 className="text-3xl text-darkBlue">Your Messages</h2>
      <div className="mt-16 flex flex-col gap-4">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default Messages;
