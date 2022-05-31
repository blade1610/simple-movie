import React from "react";

const Button = ({
  onClick,
  type = "button",
  bgColor = "primary",
  className,
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      // eslint-disable-next-line no-unused-vars
      bgClassName = "bg-secondary";
    // eslint-disable-next-line no-fallthrough
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 mt-auto capitalize rounded-lg ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
