import React, { useContext } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import CartContext from "../../utils/CartContext";
const CartItems = ({ product, index }) => {
  const { increase, decrease, removeFromCart } = useContext(CartContext);

  return (
    <>
      <div className="row mt-2 ">
        <h4 className="col-1 pt-4">{index + 1}</h4>
        <h5 className="col-1 pt-4">{product.name}</h5>
        <div className="col-2 mx-2">
          <img
            className="card-img-top"
            src={product.image?.replace("/shipyard", "")}
            alt={product.image?.replace("/shipyard", "")}
            style={{
              height: "100px",
              // width:"px"
            }}
          />
        </div>
        {/* <div className="col-3">{product.description}</div> */}
        <div className="col-2 px-2 mt-4 text-center">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => {
                decrease(product);
              }}
            >
              <AiOutlineMinus color="white" fontSize="25px" />
            </button>
            <div>
              <h5 className="mx-2 mt-1">{product.quantity}</h5>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                increase(product);
              }}
            >
              <AiOutlinePlus color="white" fontSize="25px" />
            </button>
          </div>
        </div>

        <div className="col-2 pt-4 h6">
          <FaRupeeSign fontSize="14px" />
          {product.price} /-
        </div>
        <div className="col-2 pt-4 h6">
           Price :
           <FaRupeeSign fontSize="14px" />{product.price * product.quantity} /-
        </div>
        <div className="col-1 pt-4">
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => removeFromCart(product)}
          >
            Remove
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default CartItems;
