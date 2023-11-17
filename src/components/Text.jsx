const Text = ({ message }) => {
  console.log("message hit!");
  return (
    <div className="shadow-sm rounded-lg max-w-[60%] min-w-[128px] p-5 dark:bg-gray bg-blue text-veryLightBlue dark:text-veryLightGray">
      <h3 className="font-semibold mb-1">{message.sender.username}</h3>
      <p>{message.content}</p>
    </div>
  );
};

export default Text;
