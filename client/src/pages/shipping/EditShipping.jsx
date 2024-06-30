import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  addShipment,
  getShipmentById,
  updateShipment,
} from "../../api/ShipmentApi";
import { getUser } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
const userID = JSON.parse(localStorage.getItem("token"));

const EditShipping = () => {
  const [data, setData] = useState({
    name: "",
    condition: "",
    current_location: "",
    to_location: "",
    from_location: "",
    description: "",
    payment_amount: "",
    user: userID.id,
    estimated_date: "",
    date: "",
  });

  const status = ["Pending", "In Progress", "Completed"];
  const [deliveryBoy, setDeliveryBoy] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getAllDeliveryBoy = async () => {
    try {
      const res = await getUser();
      let item = [];
      for (let i of res.data) {
        if (i.groups == 4) {
          item.push(i);
        }
      }

      setDeliveryBoy(item);
    } catch (error) {
      console.log(error);
    }
  };

  const getShipment = async () => {
    try {
      const res = await getShipmentById(id);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDeliveryBoy();
    getShipment();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateShipment(data);
      navigate("/shipping");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{ backgroundColor: "rgb(230 238 245)" }}>
        <Navbar />
        <div className="container mt-5 py-5">
          <div className="card mx-auto w-50">
            <div className="card-header">
              <h1>ADD Shipping Details</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label for="inputName4" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName4"
                    placeholder="Enter Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6" hidden>
                  <label htmlFor="inputName4" className="form-label" hidden>
                    User
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername4"
                    placeholder="Enter  Current Location"
                    name="user"
                    value={(data.user = userID.id)}
                    onChange={handleChange}
                    hidden
                  />
                  {/* {errors && errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )} */}
                </div>
                <div className="col-md-6">
                  <label for="inputLocation" className="form-label">
                    Condition
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="condition"
                    value={data.condition}
                    onChange={handleChange}
                  >
                    <option defaultValue>Condition</option>
                    <option>Good</option>
                    <option>Damaged</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputestimated_date" className="form-label">
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputestimated_date"
                    placeholder="Date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                  />
                  {/* {errors && errors.date && (
                    <span className="text-danger">{errors.date}</span>
                  )} */}
                </div>
                <div className="col-md-6">
                  <label for="inputUsername4" className="form-label">
                    Current Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername4"
                    placeholder="Enter  Current Location"
                    name="current_location"
                    value={data.current_location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputfromlocation4" className="form-label">
                    From Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputfromlocation4"
                    placeholder="Enter  From Location"
                    name="from_location"
                    value={data.from_location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputtolocation4" className="form-label">
                    To Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtolocation4"
                    placeholder="Enter To Location"
                    name="to_location"
                    value={data.to_location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputpaymentAmount4" className="form-label">
                    Payment Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputpaymentAmount4"
                    placeholder="Payment Amount"
                    name="payment_amount"
                    value={data.payment_amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputestimated_date" className="form-label">
                    Estimated Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputestimated_date"
                    placeholder="Estimated Date"
                    name="estimated_date"
                    value={data.estimated_date}
                    onChange={handleChange}
                  />
                  {/* {errors && errors.estimated_date && (
                    <span className="text-danger">{errors.estimated_date}</span>
                  )} */}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputestimated_date" className="form-label">
                    Delivery Boy
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="delivery_boy_assigned"
                    value={data.delivery_boy_assigned}
                    onChange={handleChange}
                  >
                    <option defaultValue>Delivery Boy</option>
                    {deliveryBoy &&
                      deliveryBoy.map((delivery, index) => {
                        return (
                          <option key={index} value={delivery.id}>
                            {delivery.first_name}
                          </option>
                        );
                      })}
                  </select>
                  {/* {errors && errors.delivery_boy_assigned && (
                    <span className="text-danger">
                      {errors.delivery_boy_assigned}
                    </span>
                  )} */}
                </div>
                <div className="col-12">
                  <label for="inputdescription4" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdescription4"
                    placeholder="Enter Description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success w-50 mx-auto"
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
    </>
  );
};

export default EditShipping;
