import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSingleProduct = ({ product }) => {
 
  return (
    <>
      <div className="py-2 m-10" style={{ width: "30%" }}>
        <div className="card" style={{ width: "18rem" }}>
          <NavLink
            to={`/product/${product.id}`}
            className="card-img-top text-decoration-none text-black "
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
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <div className="d-grid gap-1 mx-3 mt-2 float-end">
                <h5 className="d-flex ">
                  <p className="mx-1">Price : </p>
                  <FaRupeeSign fontSize="18px" className="mt-1" />
                  <span>{product.price} /-</span>
                </h5>
              </div>
            </div>
          </NavLink>
          {/* <div>
            <button
              className="btn btn-danger text-white"
              onClick={() => {
                handleDelete(product.id);
              }}
            >
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminSingleProduct;
