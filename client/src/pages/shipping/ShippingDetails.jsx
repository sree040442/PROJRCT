import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getShipmentById, updateShipment } from "../../api/ShipmentApi";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import Validate from "../../validation/ValidatePayment";
const user = JSON.parse(localStorage.getItem("token"));

export const ShippingDetails = () => {
  const [data, setData] = useState({
    current_location: "",
  });

  const [payment, setPayment] = useState({
    payment_done: "",
    payment_date: "",

    card_No: "",
    card_Name: "",
    expiry_date: "",
    cvv: "",
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/editUser/${item.id}`);
  };

  const handleClick = () => {
    navigate("/addShipping");
  };

  let role = "";
  for (let i of user.groups) {
    role = i;
  }

  const handleUpdate = (item) => {
    const getUser = async () => {
      try {
        const res = await getShipmentById(item.id);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateShipment(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    // const newErrors = Validate(payment);
    // setErrors(newErrors);
    // if (!Object.keys(newErrors).length) {
    try {
      await updateShipment(payment);
    } catch (error) {
      console.log(error);
    }
    // }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}
        className="pb-2"
      >
        <Navbar />
        {role === 3 && (
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content w-75 mx-auto">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Location
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                      <label htmlFor="inputUsername4" className="form-label">
                        Current Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="current_location"
                        value={data.current_location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-success w-50 mx-auto"
                        data-bs-dismiss="modal"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto my-5 pt-3">
          <div className="d-flex mt-4">
            <h1 className="mb-3 me-auto">
              {role === 2
                ? "Ship Details"
                : role === 5
                ? "Delivery Details"
                : "Tracking Details"}
            </h1>
            {/* <div className="w-50 pt-2 me-5">
            <input
              className="form-control w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
          </div> */}
            {role === 2 && (
              <div>
                <button
                  className="btn btn-success mx-5 mt-3"
                  type="submit"
                  onClick={handleClick}
                >
                  ADD
                </button>
              </div>
            )}
          </div>
          <div className="card px-3 py-3">
            {role === 3 && (
              <Table
                endPoint="/shipments/"
                columns={[
                  "id",
                  "name",
                  "date",
                  "condition",
                  // "description",
                  "current_location",
                  "from_location",
                  "to_location",
                  "payment_amount",
                  "estimated_date",
                ]}
                editCb={(item) => handleUpdate(item)}
                isDelete={false}
              />
            )}
            {role === 2 && (
              <Table
                endPoint="/shipments/"
                columns={[
                  "id",
                  "name",
                  "date",
                  "condition",
                  // "description",
                  "current_location",
                  "from_location",
                  "to_location",
                  "payment_amount",
                  "estimated_date",
                ]}
                editCb={(item) => handleEdit(item)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
