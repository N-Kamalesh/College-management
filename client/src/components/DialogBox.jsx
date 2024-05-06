import PropTypes from "prop-types";
DialogBox.propTypes = {
  message: PropTypes.string,
  onDialog: PropTypes.func,
};
function DialogBox({ message, onDialog }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/[0.5] ">
      <div className="flex flex-col gap-4 items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-12 rounded-md">
        <h3 className="text-md sm:text-lg md:text-xl text-center ">
          {message}
        </h3>
        <div className="flex items-center text-white">
          <button
            className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md mr-4"
            onClick={() => onDialog(true)}
          >
            Yes
          </button>
          <button
            className="bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded-md"
            onClick={() => onDialog(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
