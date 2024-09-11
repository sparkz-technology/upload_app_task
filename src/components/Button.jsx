/* eslint-disable react/prop-types */
function Button({ variant, handleClick, type, label }) {
  const style = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
      case "secondary":
        return "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
      default:
        return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    }
  };
  return (
    <button className={`${style()}`} onClick={handleClick} type={type}>
      {label}
    </button>
  );
}

export default Button;
