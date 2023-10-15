import InputArea from "../components/InputArea";
import Text from "../components/Text";

const ChatScreen = () => {
  return (
    <div className="min-h-screen relative p-16">
      <div className="flex flex-col gap-4 items-start">
        <Text />
        <Text />
        <Text />
        <Text />
      </div>
      <InputArea />
    </div>
  );
};

export default ChatScreen;
