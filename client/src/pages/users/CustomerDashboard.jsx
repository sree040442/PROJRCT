import React, { useEffect, useState } from "react";
import { getShipment } from "../../api/ShipmentApi";
import BarChart from "../../components/BarChart";
import Navbar from "../../components/Navbar";
import PieChart from "../../components/PieChart";
import Table from "../../components/Table";
import AllReturnedProducts from "./AllReturnedProducts";
import OrderedProducts from "./OrderedProducts";
import ProductTracking from "./ProductTracking";

const CustomerDashboard = () => {
  const [details, setDetails] = useState([]);
  const [display, setDisplay] = useState(false);

  const getShipping = async () => {
    try {
      const res = await getShipment();
      setDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShipping();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "rgb(230 238 245)" }}>
        <Navbar />

        <div className="mt-5 pb-3">
          <div className="container">
            <div className="row pt-5">
              <div className="col-5 ">
                <div className="d-flex">
                  <h1 className="mb-3 mx-auto">Pie Chart</h1>
                </div>
                <div>
                  <PieChart details={details} />
                </div>
              </div>
              {/* <div className="col-1 "></div>
              <div className="col-6">
                <div className="d-flex">
                  <h1 className="mb-3 mx-auto">Bar Chart</h1>
                </div>
                <div>
                  <BarChart details={details} />
                </div>
              </div> */}
              <div className="col-7">
                <div className="container-fluid mx-auto ">
                  <div className="d-flex">
                    <h1 className="mb-3 me-auto">Shipping Details</h1>
                  </div>
                  <div className="card px-3 pt-3">
                    <Table
                      endPoint="/shipments/"
                      columns={[
                        "id",
                        "name",
                        "date",
                        "condition",
                        // "description",
                        //   "current_location",
                        "from_location",
                        "to_location",
                        "payment_amount",
                        "estimated_date",
                      ]}
                      // editCb={(item) => handleEdit(item)}
                      isDelete={false}
                      // receiptCb={(item) => handleReceipt(item)}
                    />
                  </div>
                </div>
              </div>
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
            <div>
              {!display && <OrderedProducts />}
              {display && <AllReturnedProducts />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
