import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Tambahkan import Link
import AuthLayout from "../components/layouts/AuthLayout";
import FormSignIn from "../components/fragments/FormSignin";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/elements/AppSnackbar";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    tampil: false,
    teks: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, tampil: false }));
  };

  const handleLogin = async (email, password) => {
    // Reset snackbar sebelumnya
    setSnackbar({ tampil: false, teks: "", severity: "success" });
    setIsLoading(true);

    try {
      const { refreshToken } = await loginService(email, password);
      
      // Tampilkan success message
      setSnackbar({ 
        tampil: true, 
        teks: "Login berhasil! Mengalihkan...", 
        severity: "success" 
      });
      
      // Login setelah delay
      setTimeout(() => {
        login(refreshToken);
      }, 1500);
      
    } catch (err) {
      // Handle berbagai tipe error
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.msg) {
        errorMessage = err.msg;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setSnackbar({ 
        tampil: true, 
        teks: errorMessage, 
        severity: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} isLoading={isLoading} />

      {/* Link ke halaman register - pindahkan ke sini atau ke FormSignIn */}
      <div className="flex justify-center mt-4">
        <span className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Create an account
          </Link>
        </span>
      </div>

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