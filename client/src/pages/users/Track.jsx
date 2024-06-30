import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import { getPayment, getPaymentById } from "../../api/PaymentApi";
import { getUserById } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
import { getShipmentById } from "../../api/ShipmentApi";
import "../../App.css";
import { FaShoppingCart } from "react-icons/fa";
import { RiShip2Fill } from "react-icons/ri";
import { TbPackgeExport } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import OrderedProducts from "./OrderedProducts";
import { getProductsById } from "../../api/ProductsApi";

const userID = JSON.parse(localStorage.getItem("token"));

const Track = () => {
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [payment, setPayment] = useState("");
  const [shipped, setShipped] = useState("");
  const [enroute, setEnroute] = useState("");
  const [delivered, setDelivered] = useState("");

  const [trackRecord, setTrackRecord] = useState("");
  const [orderId, setOrderId] = useState();
  const navigate = useNavigate();

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const response = await getPaymentById(orderId);
      const user = await getUserById(response.data.user);
      const shipment = await getShipmentById(response.data.shipment);
      let items = [];
      for (let i of response.data.products) {
        const res = await getProductsById(i);
        items.push(res.data);
      }
      response.data.user = user.data;
      response.data.shipment = shipment.data;
      response.data.products = items;
      setData(response.data);
      if (response.data.user.id == userID.id) {
        if (orderId == response.data.id) {
          setVisible(true);

          const current_date = moment(new Date()).utc().format("YYYY/MM/DD");
          if (response.data.date < current_date) {
            setPayment("completed");
            setTrackRecord("Order Confirmed");
            if (
              moment(response.data.shipment.date).utc().format("YYYY/MM/DD") <=
              current_date
            ) {
              setShipped("completed");
              setEnroute("completed");
              setTrackRecord("Order is On the way");
            }
            if (
              moment(response.data.shipment.estimated_date)
                .utc()
                .format("YYYY/MM/DD") <= current_date
            ) {
              setDelivered("completed");
              setTrackRecord("Order Delivered");
            }
          }
        } else {
          toast.error("Invalid OrderID");
        }
      } else {
        toast.error("Invalid OrderID");
      }
    } catch (error) {
      toast.error("Invalid OrderID");
    }
  };

  // const handleToggle = () => {
  //   navigate("/orderedProduct");
  //   setVisible(false);
  // };

  return (
    <>
      <div
        className="mt-3 pt-5"
        style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}
      >
        <Navbar />
        <div className="mt-3 mx-5">
          <div>
            {visible && (
              <div className=" padding-bottom-3x mb-1">
                <div class="card mb-3">
                  <div class="p-4 text-center text-white text-lg bg-dark rounded-top">
                    <h2 className="text-light">Product Tracking</h2>

                    <span class="text-uppercase">Tracking Order No - </span>
                    <span class="text-medium">{data.id}</span>
                  </div>
                  <div
                    className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2"
                    style={{ backgroundColor: "#f5f5f5" }}
                  >
                    <div className="w-100 text-center py-1 px-2">
                      <span className="text-medium">Ship Name : </span>
                      {data ? data.shipment.name : ""}
                    </div>
                    <div className="w-100 text-center py-1 px-2">
                      <span className="text-medium">Status:</span>{" "}
                      <span className="text-success">{trackRecord}</span>
                    </div>
                    <div className="w-100 text-center py-1 px-2">
                      <span className="text-medium">Expected Date : </span>
                      {data
                        ? moment(data.shipment.estimated_date)
                            .utc()
                            .format("YYYY/MM/DD")
                        : ""}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                      <div className={`step ${payment}`}>
                        <div className="step-icon-wrap">
                          <div className="step-icon">
                            <FaShoppingCart
                              // color="white"
                              fontSize="30px"
                              className="mb-3"
                            />
                          </div>
                        </div>
                        <h4 className="step-title">Confirmed Order</h4>
                      </div>

                      <div className={`step ${shipped}`}>
                        <div className="step-icon-wrap">
                          <div className="step-icon">
                            <TbPackgeExport
                              // color="white"
                              fontSize="30px"
                              className="mb-3"
                            />
                          </div>
                        </div>
                        <h4 className="step-title">Order Shipped</h4>
                      </div>
                      <div className={`step ${enroute}`}>
                        <div className="step-icon-wrap">
                          <div className="step-icon">
                            <RiShip2Fill
                              // color="white"
                              fontSize="30px"
                              className="mb-3"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="step-title">Product En Route </h4>
                          <h5 className="text-success">
                            {data.shipment.current_location}
                          </h5>
                        </div>
                      </div>
                      <div className={`step ${delivered}`}>
                        <div className="step-icon-wrap">
                          <div className="step-icon">
                            <AiFillHome
                              // color="white"
                              fontSize="30px"
                              className="mb-3"
                            />
                          </div>
                        </div>
                        <h4 className="step-title">Product Delivered</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                  {/* <div className="custom-control custom-checkbox mr-3">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    id="notify_me"
                    checked=""
                  />
                  <label className="custom-control-label" for="notify_me">
                    Notify me when order is delivered
                  </label>
                </div> */}
                  {/* <div className="text-left text-sm-right">
                    <btn
                      className="btn btn-success btn-rounded btn-sm"
                      onClick={handleToggle}
                    >
                      View Order Details
                    </btn>
                  </div> */}

                  {/* <div>
                    <OrderedProducts data={data} />
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>

        {!visible && (
          <div className="card mx-5 py-4 w-50 mx-auto">
            <div className="row text-center mb-3">
              <h3
                className="w-75 mx-auto text-white py-2"
                style={{ backgroundColor: "#053c8d", borderRadius: "50px" }}
              >
                Track Your Shipment
              </h3>
            </div>
            <div className=" mx-5">
              <label for="inputTrack5" className="form-label">
                Enter Your Tracking Id : -
              </label>
              <form onSubmit={handleTrack}>
                <div className="d-flex ">
                  <input
                    type="text"
                    className="form-control mx-3"
                    placeholder="Enter Your Tracking Id"
                    aria-label="Enter Your Tracking Id"
                    aria-describedby="button-addon2"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />

                  <button
                    className="btn text-white "
                    style={{ backgroundColor: "#053c8d", borderRadius: "50px" }}
                    type="submit"
                    id="button-addon2"
                  >
                    Track
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Track;
