import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../elements/Button";

function FormSignup({ onSubmit }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // State untuk error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  // State untuk track field yang sudah di-blur
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  // State untuk toast notification
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "" // "error" atau "success"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Hapus error saat user mulai mengetik
    if (value.trim() !== "") {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Tandai field sebagai touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validasi field saat blur
    if (value.trim() === "") {
      setErrors(prev => ({
        ...prev,
        [name]: getErrorMessage(name)
      }));
    }
  };

  const getErrorMessage = (fieldName) => {
    const messages = {
      name: "Nama wajib diisi",
      email: "Email wajib diisi",
      password: "Password wajib diisi"
    };
    return messages[fieldName] || "";
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validasi semua field
    Object.keys(formData).forEach(key => {
      if (formData[key].trim() === "") {
        newErrors[key] = getErrorMessage(key);
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Tandai semua field sebagai touched
    setTouched({
      name: true,
      email: true,
      password: true
    });

    return isValid;
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    
    // Auto hide setelah 5 detik
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 5000);
  };

  const closeToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mulai loading
      setIsLoading(true);
      
      // Simulasi delay untuk menunjukkan loading (1.5 detik)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulasi pengecekan email yang sudah terdaftar
      const registeredEmail = "111202315378@mhs.dinus.ac.id";
      
      if (formData.email === registeredEmail) {
        // Tampilkan notifikasi error - email sudah terdaftar
        setIsLoading(false);
        showToast("Email sudah pernah digunakan sebelumnya", "error");
        return;
      }
      
      try {
        if (onSubmit) {
          await onSubmit(formData.name, formData.email, formData.password);
        }
        
        // Tampilkan notifikasi sukses
        setIsLoading(false);
        showToast("Register Berhasil", "success");
        
        // Redirect setelah 2 detik
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        // Tampilkan notifikasi error
        setIsLoading(false);
        showToast("Email sudah pernah digunakan sebelumnya", "error");
      }
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-up ${
          toast.type === "error" 
            ? "bg-red-500 text-white" 
            : "bg-green-600 text-white"
        }`}>
          <div className="flex items-center gap-3">
            {toast.type === "error" ? (
              // Error Icon
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              // Success Icon
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          <button
            onClick={closeToast}
            className="ml-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-2">
        {/* Title */}
        <h1 className="text-center text-lg font-semibold mb-4">
          Create an Account
        </h1>

        {/* Name */}
        <div className="py-2">
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Arjuna Saputra"
            className="p-2 text-sm rounded-md w-full bg-special-mainBg border border-gray-300 text-gray-700 focus:border-black focus:outline-none"
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="py-2">
          <label className="block text-sm mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Arjunasaputra@gmail.com"
            className="p-2 text-sm rounded-md w-full bg-special-mainBg border border-gray-300 text-gray-700 focus:border-black focus:outline-none"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="py-2 relative">
          <label className="block text-sm">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="●●●●●●●●●●●●●●"
            className="p-2 text-sm rounded-md w-full bg-special-mainBg border border-gray-300 text-gray-700 focus:border-black focus:outline-none my-2"
            minLength="6"
          />

          {errors.password && touched.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center justify-center my-4 relative">
        <div className="w-full border-t border-gray-300"></div>
        <span className="absolute bg-special-mainBg px-2 text-xs text-gray-400">
          or sign up with
        </span>
      </div>

      {/* Google Button */}
      <Button type="button" variant="secondary" disabled={isLoading}>
        <span className="flex items-center justify-center">
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            viewBox="-0.5 0 48 48"
          >
            <path
              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
              fill="#FBBC05"
            />
            <path
              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
              fill="#EB4335"
            />
            <path
              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
              fill="#34A853"
            />
            <path
              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
              fill="#4285F4"
            />
          </svg>
          Continue with Google
        </span>
      </Button>

      {/* Back to Login */}
      <div className="flex justify-center mt-4">
        <span className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-bold hover:underline"
          >
            Sign In Here
          </Link>
        </span>
      </div>

      {/* Custom CSS untuk animasi */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default FormSignup;