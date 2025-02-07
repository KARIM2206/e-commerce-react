import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setPageNumber } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: products, loading, total, pageNumber } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchProducts(pageNumber));
  }, [dispatch, pageNumber]);

  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart(product));
    } else {
      navigate("/auth/signIn");
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {loading ? (
        <div>Loading.......</div>
      ) : (
        <>
          <div className={style.products}>
            {products.map((product) => (
              <div className={style.singleProduct} key={product.id}>
                <img src="./img.png" alt="Product" />
                <div className={style.bottomSide}>
                  <p>{product.title}</p>
                  <p>{product.price} $</p>
                  <button className={style.add} onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={style.buttonsPagenition}>
            <button onClick={() => dispatch(setPageNumber(Math.max(pageNumber - 1, 1)))} disabled={pageNumber === 1}>
              -
            </button>
            <div>Page {pageNumber}</div>
            <button onClick={() => dispatch(setPageNumber(Math.min(pageNumber + 1, totalPages)))} disabled={pageNumber === totalPages}>
              +
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
