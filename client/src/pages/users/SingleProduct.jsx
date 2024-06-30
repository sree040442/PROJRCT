import React, { useContext, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CartContext from "../../utils/CartContext";

const SingleProduct = ({ product }) => {
  const { addToCart, increase, cartItems } = useContext(CartContext);

  //Check whether the product is in the cart or not
  const isInCart = (product) => {
    return cartItems.find((item) => item.id === product.id);
  };

  return (
    <>
      <div className="py-2 m-10" style={{ width: "30%" }}>
        <div className="card" style={{ width: "18rem" }}>
          <NavLink
            to={`/singleProduct/${product.id}`}
            className="card-img-top text-decoration-none text-black "
            style={{ width: "18rem" }}
          >
            <img
              src={product.image?.replace("/shipyard", "")}
              // src={"/floating-shipyard-ahmed.webp"}
              className="img-fluid card-img-top"
              alt={product.image?.replace("/shipyard", "")}
              style={{
                // width: "500px",
                height: "200px",
              }}
            />
          </NavLink>
          <div className="card-body">
            <NavLink
              to={`/singleProduct/${product.id}`}
              className="card-img-top text-decoration-none text-black "
              style={{ width: "18rem" }}
            >
              <h5 className="card-title">{product.name}</h5>
              {/* <p className="card-text">{product.description}</p> */}
              <div className="d-grid gap-1 mx-3 mt-2 float-end">
                <h5 className="d-flex ">
                  <p className="mx-1">Price : </p>
                  <FaRupeeSign fontSize="18px" className="mt-1" />
                  <span>{product.price} /-</span>
                </h5>
              </div>
            </NavLink>

            {isInCart(product) && (
              <button
                className="btn btn-success text-white"
                type="submit"
                onClick={() => {
                  increase(product);
                }}
              >
                Add More
              </button>
            )}

            {!isInCart(product) && (
              <button
                className="btn btn-success text-white"
                type="submit"
                onClick={() => addToCart(product)}
              >
                ADD To CART
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
