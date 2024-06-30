import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "../utils/CartContext";

const user = JSON.parse(localStorage.getItem("token"));

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  let role = "";
  for (let i of user.groups) {
    role = i;
  }

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
    window.location.assign("/login");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#8a8b8d" }}
      >
        <div className="container-fluid">
          <img
            src="/login1.png"
            className="px-3"
            alt="logo"
            style={{ height: "2.6rem", borderRadius: "2rem", width:"100px", height:"70px" }}
          />
          {/* <a className="navbar-brand" href="#">
            Ship Yard
          </a> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {(role === 3|| role === 2) && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/shipping"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {role === 5 && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {role === 5 && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/viewProducts"
                  >
                    View Products
                  </NavLink>
                </li>
              )}
              {role === 5 && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/track "
                  >
                    TrackOrders
                  </NavLink>
                </li>
              )}
              {role === 4 && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/delivery"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user.is_superuser && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user.is_superuser && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/viewAdminProducts"
                  >
                    ViewProducts
                  </NavLink>
                </li>
              )}
            </ul>
            {role === 5 && (
              <NavLink
                to={"/cart"}
                className="btn btn-secondary border-0"
                style={{ backgroundColor: "#8a8b8d" }}
              >
                <FaShoppingCart color="white" fontSize="25px" />

                {cartItems.length > 0 && (
                  <span className="badge bg-secondary">{cartItems.length}</span>
                )}
              </NavLink>
            )}

            <div className="text-white mx-2">
              <button
                type="button"
                className="btn btn-info text-white"
                onClick={handleLogout}
              >
                {user ? user.username.toUpperCase() : ""}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

export const UserNavbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#8a8b8d" }}
      >
        <div className="container-fluid">
          <img
            src="/login1.png"
            className="px-3"
            alt="logo"
            style={{ height: "2.6rem", borderRadius: "2rem" }}
          />
          {/* <a className="navbar-brand" href="#">
            Ship Yard
          </a> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <div className="text-white mx-2">
              <button
                type="button"
                className="btn btn-info text-white"
                // onClick={handleLogout}
              >
                {/* {user ? user.username.toUpperCase() : ""} */} USERS
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
