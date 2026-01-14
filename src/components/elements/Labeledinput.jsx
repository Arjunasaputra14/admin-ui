import React from "react";
import Input from "./Input";

function Labeledinput(props) {
  const { label, id, ...rest } = props;

  return (
    <>
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>
      <Input id={id} {...rest} />
    </>
  );
}

export default Labeledinput;