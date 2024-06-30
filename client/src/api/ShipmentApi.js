import { toast } from "react-hot-toast";
import config from "./config";

/**
 *
 * @param {{}} shipment The shipment object to be used to add the shipment
 */
const addShipment = async (shipment) => {
  try {
    await config.post("/shipments/", shipment);
    toast.success("Shipment added successfully");
  } catch (error) {
    toast.error("Error while adding shipment");
  }
};

const getShipment = async () => {
  try {
    return await config.get("/shipments/");
  } catch (error) {
    toast.error("Error while adding user");
  }
};

const getShipmentById = async (id) => {
  try {
    return await config.get("/shipments/"+ id);
  } catch (error) {
    toast.error("Error while adding user");
  }
};

/**
 * @param {{}} shipment The shipment object to be used to update the shipment
*/
const updateShipment = async (shipment) => {
  try {
    await config.put(`/shipments/${shipment.id}/`, shipment);
    toast.success("Shipment updated successfully");
  } catch (error) {
    toast.error("Error while updating shipment");
  }
};

export { addShipment, getShipment, getShipmentById, updateShipment };