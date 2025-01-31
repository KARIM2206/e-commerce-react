import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignIn from "./components/auth/signIn";
import { AuthProvider } from "./components/context/authContext";

import Cart from "./components/Cart";
function App() {
  return (
    <AuthProvider>
 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/auth/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  
    </AuthProvider>
  );
}

export default App;
