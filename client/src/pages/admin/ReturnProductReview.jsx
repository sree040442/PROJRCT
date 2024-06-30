import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getPaymentById, updatePayment } from "../../api/PaymentApi";
import { getProductsById } from "../../api/ProductsApi";
import { getShipmentById } from "../../api/ShipmentApi";
import { getUserById } from "../../api/UserApi";
import Navbar from "../../components/Navbar";

const ReturnProductReview = () => {
  const [data, setData] = useState([]);
  const [payment, setPayment] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const getPayment = async () => {
    try {
      const res = await getPaymentById(id);
      setPayment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDelivery = async () => {
    try {
      const res = await getPaymentById(id);

      const user = await getUserById(res.data.user);
      const shipment = await getShipmentById(res.data.shipment);

      res.data.user = user.data;
      res.data.shipment = shipment.data;

      let item = [];
      for (let i of res.data.return_products) {
        const products = await getProductsById(i);
        item.push(products.data);
      }

      res.data.return_products = item;
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDelivery();
    getPayment();
  }, []);

  const handleAccepted = async (e) => {
    e.preventDefault();
    await updatePayment(id, { ...payment, return_status: "Accepted" });
    // navigate("/");
    toast.success("Return Requested Accepted");
    getDelivery();
  };

  const handleRejected = async () => {
    await updatePayment(id, { ...payment, return_status: "Rejected" });
    // navigate("/");
    toast.error("Return Requested Rejected");
    getDelivery();
  };
  return (
    <div
      style={{ backgroundColor: "rgb(230 238 245)", minHeight: "100vh" }}
      className="py-4"
    >
      <Navbar />
      <div className="container mx-auto my-5 pt-3">
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <h1 className=" me-auto">Return Products</h1>
            </div>
            <div className="col">
              <h4 className="mt-3">
                Status :{" "}
                <span
                  className={
                    data.return_status === "Pending"
                      ? "text-info"
                      : data.return_status === "Accepted"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {data.return_status}
                </span>
              </h4>
            </div>
            <div className="col">
              <h2 className="mt-2">
                Ship Name :{" "}
                <span className="text-info">
                  {data.shipment && data.shipment.name}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="card table-responsive mx-5 py-3 my-3">
          <table className={`table table-striped table-hover `}>
            <tr className="text-center pb-4">
              <th className="pb-2 px-2 mx-2">ID</th>
              <th className="pb-2 px-2 mx-2">Products</th>
              <th className="pb-2 px-2 mx-2">Price</th>
            </tr>
            {data.return_products && data.return_products.length > 0 ? (
              data.return_products.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center py-2">{index + 1}</td>
                  <td className="text-center py-2">{item.name}</td>
                  <td className="text-center py-2">{item.price}</td>
                  {/* <td className="text-center py-2">{item.status}</td> */}
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
        </div>
        <div>
          <div className="mb-2">Return Product Reason</div>
          <div className="card p-3">{data.reason}</div>
          <div className="my-2">Delivery Boy Review</div>
          <div className="card p-3">{data.delivery_boy_review}</div>
          <div className="d-flex mt-4">
            <div className="mt-2 ">
              <div className="dropdown">
                <button
                  className="btn btn-primary text-white dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Return Review
                </button>
                <ul
                  className="dropdown-menu w-50"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <button
                    className="btn btn-success mb-2 mx-4"
                    type="submit"
                    onClick={handleAccepted}
                  >
                    ACCEPTED
                  </button>
                  <button
                    className="btn btn-danger mx-4"
                    type="submit"
                    onClick={handleRejected}
                  >
                    REJECTED
                  </button>
                </ul>
              </div>

              {(data.return_status !== "Pending" && data.return_status !== "Rejected") && (
                <div className="mt-2 d-flex">
                  <h4 className="text-primary mx-5">
                    Do You want to Exchange/ Refund ?
                  </h4>
                  <h4
                    className={
                      data.exchange_refund_status === "Pending"
                        ? "text-info mx-2"
                        : "text-success mx-2"
                    }
                  >
                    {data.exchange_refund_status}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnProductReview;
