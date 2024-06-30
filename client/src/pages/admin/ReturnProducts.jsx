import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import Pagination from "../../components/Pagination";
import { getPayment, getPaymentById } from "../../api/PaymentApi";
import { getUserById } from "../../api/UserApi";
import { getShipmentById } from "../../api/ShipmentApi";
import { getProductsById } from "../../api/ProductsApi";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("token"));

const ReturnProducts = () => {
  const [isLoding, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);

  const navigate = useNavigate();
  const getDelivery = async () => {
    try {
      const response = await getPayment();
      let item = [];
      for (let i of response.data) {
        let products = [];
        if (i.return_products !== null) {
          for (let j of i.return_products) {
            const product = await getProductsById(j);
            products.push(product.data);
          }
        }
        i.return_products = products;

        const user = await getUserById(i.user);
        const shipment = await getShipmentById(i.shipment);

        i.user = user.data;
        i.shipment = shipment.data;

        if (i.status === "Return") {
          item.push(i);
        }
      }
      setData(item);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getDelivery();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);
  return (
    <>
      <div className=" table-responsive ">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Damaged Products</th>
            <th className="pb-2 px-2 mx-2">Reason</th>
            <th className="pb-2 px-2 mx-2">Return status</th>
            <th className="pb-2 px-2 mx-2">Review</th>
          </tr>
          {isLoding ? (
            <tr>
              <td colSpan={6} className="text-center mt-5 pt-5 h2">
                Loading...
              </td>
            </tr>
          ) : currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={item.id}>
                {item.status === "Return" && (
                  <td className="text-center py-2">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </td>
                )}
                {item.status === "Return" && (
                  <td className="py-2">
                    {item.return_products.map((data, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-11 text-center">
                            {index + 1} {"  "} {data.name}
                          </div>
                        </div>
                      );
                    })}
                  </td>
                )}

                {item.status === "Return" && (
                  <td className="text-center py-2">{item.reason}</td>
                )}
                {item.status === "Return" && (
                  <td
                    className={
                      item.return_status === "Pending"
                        ? "text-warning text-center py-2"
                        : item.return_status === "Accepted"
                        ? "text-success text-center py-2"
                        : "text-danger text-center py-2"
                    }
                  >
                    {item.return_status}
                  </td>
                )}

                <td className="text-center py-2">
                  <button
                    className="btn btn-primary bg-primary mx-2 "
                    type="submit"
                    onClick={() => navigate(`/returnProducts/${item.id}`)}
                  >
                    Review
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
      </div>
      <div className="d-flex">
        <h1 className="me-auto"></h1>
        <div className={user.is_superuser ? "mx-2 mt-3" : "mx-5 pt-2"}>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default ReturnProducts;
