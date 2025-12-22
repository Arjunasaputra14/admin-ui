import React from "react";
import Logo from "../elements/Logo";

function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-special-mainBg flex justify-center items-center font-poppins">
      <div className="w-full max-w-sm p-5">
        <Logo />
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
