import { toast } from "react-hot-toast";
import config from "./config";

/**
 * @param {{}} products The user object to be used to register the user
 */
const addProducts = async (product) => {
  try {
    await config.post("/products/", product);
    toast.success("Products added successfully");
  } catch (error) {
    toast.error("Error while adding Products");
  }
};

const getProducts = async () => {
  try {
    return await config.get("/products/");
  } catch (error) {
    toast.error("Error while adding Products");
  }
};

const getProductsById = async (id) => {
  // try {
    return await config.get("/products/" + id);
  // } catch (error) {
  //   toast.error("Error while adding Products");
  // }
};

/**
 *
 * @param {{}} product The product object to be used to update the product
 */
const updateProducts = async (product) => {
  try {
    await config.put(`/products/${product.id}/`, product);
    toast.success("Products updated successfully");
  } catch (error) {
    toast.error("Error while updating Products");
  }
};

export {
  addProducts,
  getProducts,
  getProductsById,
  updateProducts,
};
