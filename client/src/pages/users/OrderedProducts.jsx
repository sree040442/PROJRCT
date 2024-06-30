import moment from "moment/moment";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getPayment } from "../../api/PaymentApi";
import { getShipmentById } from "../../api/ShipmentApi";
import { getUserById } from "../../api/UserApi";
import Pagination from "../../components/Pagination";
// import "../../App.css";

const user = JSON.parse(localStorage.getItem("token"));

const OrderedProducts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getAllShipments = async () => {
    try {
      const response = await getPayment();
      let item = [];

      for (let i of response.data) {
        if (i.user == user.id) {
          const user1 = await getUserById(i.user);
          const shipment = await getShipmentById(i.shipment);

          i.user = user1.data;
          i.shipment = shipment.data;

          item.push(i);
          // for (let i of response.data) {
          //   if (i.shipment.delivery_boy_assigned === user1.id) {
          //     item.push(i);
          //   }
          // }
        }
      }
      setData(item);
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllShipments();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data?.length / recordsPerPage);
  return (
    <>
      <div className="card table-responsive mx-5 py-3 my-3">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Products Name</th>
            <th className="pb-2 px-2 mx-2">Price</th>
          </tr>
          {currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center py-2">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td className="text-center py-2">{item.shipment.name}</td>
                <td className="text-center py-2">
                  {moment(item.shipment.estimated_date)
                    .utc()
                    .format("YYYY/MM/DD")}
                </td>
                {/* <td className="text-center py-2">{item.price}</td> */}
                <td className="text-center py-2">
                  <button
                    className="btn btn-primary bg-primary mx-2 "
                    onClick={() => navigate(`/orderedProducts/${item.id}`)}
                  >
                    View
                  </button>
                </td>
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

export default OrderedProducts;
