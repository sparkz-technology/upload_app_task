/* eslint-disable react/prop-types */
function Chip({
  id,
  isActivated = false,
  label,
  handleButtonClick = () => {},
  handleSelect = () => {},
}) {
  return (
    <div
      className={` flex items-center justify-between py-1 px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out 
          ${
            isActivated ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }
          hover:shadow-md hover:scale-105 hover:bg-gray-300 focus-within:bg-gray-400`}
      onClick={handleSelect}
    >
      <span
        className={`text-sm font-medium ${
          isActivated
            ? "text-white"
            : "text-gray-800 transition-all duration-300 ease-in-out"
        }`}
      >
        {label}
      </span>
      <button
        name={id}
        onClick={handleButtonClick}
        className="ml-3 text-sm text-gray-500 hover:text-red-600 focus:text-red-600 transition-all duration-300 ease-in-out focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
}

export default Chip;
