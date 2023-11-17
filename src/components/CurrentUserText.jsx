const CurrentUserText = ({ message }) => {
  return (
    <div className="self-end shadow-sm rounded-lg max-w-[60%] min-w-[128px] p-5 bg-lightBlue text-veryLightBlue dark:text-veryLightGray dark:bg-lightGray dark:bg-opacity-50">
      <h3 className="font-semibold mb-1">You</h3>
      <p>{message.content}</p>
    </div>
  );
};

export default CurrentUserText;
