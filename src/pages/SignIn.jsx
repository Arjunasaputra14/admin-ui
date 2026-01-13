import React, { useContext, useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import FormSignIn from "../components/fragments/FormSignin";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/elements/AppSnackbar";

function SignIn() {
  const { login } = useContext(AuthContext);

  // State dengan nama persis seperti soal
  const [snackbar, setSnackbar] = useState({
    tampil: false,
    teks: "",
    severity: "success",
  }); 
  
  // Fungsi handleCloseSnackbar sesuai soal
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, tampil: false });
  };

  const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
      login(refreshToken); 
    } catch (err) {
      setSnackbar({ tampil: true, teks: err.msg, severity: "error" });
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} />

      <AppSnackbar
        open={snackbar.tampil}
        message={snackbar.teks}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
}

export default SignIn;