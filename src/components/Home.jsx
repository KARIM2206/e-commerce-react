import React, { useContext, useEffect, useState } from 'react';
import style from "./style.module.css";
import { AuthContext } from './context/AuthContext';

function Home() {
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const { cart, setCart, user } = useContext(AuthContext);
    
    const limit = 10;

    useEffect(() => {
        const skip = (pageNumber - 1) * limit;
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,id`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.products);
                setLoading(false);
                setTotal(data.total);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, [pageNumber]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, [setCart]);

    const addToCart = (product) => {
        const userId = user.id; 
        const cartItem = {
            userId: userId,
            products: [{ id: product.id, quantity: 1 }], 
        };
        
        // Update the cart in state
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            <h2>Products</h2>
            {loading ? (
                <div>Loading.......</div>
            ) : (
                <>
                    <div className={style.products}>
                        {data.map((product) => (
                            <div className={style.singleProduct} key={product.id}>
                                <img src="./img.png" alt="Product" />
                                <div className={style.bottomSide}>
                                    <p>{product.title}</p>
                                    <p>{product.price} $</p>
                                    <button className={style.add} onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={style.buttonsPagenition}>
                        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber === 1}>
                            -
                        </button>
                        <div>Page {pageNumber}</div>
                        <button onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))} disabled={pageNumber === totalPages}>
                            +
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;