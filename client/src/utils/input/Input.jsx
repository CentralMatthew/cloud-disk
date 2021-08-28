import React from "react";

const Input = (props) => {
  return (
    <input
      onChange={(e) => props.setValue(e.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
    />
  );
};

export default Input;
