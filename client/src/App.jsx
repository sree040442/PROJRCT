import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProducts from "./pages/admin/AddProducts";
import AddUsers from "./pages/admin/AddUsers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminViewProducts from "./pages/admin/AdminViewProducts";
import ReturnProductReview from "./pages/admin/ReturnProductReview";
import SingleProduct from "./pages/admin/SingleProduct";
import DeliveryBoy from "./pages/deliveryBoy/DeliveryBoy";
import DeliveryBoyTrack from "./pages/deliveryBoy/DeliveryBoyTrack";
import ViewDelivery from "./pages/deliveryBoy/ViewDelivery";
// import "./App.css";
import Login from "./pages/Login";
import AddShipping from "./pages/shipping/AddShipping";
import EditShipping from "./pages/shipping/EditShipping";
import { ShippingDetails } from "./pages/shipping/ShippingDetails";
import Cart from "./pages/users/Cart";
import CustomerDashboard from "./pages/users/CustomerDashboard";
import DeliveredProducts from "./pages/users/DeliveredProducts";
import Payment from "./pages/users/Payment";
import RegisterUsers from "./pages/users/RegisterUsers";
import ReturnProducts from "./pages/users/ReturnProducts";
import Track from "./pages/users/Track";
import ViewProduct from "./pages/users/ViewProduct";
import ViewProducts from "./pages/users/ViewProducts";
import CartContext from "./utils/CartContext";

const user = JSON.parse(localStorage.getItem("token"));
const loginPageUrl = "/";
const timeoutInMs = 60 * 1000; // 1 minute

function App() {
  const [role, setRole] = useState("");
  const { cartItems } = useContext(CartContext);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (user !== null) {
      for (let i of user.groups) {
        setRole(i);
      }
    }
  }, [user]);

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      if (isActive) {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logout, timeoutInMs);
      }
    };

    const logout = () => {
      // Redirect to the login page
      localStorage.removeItem("token"); // removing the token from local storage and redirecting to login page
      window.location.href = loginPageUrl;
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Set up the initial timer
    resetTimer();

    // Clean up the event listeners when the component unmounts
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [isActive, timeoutInMs, history, loginPageUrl]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          {user && user.is_superuser ? (
            <Route exact path="/" element={<AdminDashboard />} />
          ) : (
            <Route exact path="/*" name="404 Page" element={<Login />} />
          )}
          {user && user.is_superuser && (
            <Route exact path="/addUser" element={<AddUsers />} />
          )}
          {user && user.is_superuser && (
            <Route exact path="/addProducts" element={<AddProducts />} />
          )}
          {user && user.is_superuser && (
            <Route exact path="/product/:id" element={<SingleProduct />} />
          )}
          {user && user.is_superuser && (
            <Route
              exact
              path="/viewAdminProducts"
              element={<AdminViewProducts />}
            />
          )}

          {user && user.is_superuser && (
            <Route
              exact
              path="/returnProducts/:id"
              element={<ReturnProductReview />}
            />
          )}

          {/* Ship Yard Users Shipping Details */}
          {user && user.is_superuser === false ? (
            <Route exact path="/shipping" element={<ShippingDetails />} />
          ) : (
            <Route exact path="/*" name="404 Page" element={<Login />} />
          )}
          {user && user.is_superuser === false && (
            <Route exact path="/addShipping" element={<AddShipping />} />
          )}
          {user && user.is_superuser === false && (
            <Route exact path="/editUser/:id" element={<EditShipping />} />
          )}
          {user && user.is_superuser === false && role === 5 && (
            <Route exact path="/dashboard" element={<CustomerDashboard />} />
          )}
          {user && user.is_superuser === false && role === 5 && (
            <Route exact path="/viewProducts" element={<ViewProducts />} />
          )}
          {user && user.is_superuser === false && role === 5 && (
            <Route exact path="/singleProduct/:id" element={<ViewProduct />} />
          )}
          {user && user.is_superuser === false && role === 5 && (
            <Route exact path="/cart" element={<Cart />} />
          )}
          {cartItems.length > 0 &&
            user &&
            user.is_superuser === false &&
            role === 5 && <Route exact path="/receipt" element={<Payment />} />}

          {user && user.is_superuser === false && role === 5 && (
            <Route exact path="/track" element={<Track />} />
          )}

          {user && user.is_superuser === false && role === 5 && (
            <Route
              exact
              path="/orderedProducts/:id"
              element={<DeliveredProducts />}
            />
          )}

          {user && user.is_superuser === false && role === 5 && (
            <Route
              exact
              path="/returnProducts/:id"
              element={<ReturnProducts />}
            />
          )}

          {/* Routes for Delivery Boy */}
          {user && user.is_superuser === false && role === 4 && (
            <Route exact path="/delivery" element={<DeliveryBoy />} />
          )}

          {user && user.is_superuser === false && role === 4 && (
            <Route exact path="/delivery/:id" element={<ViewDelivery />} />
          )}

          {user && user.is_superuser === false && role === 4 && (
            <Route
              exact
              path="/delivery/track"
              element={<DeliveryBoyTrack />}
            />
          )}

          <Route exact path="/registerUsers" element={<RegisterUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
