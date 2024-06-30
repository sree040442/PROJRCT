import React, { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CartContext from "../../utils/CartContext";
import CartItems from "./CartItems";

const Cart = () => {
  const { cartItems, checkout, clearCart, total } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid mt-5 " style={{ backgroundColor: "rgb(230 238 245)", }}>
        <div className="row pt-5 px-5 pb-3 d-flex">
          <div className="col-10 pt-1">
            <h1>Product Cart</h1>
          </div>
          <div className="col-2">
            {cartItems.length !== 0 && (
              <button
                className="btn btn-success mt-3 float-end"
                onClick={() => navigate("/receipt")}
              >
                Payment
              </button>
            )}
          </div>
        </div>
        <div className="card p-3">
          {cartItems.length === 0 ? (
            <h4 style={{}}>Cart is empty</h4>
          ) : (
            <ul>
              {cartItems.map((product, index) => (
                <CartItems key={product.id} product={product} index={index} />
              ))}
              <div className="row ">
                <div className="col-7"></div>
                <div className="col-1"></div>
                <div className="col-1">
                  <NavLink
                    to={"/viewProducts"}
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => clearCart()}
                  >
                    Clear
                  </NavLink>
                </div>
                <div className="col-3 d-flex">
                  <h5 className="mx-1"> Total : </h5>
                  <h5><FaRupeeSign fontSize="16px" />{total} /- </h5>
                </div>
              </div>
            </ul>
          )}
        </div>
        <div className="row mx-5 pb-5">
          <div className="col-9"></div>
          <div className="col-2">
            <button
              className="btn btn-info text-white mt-3"
              onClick={() => navigate("/viewProducts")}
            >
              Back To Products
            </button>
          </div>
          <div className="col-1">
            {cartItems.length !== 0 && (
              <button
                className="btn btn-success mt-3 "
                onClick={() => navigate("/receipt")}
              >
                Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
