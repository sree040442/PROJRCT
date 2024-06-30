import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPayment,
  getPaymentById,
  updatePayment,
} from "../../api/PaymentApi";
import { getProductsById } from "../../api/ProductsApi";
import { getShipmentById } from "../../api/ShipmentApi";
import { getUserById } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
import ReturnProducts from "./ReturnProducts";

const DeliveredProducts = () => {
  const [data, setData] = useState([]);
  const [payment, setPayment] = useState([]);

  const [display, setDisplay] = useState(false);
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
      for (let i of res.data.products) {
        const products = await getProductsById(i);
        item.push(products.data);
      }

      res.data.products = item;
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDelivery();
    getPayment();
  }, []);

  const handleReceived = async () => {
    await updatePayment(id, { ...payment, status: "Received" });
    getDelivery();
    toast.success("Received Successfully");
  };

  const handleReturn = async () => {
    setDisplay(true);
    await updatePayment(id, { ...payment, status: "Return" });
    getDelivery();
    toast.success("Return Request Send Successfully");
  };

  return (
    <div
      style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}
      className="pb-2"
    >
      <Navbar />
      <div className="container mx-auto my-5 pt-3">
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <h1 className=" me-auto">ALL Products</h1>
            </div>
            <div className="col">
              <h4 className="mt-3">
                Status :{" "}
                <span
                  className={
                    data.status === "Pending"
                      ? "text-info"
                      : data.status === "Received"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {data.status}
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
        {!display && (
          <div className="card table-responsive mx-5 py-3 my-3">
            <table className={`table table-striped table-hover `}>
              <tr className="text-center pb-4">
                <th className="pb-2 px-2 mx-2">ID</th>
                <th className="pb-2 px-2 mx-2">Products</th>
                <th className="pb-2 px-2 mx-2">Price</th>
                {/* <th className="pb-2 px-2 mx-2">Status</th> */}
              </tr>
              {data.products && data.products.length > 0 ? (
                data.products.map((item, index) => (
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
        )}
        {display && <ReturnProducts />}
        {!display && (
          <div className="d-flex mt-4">
            <h1 className="mb-3 me-auto"></h1>

            <div className="mt-2 ">
              <div className="dropdown">
                <button
                  className="btn btn-primary text-white dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select Status
                </button>
                <ul
                  className="dropdown-menu w-50"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <button
                    className="btn btn-success mb-2 mx-4"
                    type="submit"
                    onClick={handleReceived}
                  >
                    RECEIVED
                  </button>
                  <button
                    className="btn btn-success mx-4"
                    type="submit"
                    onClick={handleReturn}
                  >
                    RETURN
                  </button>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveredProducts;
