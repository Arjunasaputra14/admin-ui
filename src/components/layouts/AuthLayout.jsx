import React, { useContext } from "react";
import Logo from "../elements/Logo";
import { ThemeContext } from "../../context/themeContext";

function AuthLayout(props) {
  const { children } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <main 
    className={ 'min-h-screen bg-special-mainBg flex justify-center items-center ${theme.name}' }
    >
      <div className="w-full max-w-sm p-5">
        <Logo />
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
