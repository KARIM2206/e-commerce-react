import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import style from "./style.module.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className={style.navbar}>
      <Link to="/">Logo</Link>
      <ul className={style.link_wrapper}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link onClick={handleLogout}>Sign Out</Link>
            </li>
            <li>
              <Link to="/cart" className={style.cartIcon}>
                <FaShoppingCart size={60} color="black" />
                <span>{cart.length}</span>
              </Link>
            </li>
            <li>Welcome, {user.firstName}</li>
          </>
        ) : (
          <li>
            <Link to="/auth/signIn">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
