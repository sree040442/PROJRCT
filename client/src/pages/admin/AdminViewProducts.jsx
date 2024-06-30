import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/ProductsApi";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import SingleProduct from "../users/SingleProduct";
import AddProducts from "./AddProducts";
import AdminSingleProduct from "./AdminSingleProduct";

const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(products.length / recordsPerPage);

  return (
    <>
      <div style={{ backgroundColor: "rgb(230 238 245)" }}>
        <Navbar />
        <div className=" py-5 container">
          <div className="mt-5">
            <button
              className="btn btn-success fs-5"
              aria-current="page"
              onClick={() => navigate("/addProducts")}
            >
              Add Products
            </button>
          </div>
          <div className="my-3  d-flex flex-wrap justify-content-around ">
            {currentRecords &&
              currentRecords.map((product, index) => {
                return (
                  <AdminSingleProduct
                    product={product}
                    key={product.id}
                  />
                );
              })}
          </div>
          <div className="row w-50 float-end">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminViewProducts;
