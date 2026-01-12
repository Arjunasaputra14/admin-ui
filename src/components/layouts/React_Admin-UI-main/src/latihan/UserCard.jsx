/*
import React, { useState } from "react";

function UserCard(props) {
  const { title, body } = props;
  const [clicked, setClicked] = useState(false);
/*
  return (
    <div
      className={`
        flex flex-col justify-between items-center text-center
        p-4 rounded-lg shadow-md transition-all duration-300 transform
        ${clicked ? "bg-pink-100" : "bg-white"}
        hover:scale-105 hover:shadow-lg hover:border hover:border-black
        min-h-[260px] max-w-xs mx-auto
      `}
    >
   
      
      <h2 className="text-sm font-semibold text-gray-800 mb-2 leading-snug">
        {title}
      </h2>

      
      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-4 whitespace-pre-line">
        {body}
      </p>

      
      <button
        className={`text-white py-1.5 px-3 rounded-md w-full transition-colors duration-200 text-sm font-medium
          ${clicked 
            ? "bg-[#b83016] hover:bg-[#d94a3c]"
            : "bg-gray-500 hover:bg-gray-600"
          }`}
        onClick={() => setClicked(true)}
      >
        {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
      </button>
    </div>
  );
}


/*
export default UserCard;
*/