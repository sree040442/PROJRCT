import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import Pagination from "../../components/Pagination";
import { getPayment } from "../../api/PaymentApi";
import { getUserById } from "../../api/UserApi";

const user = JSON.parse(localStorage.getItem("token"));

const BuyProducts = () => {
  const [isLoding, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await getPayment();
      for (let i of response.data) {
        const user = await getUserById(i.user);
        i.user = user.data;
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
            <th className="pb-2 px-2 mx-2">USER</th>
            <th className="pb-2 px-2 mx-2">Email</th>
            <th className="pb-2 px-2 mx-2">Quantity</th>
            <th className="pb-2 px-2 mx-2">Total Price</th>
            <th className="pb-2 px-2">Date</th>
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
                <td className="text-center py-2">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td className="text-center py-2">{item.user.first_name}</td>
                <td className="text-center py-2">{item.user.email}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-center py-2">{item.total_price}</td>
                <td className="text-center py-2">
                  {moment(item.date).utc().format("YYYY/MM/DD")}
                </td>
                <td className="text-center d-flex">
                  {/* {role === 5 &&
                    paymentCb &&
                    (item.payment_done === false ? (
                      <button
                        className="btn btn-success bg-success mx-2 "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => paymentCb(item)}
                      >
                        Payment
                      </button>
                    ) : (
                      <div>
                        <p className="mx-3 pt-2 fs-5">Paid</p>
                      </div>
                    ))} */}

                  {/* {user.is_superuser &&
                    (item.payment_done === false ? (
                      <button
                        type="button"
                        className="btn btn-light text-danger"
                        disabled
                      >
                        UnPaid
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-light text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => receiptCb(item)}
                      >
                        Paid
                      </button>
                    ))} */}
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

export default BuyProducts;
