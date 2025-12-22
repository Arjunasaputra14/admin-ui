import React from "react";

function CheckBox({ label = "Keep me signed in" }) {
  return (
    <>
      <input type="checkbox" id="status" className="accent-primary" />
      <label htmlFor="status" className="text-sm text-gray-700">
        {label}
      </label>
    </>
  );
}

export default CheckBox;
