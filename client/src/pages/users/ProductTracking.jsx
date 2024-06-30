import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import Pagination from "../../components/Pagination";
import { getPayment, getPaymentById } from "../../api/PaymentApi";
import { getUserById } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
import { getShipmentById } from "../../api/ShipmentApi";
import "../../App.css";
import { FaShoppingCart, FaSlidersH } from "react-icons/fa";
import { RiShip2Fill } from "react-icons/ri";
import { TbPackgeExport } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("token"));

const ProductTracking = () => {
  const [isLoding, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getPayment();
      for (let i of response.data) {
        const user = await getUserById(i.user);
        const shipment = await getShipmentById(i.shipment);

        i.user = user.data;
        i.shipment = shipment.data;
      }
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let item = [];
  for (let i of data) {
    if (i.user.id === user.id) {
      item.push(i);
    }
  }
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = item.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(item.length / recordsPerPage);

  // const handleToggle = () => {
  //   setVisible(false);
  // };

  return (
    <>
      <div className="card table-responsive mx-5 py-3 my-3">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Ship Name</th>
            <th className="pb-2 px-2 mx-2">Current Location</th>
            <th className="pb-2 px-2 mx-2">From Location</th>
            <th className="pb-2 px-2 mx-2">To Location</th>
            <th className="pb-2 px-2">Date</th>
            <th className="pb-2 px-2">Estimated Date</th>
          </tr>
          {isLoding ? (
            <tr>
              <td colSpan={8} className="text-center mt-5 pt-5 h2">
                Loading...
              </td>
            </tr>
          ) : currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center py-2">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td className="text-center py-2">{item.shipment.name}</td>
                <td className="text-center py-2">
                  {item.shipment.current_location}
                </td>
                <td className="text-center py-2">
                  {item.shipment.from_location}
                </td>
                <td className="text-center py-2">
                  {item.shipment.to_location}
                </td>
                <td className="text-center py-2">
                  {moment(item.date).utc().format("YYYY/MM/DD")}
                </td>
                <td className="text-center py-2">
                  {moment(item.shipment.estimated_date)
                    .utc()
                    .format("YYYY/MM/DD")}
                </td>
                {/* <td className="text-center py-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/track/${item.id}`)}
                        className="btn btn-success bg-success"
                      >
                        Track Orders
                      </button>
                    </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <th className="text-center pt-4 fs-3" colspan="10">
                No Details To Display
              </th>
            </tr>
          )}
        </table>
        <div className="d-flex">
          <h1 className="me-auto"></h1>
          <div className={"mx-5 pt-2"}>
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTracking;
