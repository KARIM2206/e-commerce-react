import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import style from "./style.module.css";
import Modal from 'react-modal'; // Ensure this package is installed
import { ToastContainer, toast } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

function Cart() {
  const { user,cart } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

console.log(user.id);

  if (!user || !user.id) return null;
//   useEffect(() => {
//     if (user && user.id) {
//         fetch(`https://dummyjson.com/carts/${user.id}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network error');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//               console.log(data.carts);
              
//                 setData(data.carts);
                
//             })
//             .catch((error) => {
//                 console.error('Error fetching cart data:', error);
                
//             });
//     }
// }, [user]);
console.log(data);

 
  useEffect(() => {
    const total = data.reduce((acc, cart) => acc +( +cart.price), 0);
    setTotalPrice(total);
  }, [data]);

  const updateQuantity = (productId, quantityChange, cartId) => {
    fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merge: true,
        products: [{ id: productId, quantity: quantityChange }]
      })
    })
      .then(res => res.json())
      .then(updatedCart => {
        setData(prevCartData => prevCartData.map(cart => cart.id === cartId ? updatedCart : cart));
      });
 
  };

  const removeProduct = (cartId, productId) => {
    fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setData(prevCartData => prevCartData.filter(cart => cart.id !== cartId));
        toast.success('Product removed successfully!'); // Use toast here
      });
  };

  const removeAllProducts = () => {
    setIsModalOpen(false);
    Promise.all(data.map(cart => fetch(`https://dummyjson.com/carts/${cart.id}`, { method: 'DELETE' })))
      .then(() => {
        setData([]);
        toast.success('All products removed successfully!'); // Use toast here
      });
  };
console.log(data);

  return (
    <div>
      <ToastContainer /> {/* Add ToastContainer here */}
      {data.length === 0 ? <div>Your cart is empty.</div> : (
        <div>
          {data.map(cart => (
            <div key={cart.id} className={style.oneProduct}>
              {cart.products.map(product => (
                <div key={product.id} className={style.displayData}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div className={style.rightSide}>
                    <div>{product.title}</div>
                    <div>{product.price} $</div>
                  </div>
                  <div className={style.opration}>
                    <button onClick={() => updateQuantity(product.id, product.quantity - 1, cart.id)}>-</button>
                    <div className={style.numberOfProduct}>{product.quantity}</div>
                    <button onClick={() => updateQuantity(product.id, product.quantity + 1, cart.id)}>+</button>
                    <button onClick={() => removeProduct(cart.id, product.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="totalPrice">Total: {totalPrice} $</div>
          <button onClick={() => setIsModalOpen(true)}>Remove All</button>

          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <h2>Are you sure you want to delete all products?</h2>
            <button onClick={removeAllProducts}>Yes</button>
            <button onClick={() => setIsModalOpen(false)}>No</button>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Cart;