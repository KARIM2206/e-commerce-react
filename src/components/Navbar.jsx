import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const { user, setUser } = useContext(AuthContext); 
  const [isLogged, setIsLogged] = useState(false);
  const { cart } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className={style.navbar}>
      <Link to="/">Logo</Link>
      <ul className={style.link_wrapper}>
        <li><Link to="/">Home</Link></li>
        {isLogged ? (
          <>
            <li><Link to="/" onClick={handleLogout}>Sign Out</Link></li>
            <li>
              <Link to="/cart" className={style.cartIcon}>
                <FaShoppingCart size={60} color="black" />
                <span>{cart.length}</span>
              </Link>
            </li>
            <li>Welcome, {user.firstName}</li>
          </>
        ) : (
          <li><Link to="/auth/signIn">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;