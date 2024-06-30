import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroup } from "../../api/GroupApi";
import { addProducts } from "../../api/ProductsApi";
import { getUser } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
import Validate from "../../validation/ValidateProduct";

const AddProducts = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    user: 1,
    status: "",
  });

  const [image, setImage] = useState();

  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setImage((e.target.name = e.target.files[0]));
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("name", data.name);
      formdata.append("price", data.price);
      formdata.append("description", data.description);
      formdata.append("user", data.user);

      await addProducts(formdata);
      navigate("/viewAdminProducts");
    } catch (error) {
      console.log(error);
    }
    }
  };


  return (
    <>
      <div
        style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}
        className="pb-2"
      >
        <Navbar />
        <div className="container py-5">
          <div className="card mx-auto w-50 my-5">
            <div className="card-header">
              <h1>ADD Products</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputname4" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname4"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  {errors && errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPrice4" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPrice4"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                  />
                  {errors && errors.price && (
                    <span className="text-danger">{errors.price}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputimage4" className="form-label">
                    Image
                  </label>

                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                  />
                  {/* {errors && errors.image && (
                    <span className="text-danger">{errors.image}</span>
                  )} */}
                </div>
                <div className="col-6">
                  <label htmlFor="inputLocation" className="form-label" hidden>
                    Roles
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="user"
                    value={data.user}
                    onChange={handleChange}
                    hidden
                  >
                    <option selected>Users</option>
                    {user &&
                      user.map((user, index) => {
                        return (
                          <option key={index} value={(user.id = 25)}>
                            {user.first_name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="inputDescription4" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Description"
                    id="floatingTextarea"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors && errors.description && (
                    <span className="text-danger">{errors.description}</span>
                  )}
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success w-50 mx-auto"
                    type="submit"
                  >
                    Create
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

export default AddProducts;
