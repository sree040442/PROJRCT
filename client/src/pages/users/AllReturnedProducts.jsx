import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getPayment,
  getPaymentById,
  updatePayment,
} from "../../api/PaymentApi";
import { getProductsById } from "../../api/ProductsApi";
import { getShipmentById } from "../../api/ShipmentApi";
import { getUserById } from "../../api/UserApi";
import Pagination from "../../components/Pagination";

const user = JSON.parse(localStorage.getItem("token"));

const AllReturnedProducts = () => {
  const [data, setData] = useState([]);

  const getAllShipments = async () => {
    try {
      const response = await getPayment();
      let item = [];

      for (let i of response.data) {
        if (i.user == user.id) {
          const user1 = await getUserById(i.user);
          const shipment = await getShipmentById(i.shipment);

          let products = [];
          if (i.return_products !== null) {
            for (let j of i.return_products) {
              const product = await getProductsById(j);
              products.push(product.data);
            }
          }
          i.return_products = products;
          i.user = user1.data;
          i.shipment = shipment.data;

          if (i.status === "Return") {
            item.push(i);
          }
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

  const handleExchange = async (id) => {
    const res = await getPaymentById(id);
    await updatePayment(id, {
      ...res.data,
      exchange_refund_status: "Exchange",
    });
    getAllShipments();
    toast.success("Exchanged successfully");
  };

  const handleRefund = async (id) => {
    const res = await getPaymentById(id);
    await updatePayment(id, { ...res.data, exchange_refund_status: "Refund" });
    getAllShipments();
    toast.success("Refunded successfully");
  };

  return (
    <>
      <div className="card table-responsive mx-5 py-3 my-3">
        <table className={`table table-striped table-hover `}>
          <tr className="text-center pb-4">
            <th className="pb-2 px-2 mx-2">ID</th>
            <th className="pb-2 px-2 mx-2">Damaged Products</th>
            <th className="pb-2 px-2 mx-2">Reason</th>
            <th className="pb-2 px-2 mx-2">Return status</th>
          </tr>
          {currentRecords.length > 0 ? (
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
                        <div className="row">
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
                  <td className="text-center py-2">
                    {item.exchange_refund_status === "Pending" ? (
                      item.return_status === "Pending" ? (
                        item.return_status
                      ) : (
                        <div className="dropdown">
                          <button
                            className="btn btn-primary text-white dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Exchange/Refund
                          </button>
                          <ul
                            className="dropdown-menu w-25"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <button
                              className="btn btn-success mb-2 mx-4"
                              type="submit"
                              onClick={() => handleExchange(item.id)}
                            >
                              EXCHANGE
                            </button>
                            <button
                              className="btn btn-success mx-4"
                              type="submit"
                              onClick={() => handleRefund(item.id)}
                            >
                              REFUND
                            </button>
                          </ul>
                        </div>
                      )
                    ) : (
                      item.exchange_refund_status
                    )}
                  </td>
                )}

                {/* <td className="text-center py-2">
                  <button
                    className="btn btn-primary bg-primary mx-2 "
                    onClick={() => navigate(`/orderedProducts/${item.id}`)}
                  >
                    View
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

export default AllReturnedProducts;
