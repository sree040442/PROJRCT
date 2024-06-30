import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentById } from "../../api/PaymentApi";
import { getProductsById } from "../../api/ProductsApi";
import { getShipmentById } from "../../api/ShipmentApi";
import { getUserById } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
import DeliveryBoyTrack from "./DeliveryBoyTrack";

const ViewDelivery = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

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
  }, []);

  return (
    <div
      style={{ backgroundColor: "rgb(230 238 245)", }}
      className="py-4"
    >
      <Navbar />
      <div className="container mx-auto my-5 pt-3">
        <DeliveryBoyTrack id={id} />
        <div className="d-flex mt-4">
          <h1 className="mb-3 mx-auto">Delivery Products</h1>
          {/* <div className="w-50 pt-2 me-5">
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
      </div> */}
          {/* {role === 2 && (
          <div>
            <button
              className="btn btn-success mx-5 mt-3"
              type="submit"
              onClick={handleClick}
            >
              ADD
            </button>
          </div>
        )} */}
        </div>
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
      </div>
    </div>
  );
};

export default ViewDelivery;
