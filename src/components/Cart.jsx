import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import style from "./style.module.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((product) => (
        <div key={product.id} className={style.displayData}>
          <img src={product.thumbnail} alt={product.title} />
          <div className={style.rightSide}>
            <div>{product.title}</div>
            <div>{product.price} $</div>
          </div>
          <button onClick={() => dispatch(removeFromCart(product.id))}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}

export default Cart;
