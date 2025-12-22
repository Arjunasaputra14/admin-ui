import React, { useState } from "react";

function UserCard({ name, email, street, city }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Email: </span>
        {email}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Address: </span>
        {street}, {city}
      </p>
      <button
        className={`px-4 py-2 rounded-md transition-colors ${
          clicked 
            ? "bg-green-500 hover:bg-green-600 text-white" 
            : "bg-gray-500 hover:bg-gray-600 text-white"
        }`}
        onClick={handleClick}
      >
        {clicked ? "Tombol Sudah Diklik" : "Silakan Klik"}
      </button>
    </div>
  );
}

export default UserCard;