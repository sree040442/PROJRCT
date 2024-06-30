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
import DeliveryOrderedProducts from "./DeliveryOrderedProducts";
import DeliveryReturnProducts from "./DeliveryReturnProducts";
const user1 = JSON.parse(localStorage.getItem("token"));

const DeliveryBoy = () => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <div
        style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}
        className="pb-2"
      >
        <Navbar />
        <div className="container mx-auto my-5 pt-3">
          <div className="d-flex mt-4">
            <h1 className="mb-3 me-auto">Delivery Products</h1>
          </div>

          <div className="container mt-4">
            <div className="row">
              <div className="col-3">
                <button
                  className="btn btn-success mx-5"
                  type="button"
                  onClick={() => setDisplay(false)}
                >
                  Ordered Products
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => setDisplay(true)}
                >
                  Return Products
                </button>
              </div>
            </div>
          </div>
          {!display && <DeliveryOrderedProducts />}

          {display && <DeliveryReturnProducts />}
        </div>
      </div>
    </>
  );
};

export default DeliveryBoy;
