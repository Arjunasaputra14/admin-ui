import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import FormSignup from "../components/fragments/FormSignup";
import AppSnackbar from "../components/elements/AppSnackbar";

function SignUp() {
  const [snackbar, setSnackbar] = useState({
    tampil: false,
    teks: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, tampil: false }));
  };

  return (
    <AuthLayout>
      <FormSignup />

      <AppSnackbar
        open={snackbar.tampil}
        message={snackbar.teks}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
}

export default SignUp;