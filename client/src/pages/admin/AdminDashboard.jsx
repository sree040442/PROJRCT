import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getShipment, getShipmentById } from "../../api/ShipmentApi";
import { getUserById, updateUser } from "../../api/UserApi";
import BarChart from "../../components/BarChart";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PieChart from "../../components/PieChart";
import Table from "../../components/Table";
import BuyProducts from "./BuyProducts";
import ReturnProducts from "./ReturnProducts";

const AdminDashboard = () => {
  const [data, setData] = useState({
    username: "",
    first_name: "",
    email: "",
    // password: "",
  });

  const [details, setDetails] = useState([]);
  const [receipt, setReceipt] = useState([]);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);

  const navigate = useNavigate();

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

  const handleEdit = (item) => {
    const getUser = async () => {
      try {
        setVisible(true);
        const res = await getUserById(item.id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(data);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/addUser");
  };

  const handleReceipt = (item) => {
    setVisible(false);
    const getUser = async () => {
      try {
        const res = await getShipmentById(item.id);
        setReceipt(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  };

  return (
    <>
      <div style={{ backgroundColor: "rgb(230 238 245)" }}>
        <Navbar />
        <div className="container my-5 ">
          <div className="row py-5">
            <div className="col-5 ">
              <div className="d-flex">
                <h1 className="mb-3 mx-auto">Pie Chart</h1>
              </div>
              <div>
                <PieChart details={details} />
              </div>
            </div>
            <div className="col-1 "></div>
            <div className="col-6">
              <div className="d-flex">
                <h1 className="mb-3 mx-auto">Bar Chart</h1>
              </div>
              <div>
                <BarChart details={details} />
              </div>
            </div>
          </div>
        </div>

        {visible ? (
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
                    Edit User
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
                    <div className="col-md-6">
                      <label htmlFor="inputUsername4" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputName4" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName4"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </div> */}
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
        ) : (
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
                    Payment Receipt
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="inputUsername4" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputUsername4"
                        name="name"
                        value={receipt.name}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputName4" className="form-label">
                        Payment Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName4"
                        name="payment_amount"
                        value={receipt.payment_amount}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">
                        payment_date
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        name="payment_date"
                        value={moment(receipt.payment_date)
                          .utc()
                          .format("YYYY/MM/DD")}
                        disabled
                      />
                    </div>
                    {/* <div className="d-grid gap-2">
                    <button
                      className="btn btn-success w-50 mx-auto"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      Done
                    </button>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container my-3">
          <div className="row">
            <div className="col-6">
              <div className="container my-4">
                <div className="d-flex">
                  <h1 className="mb-3 me-auto">All USERS</h1>
                  <div>
                    <button
                      className="btn btn-success mx-5 mt-3"
                      type="submit"
                      onClick={handleClick}
                    >
                      ADD
                    </button>
                  </div>
                </div>
                <div className="card pt-3 px-3">
                  <Table
                    endPoint="/users/"
                    columns={["id", "username", "first_name", "email"]}
                    editCb={(item) => handleEdit(item)}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="container-fluid mx-auto my-4">
                <div className="d-flex">
                  <h1 className="mb-3 me-auto">Shipping Details</h1>
                  {/* <div>
                  <button
                    className="btn btn-success mx-5 mt-3"
                    type="submit"
                    onClick={handleClick}
                  >
                    ADD
                  </button>
                </div> */}
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
                      "current_location",
                      "from_location",
                      "to_location",
                      "payment_amount",
                    ]}
                    // editCb={(item) => handleEdit(item)}
                    isDelete={false}
                    // receiptCb={(item) => handleReceipt(item)}
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="container my-4">
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
                {!display && <div className="card pt-3 px-3 mt-3">
                  <BuyProducts />
                </div>}

                {display && <div className="card pt-3 px-3 mt-3">
                  <ReturnProducts />
                </div>}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
