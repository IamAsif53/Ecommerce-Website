import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, token, rememberMe = true) => {
    console.log("Remember Me:", rememberMe);
    console.log("Token received:", token);
    setUser(userData);

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      console.log("Saved to localStorage");
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", token);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("Saved to sessionStorage");
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
