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

const DeliveryOrderedProducts = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [isLoding, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
        console.log(i,"ggg");
        const shipment = await getShipmentById(i.shipment);

        i.user = user.data;
        i.shipment = shipment.data;

        if (i.shipment.delivery_boy_assigned === user1.id) {
          item.push(i);
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

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <>
      <div className="card table-responsive mx-5 py-3 my-3">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Ship Name</th>
            <th className="pb-2 px-2 mx-2">Customer Name</th>
            <th className="pb-2 px-2 mx-2">Customer Email</th>
            <th className="pb-2 px-2 mx-2">Price</th>
            <th className="pb-2 px-2 mx-2">Address</th>
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
                <td className="text-center py-2">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td className="text-center py-2">{item.shipment.name}</td>
                <td className="text-center py-2">{item.user.first_name}</td>
                <td className="text-center py-2">{item.user.email}</td>
                <td className="text-center py-2">{item.total_price}</td>

                <td className="text-center py-2">
                  {item.shipment.to_location}
                </td>
                {/* <td className="text-center py-2">
                  {item.status}
                </td> */}
                <td className="text-center py-2">
                  {item.status === "Pending" ? (
                    <button
                      className="btn btn-primary bg-primary mx-2 "
                      onClick={() => navigate(`/delivery/${item.id}`)}
                    >
                      View
                    </button>
                  ) : (
                    <span
                      className={
                        item.status === "Received"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {item.status}
                    </span>
                  )}
                </td>
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

export default DeliveryOrderedProducts;
