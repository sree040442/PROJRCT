import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getGroupById } from "../api/GroupApi";
import { loginUser } from "../api/UserApi";
import Validate from "../validation/ValidateLogin";
const user = JSON.parse(localStorage.getItem("token"));

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

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
        await loginUser(data, (user) => {
          localStorage.setItem("token", JSON.stringify(user));
          if (user.is_superuser === false) {
            let role = "";
            for (let i of user.groups) {
              role = i;
            }
            if (role === 5) {
              navigate("/dashboard");
              window.location.assign("/dashboard");
            } else if (role === 4) {
              navigate("/delivery");
              window.location.assign("/delivery");
            } else {
              navigate("/shipping");
              window.location.assign("/shipping");
            }
          } else if (user.is_superuser === true) {
            navigate("/");
            window.location.assign("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          // backgroundImage: `url('https://storage.googleapis.com/twg-content/original_images/sustainability-thumbnail.jpg')`,
          // backgroundPosition: "center",
          // backgroundRepeat: "revert",
          // backgroundSize: "cover",
          backgroundColor:"Highlight"
        }}
      >
      <div>
        <img
          src="/login1.png"
          className="px-5"
          alt="logo"
          style={{ height: "3rem" ,marginTop:"2rem"}}
        />
      </div>
      <div className="container w-75  py-5">
        <div className="row">
          <div className="col-7 pt-3">
            <img
              src="https://storage.googleapis.com/twg-content/original_images/sustainability-thumbnail.jpg"
              className="img-fluid"
              alt="..."
              style={{ height: "400px",borderRadius:"100px" }}
            />
          </div>
          <div className="col-4 pt-3">
            <div className="card  mx-auto">
              <div className="card-header d-flex">
                {/* <img
                    src="/shipyard_horizontal.png"
                    className="img-thumbnail w-50 me-4"
                    alt="logo"
                    style={{ height: "3.5rem" }}
                  /> */}
                <h1 className="pt-3">Login</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* {errors && (errors.email ? toast.error(errors.email) : toast.error(errors.password))} */}
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="Enter Email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                    {errors && errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Enter Password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    {errors && errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-success" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div className="d-grid gap-2 w-25 mx-3 mt-2 float-end">
                  <button
                    className="btn btn-info text-white"
                    type="submit"
                    onClick={() => {
                      navigate("/registerUsers");
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
