import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CartContext from "../../utils/CartContext";
import { FaRupeeSign } from "react-icons/fa";
import { addPayment } from "../../api/PaymentApi";
import { getShipment, getShipmentById } from "../../api/ShipmentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Validate from "../../validation/ValidatePayment";
import axios from "axios";
import moment from "moment/moment";
const user = JSON.parse(localStorage.getItem("token"));

const Payment = () => {
  const { total, cartItems, clearCart } = useContext(CartContext);
  const [payment, setPayment] = useState({
    id: "",
    payment_done: "",
    payment_date: "",

    card_No: "",
    card_Name: "",
    expiry_date: "",
    cvv: "",
  });

  const [data, setData] = useState({
    quantity: "",
    total_price: "",
    user: user.id,
    shipment: "",
    products: "",
  });

  const [errors, setErrors] = useState([]);
  const [errorsShip, setErrorsShip] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [display, setDisplay] = useState(false);
  const [ship, setShip] = useState(0);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handlePayChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const getAllShipment = async () => {
    try {
      const res = await getShipment();
      setShipments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllShipment();
  }, []);

  let shipmentId = "";
  for (let i of shipments) {
    if (i.user === user.id) {
      shipmentId = i.user;
    }
  }
  const getShip = async () => {
    const res = await getShipmentById(data.shipment);
    setShip(res.data.payment_amount);
  };

  useEffect(() => {
    getShip();
  }, [data.shipment]);

  function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  const sendMailToUser = async () => {
    try {
      const body = {
        Recipients: [
          {
            Email: user.email,
          },
        ],
        Content: {
          Body: [
            {
              ContentType: "HTML",
              Content: `Order ID has been send on Your Email...OTP is ${generateOTP()}`,
              Charset: "string",
            },
          ],
          From: "cse.takeoff@gmail.com",
          Subject: "Order ID Send On Mail",
        },
      };

      const headers = {
        "X-ElasticEmail-ApiKey":
          " FCE09D54A8F56F09716DC8FB3550636773E71D1219444F7EF87613C6E8B29E58621E031BBCB92D5D51ECBC63E0DA7BE9",
      };

      await axios.post(`https://api.elasticemail.com/v4/emails`, body, {
        headers: headers,
      });

      toast.success(`OTP has been sent to your mail.`, {});
      toast.success(`Order Id has been sent`, {});
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {});
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(payment);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const item = [];
        for (let i of cartItems) {
          item.push(i.id);
        }
        data.products = item;
        sendMailToUser();

        const res = await addPayment(data);
        navigate("/viewProducts");
        clearCart();
        setDisplay(false);
        // toast.success("Order Id has been sent");
        toast(
          (t) => (
            <span>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Order ID</p>
                <p className="mt-1 text-sm text-gray-500">
                  Your Order Id is :
                  <span className="text-info">{res.data.id}</span>
                </p>
              </div>
              <button
                className="btn btn-success"
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
            </span>
          ),
          { duration: 7000 }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const disablePastMonth = () => {
  //   const today = new Date();
  //   const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   const yyyy = today.getFullYear();
  //   return yyyy + "-" + mm;
  // };

  const handleClick = () => {
    if (data.shipment === "") {
      setErrorsShip("Select the Ship Name");
    } else {
      setDisplay(true);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "rgb(237 238 241)", height: "100vh" }}>
        <Navbar />

        <div className="container mt-5 pt-3">
          <div className="row pt-5">
            <div className="col-6">
              <div className=" card py-3 w-75">
                <div className="h4 mx-5 pb-3">
                  Hello,
                  <span className="px-3 h3 text-info">
                    {user.first_name.toUpperCase()}
                  </span>
                </div>
                <div className="mx-3">
                  <div className="h4">
                    Total Items :{" "}
                    <span style={{ color: "#0d6efd" }}>{cartItems.length}</span>
                  </div>
                  <div className="h4">
                    Total Items Price :{" "}
                    <span style={{ color: "#0d6efd" }}>
                      <FaRupeeSign fontSize="20px" />
                      {total} /-
                    </span>
                  </div>
                </div>
                <div className="mx-3">
                  <div className="h4">
                    Ship Price :{" "}
                    <span style={{ color: "#0d6efd" }}>
                      <FaRupeeSign fontSize="20px" />
                      {ship > 0 ? ship : 0} /-
                    </span>
                  </div>
                  <div className="h4">
                    Total Price :{" "}
                    <span style={{ color: "#0d6efd" }}>
                      <FaRupeeSign fontSize="20px" />
                      {ship > 0 ? parseInt(total) + ship : total} /-
                    </span>
                  </div>
                </div>
                <div className="mx-3 mt-2 d-flex">
                  <div className="h4 text-danger me-2 mt-2">Select Ship: </div>
                  <div className="h4">
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      name="shipment"
                      value={data.shipment}
                      onChange={handleChange}
                    >
                      <option defaultValue>All Ships</option>
                      {shipments.length > 0 &&
                        shipments.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    {errorsShip && errorsShip && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "20px" }}
                      >
                        {errorsShip}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mx-auto">
                  <button
                    className="btn btn-success mt-3 "
                    // data-bs-toggle="modal"
                    // data-bs-target="#exampleModal"
                    onClick={handleClick}
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              {display && (
                <div className="card px-3 pb-3 w-75">
                  <form onSubmit={handlePaymentSubmit} className="row g-3">
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="id"
                        value={(payment.id = shipmentId)}
                        onChange={handlePayChange}
                        hidden
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="payment_done"
                        value={(payment.payment_done = true)}
                        onChange={handlePayChange}
                        hidden
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="payment_date"
                        value={(payment.payment_date = new Date())}
                        onChange={handlePayChange}
                        hidden
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="quantity"
                        value={(data.quantity = cartItems.length)}
                        onChange={handleChange}
                        hidden
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="total_price"
                        value={(data.total_price = parseInt(total) + ship)}
                        onChange={handleChange}
                        hidden
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="user"
                        value={(data.user = user.id)}
                        onChange={handleChange}
                        hidden
                      />
                    </div>
                    <div className="col-8">
                      <label htmlFor="inputUsername4" className="form-label">
                        Card Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="card_Name"
                        value={payment.card_Name}
                        onChange={handlePayChange}
                      />
                      {errors && errors.card_Name && (
                        <span className="text-danger">{errors.card_Name}</span>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="inputUsername4" className="form-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="card_No"
                        value={payment.card_No}
                        onChange={handlePayChange}
                      />
                      {errors && errors.card_No && (
                        <span className="text-danger">{errors.card_No}</span>
                      )}
                    </div>
                    <div className="col-6">
                      <label htmlFor="inputUsername4" className="form-label">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputUsername4"
                        name="expiry_date"
                        min={moment(new Date()).utc().format("YYYY-MM-DD")}
                        value={payment.expiry_date}
                        onChange={handlePayChange}
                      />
                      {errors && errors.expiry_date && (
                        <span className="text-danger">
                          {errors.expiry_date}
                        </span>
                      )}
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                      <label htmlFor="inputUsername4" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="cvv"
                        value={payment.cvv}
                        onChange={handlePayChange}
                      />
                      {errors && errors.cvv && (
                        <span className="text-danger">{errors.cvv}</span>
                      )}
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-success w-50 mx-auto"
                        type="submit"
                      >
                        PAYMENT
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
