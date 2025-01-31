import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
export const CartContext=createContext();
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  const [cart,setCart]=useState([])
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data); 
      // navigate("/"); 
    } catch (error) {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login,cart,setCart }}>
      {children}
    </AuthContext.Provider>
  );
};
