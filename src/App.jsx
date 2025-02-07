import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignIn from "./components/auth/Login";
import Cart from "./components/Cart";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth/signIn" element={<SignIn />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
