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

const ReturnProducts = () => {
  const [data, setData] = useState([]);
  const [payment, setPayment] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChecked, setisChecked] = useState([]);

  const [returnProducts, setReturnProducts] = useState([]);

  const [reason, setReason] = useState({
    reason: "",
    return_products: "",
  });

  const handleChange = (e) => {
    setReason({
      ...reason,
      [e.target.name]: e.target.value,
    });
  };
  const getPayment = async () => {
    try {
      const res = await getPaymentById(id);
      setPayment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      let item = [];
      for (let i of isChecked) {
        const product = await getProductsById(i);
        item.push(product.data);
      }
      setReturnProducts({ products: item, payment: payment ? payment : "" });
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

  useEffect(() => {
    getProducts();
  }, [isChecked]);

  // const handleReceived = async () => {
  //   await updatePayment(id, { ...payment, status: "Received" });
  // };

  const handleClick = async (e, id) => {
    const { checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, id]);
    } else {
      setisChecked(isChecked.filter((e) => e !== id));
    }
  };

  const handleReturn = async (e) => {
    await updatePayment(id, {
      ...payment,
      reason: reason.reason,
      return_products: reason.return_products,
    });
    toast.success("Updated successfully");
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
              <form onSubmit={handleReturn}>
                <input
                  type="text"
                  name="return_products"
                  value={(reason.return_products = isChecked)}
                  onChange={handleChange}
                  hidden
                />
                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Return Reason
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="reason"
                    value={reason.reason}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="card table-responsive mx-5 py-3 my-3">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Products</th>
            <th className="pb-2 px-2 mx-2">Price</th>
            <th className="pb-2 px-2 mx-2">Status</th>
          </tr>
          {data.products && data.products.length > 0 ? (
            data.products.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center py-2">{index + 1}</td>
                <td className="text-center py-2">{item.name}</td>
                <td className="text-center py-2">{item.price}</td>
                <td className="text-center py-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onClick={(e) => {
                      handleClick(e, item.id);
                    }}
                  />
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
      </div>

      {/* {isChecked && isChecked.length > 0 && (
        <div className="card table-responsive mx-5 py-3 my-3">
          <table className={`table table-striped table-hover `}>
            <tr className="text-center pb-4">
              <th className="pb-2 px-2 mx-2">ID</th>
              <th className="pb-2 px-2 mx-2">Products</th>
              <th className="pb-2 px-2 mx-2">Reason</th>
              <th className="pb-2 px-2 mx-2">Status</th>
            </tr>
            {isChecked && returnProducts.length > 0 ? (
              returnProducts.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center py-2">{index + 1}</td>
                  <td className="text-center py-2">{item.name}</td>
                  <td className="text-center py-2">{item.reason}</td>
                  <td className="text-center py-2">{item.return_status}</td>

                  <td className="text-center py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      onClick={(e) => {
                        handleClick(e, item.id);
                      }}
                    />
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
        </div>
      )} */}

      <div className="d-flex mt-4">
        <h1 className="mb-3 me-auto"></h1>

        <div className="mt-2 ">
          <button
            className="btn btn-success mb-2 mx-4"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            // onClick={handleReturn}
          >
            RETURN
          </button>
        </div>
      </div>
    </>
  );
};

export default ReturnProducts;
