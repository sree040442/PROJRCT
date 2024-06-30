import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { getShipmentById, updateShipment } from "../../api/ShipmentApi";
import {
  getPayment,
  getPaymentById,
  updatePayment,
} from "../../api/PaymentApi";

import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import Validate from "../../validation/ValidatePayment";
import { getUserById } from "../../api/UserApi";
import { getProductsById } from "../../api/ProductsApi";
const user1 = JSON.parse(localStorage.getItem("token"));

const DeliveryReturnProducts = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [isLoding, setIsLoading] = useState(true);

  const [review, setReview] = useState({
    delivery_boy_review: "",
  });

  const [productId, setProductId] = useState([]);
  const [returnProducts, setReturnProducts] = useState([]);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const getAllShipments = async () => {
    try {
      const response = await getPayment();
      let item = [];

      for (let i of response.data) {
        let products = [];
        if (i.return_products !== null) {
          for (let j of i.return_products) {
            const product = await getProductsById(j);
            products.push(product.data);
          }
        }
        i.return_products = products;

        const user = await getUserById(i.user);
        const shipment = await getShipmentById(i.shipment);

        i.user = user.data;
        i.shipment = shipment.data;

        if (i.shipment.delivery_boy_assigned === user1.id) {
          if (i.status === "Return") {
            item.push(i);
          }
        }
      }
      setData(item);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllShipments();
  }, []);

  const getSinglePayment = async () => {
    try {
      const res = await getPaymentById(productId.id);
      setReturnProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePayment();
  }, [productId]);

  const handleClick = (item) => {
    setProductId(item);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const handleReview = async (e) => {
    await updatePayment(productId.id, {
      ...returnProducts,
      delivery_boy_review: review.delivery_boy_review,
    });
    toast.success("Reviewed successfully");
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Return Products
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleReview}>
                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Review
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="delivery_boy_review"
                    value={review.delivery_boy_review}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card table-responsive mx-5 py-3 my-3">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Name</th>
            <th className="pb-2 px-2 mx-2">Damaged Products</th>
            <th className="pb-2 px-2 mx-2">Reason</th>
            <th className="pb-2 px-2 mx-2">Return status</th>
            <th className="pb-2 px-2 mx-2">Review</th>
          </tr>
          {isLoding ? (
            <tr>
              <td colSpan={6} className="text-center mt-5 pt-5 h2">
                Loading...
              </td>
            </tr>
          ) : currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={item.id}>
                {item.status === "Return" && (
                  <td className="text-center py-2">{index + 1}</td>
                )}
                {item.status === "Return" && (
                  <td className="text-center py-2">{item.user.first_name}</td>
                )}
                {item.status === "Return" && (
                  <td className="py-2">
                    {item.return_products.map((data, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-11 text-center">
                            {index + 1} {"  "} {data.name}
                          </div>
                        </div>
                      );
                    })}
                  </td>
                )}

                {item.status === "Return" && (
                  <td className="text-center py-2">{item.reason}</td>
                )}
                {item.status === "Return" && (
                  <td
                    className={
                      item.return_status === "Pending"
                        ? "text-warning text-center py-2"
                        : item.return_status === "Accepted"
                        ? "text-success text-center py-2"
                        : "text-danger text-center py-2"
                    }
                  >
                    {item.return_status}
                  </td>
                )}
                {item.status === "Return" && (
                  <td className="text-center py-2 nowrap">
                    {item.delivery_boy_review}
                  </td>
                )}
                {item.status === "Return" &&
                  item.delivery_boy_review === "" && (
                    <td className="text-center py-2">
                      <button
                        className="btn btn-primary bg-primary mx-2 "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        type="submit"
                        onClick={() => handleClick(item)}
                      >
                        Review
                      </button>
                    </td>
                  )}
              </tr>
            ))
          ) : (
            <tr>
              <th className="text-center pt-4 fs-3" colspan="10">
                No Details To Display
              </th>
            </tr>
          )}
        </table>
        <div className="d-flex">
          <h1 className="me-auto"></h1>
          <div className={"mx-5 pt-2"}>
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryReturnProducts;
