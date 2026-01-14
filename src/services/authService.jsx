const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const loginService = async (email, password) => {
  try {
    console.log("Sending login request with:", { email, password });

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email.trim(), 
        password: password 
      }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.msg || data.message || "Login gagal");
    }

    // Simpan token ke localStorage
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ========== TAMBAHKAN INI ==========
export const registerService = async (name, email, password) => {
  try {
    console.log("Sending register request with:", { name, email, password });

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: name.trim(),
        email: email.trim(), 
        password: password 
      }),
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.msg || data.message || "Registrasi gagal");
    }

    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};