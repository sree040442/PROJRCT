import config from "../api/config";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import moment from "moment/moment";
import Pagination from "./Pagination";

/**
 *
 * @param {string} endPoint - api endpoint
 * @param {string[]} columns - columns to be displayed
 * @param {Function} editCb - callback function to edit item
 * @param {string} variant - default is light
 * @returns JSX.Element
 */
const user = JSON.parse(localStorage.getItem("token"));

const Table = ({
  endPoint,
  columns,
  editCb,
  variant = "light",
  isDelete = true,
  role,
  paymentCb,
  receiptCb,
}) => {
  const [isLoding, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await config.get(endPoint);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (item) => {
    try {
      if (!confirm("Are you sure you want to delete this item?")) return;
      await config.delete(`${endPoint}${item.id}/`);
      fetchData();
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // let item = [];
  // for (let i of data) {
  //   if (role === 2) {
  //     if (i.user === user.id) {
  //       item.push(i);
  //     }
  //   } else {
  //     item = data;
  //   }
  // }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    // role === 2
    //   ? item.slice(indexOfFirstRecord, indexOfLastRecord)
    data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages =
    // role === 2
    //   ? Math.ceil(item.length / recordsPerPage)
    Math.ceil(data.length / recordsPerPage);

  return (
    <>
      <div className=" table-responsive ">
        <table className={`table table-striped table-hover table-${variant}`}>
          <tr className="text-center pb-4">
            {columns.map((column) => (
              <th className="pb-2 px-2 mx-2" key={column}>
                {column.toUpperCase()}
              </th>
            ))}
            {isDelete && <th className="pb-2 px-2">Action</th>}
          </tr>
          {isLoding ? (
            <tr>
              <td colSpan={columns.length} className="text-center mt-5 pt-5 h2">
                Loading...
              </td>
            </tr>
          ) : currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={item.id ? item.id : item}>
                {item.username !== "admin" &&
                  columns.map((column) =>
                    column === "id" ? (
                      <td className="text-center py-2" key={column}>
                        {(currentPage - 1) * recordsPerPage + index + 1}
                      </td>
                    ) : column === "date" ||
                      column === "payment_date" ||
                      column === "estimated_date" ? (
                      <td className="text-center py-2 px-2" key={column}>
                        {moment(item[column]).utc().format("YYYY/MM/DD")}
                      </td>
                    ) : (
                      <td className="text-center py-2" key={column}>
                        {item[column]}
                      </td>
                    )
                  )}
                {item.username !== "admin" && (
                  <td className="text-center d-flex">
                    {editCb && (
                      <button
                        className="btn btn-primary bg-primary mx-2 "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => editCb(item)}
                      >
                        Edit
                      </button>
                    )}
                    {isDelete && (
                      <button
                        className="btn btn-danger bg-danger"
                        onClick={() => deleteItem(item)}
                      >
                        Delete
                      </button>
                    )}
                    {!isDelete &&
                      user.is_superuser &&
                      receiptCb &&
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
                      ))}
                  </td>
                )}
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

export default Table;
