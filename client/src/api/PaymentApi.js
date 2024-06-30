import { toast } from "react-hot-toast";
import config from "./config";

const addPayment = async (payment) => {
  try {
    return await config.post("/recipts/", payment);
    // toast.success("Payment Completes successfully");
  } catch (error) {
    toast.error("Error while doing Payment");
  }
};

const getPayment = async () => {
  try {
    return await config.get("/recipts/");
  } catch (error) {
    toast.error("Error while doing Payment");
  }
};
const getPaymentById = async (id) => {
  // try {
  return await config.get("/recipts/" + id);
  // } catch (error) {
  //   toast.error("Error while adding user");
  // }
};

const updatePayment = async (id,group) => {
  try {
    
    await config.put(`/recipts/${id}/`, group);
  } catch (error) {
    toast.error("Error while updating group");
  }
};

const deletePaymentById = async (id) => {
  // try {
  return await config.delete("/recipts/" + id);
  // } catch (error) {
  //   toast.error("Error while adding user");
  // }
};

export { addPayment, getPayment, getPaymentById, deletePaymentById, updatePayment };
