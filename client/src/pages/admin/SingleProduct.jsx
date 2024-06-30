import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsById } from "../../api/ProductsApi";
import Navbar from "../../components/Navbar";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const res = await getProductsById(id);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}>
        <Navbar />
        <div className="py-5 m-5 w-50">
          <div className="card text-decoration-none text-black mt-3">
            <div className="row">
              <div className="col-6">
                <div>
                  <img
                    src={product.image?.replace("/shipyard", "")}
                    // src={"/floating-shipyard-ahmed.webp"}
                    className="card-img-top p-3"
                    alt={product.image?.replace("/shipyard", "")}
                    style={{
                      // width: "500px",
                      height: "300px",
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="row mt-3 ">
                  <h4>Description : </h4>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <h5 className="card-title w-50 mx-auto mt-1">{product.name}</h5>
              </div>
              <div className="col-6">
                <h5 className="d-flex mt-1 float-end mx-5">
                  <p className="mx-1">Price : </p>
                  <FaRupeeSign fontSize="18px" className="mt-1" />
                  <span>{product.price} /-</span>
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col mx-5 mb-3">
                <button
                  className="btn btn-info text-white mt-3 float-end"
                  onClick={() => navigate("/viewAdminProducts")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
