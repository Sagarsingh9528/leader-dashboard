const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded font-medium transition-all focus:outline-none";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}               
      onClick={onClick}
      disabled={disabled}       
      className={`${baseStyle} ${
        variants[variant]
      } ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}                
    >
      {children}
    </button>
  );
};

export default Button;