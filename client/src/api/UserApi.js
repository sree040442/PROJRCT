import { toast } from "react-hot-toast";
import config from "./config";

/**
 * @param {{}} user The user object to be used to register the user
*/
const addUser = async (user) => {
  // try {
    await config.post("/users/", user);
    toast.success("User added successfully");
  // } catch (error) {
  //   toast.error("Error while adding user");
  // }
};

const getUser = async () => {
  try {
    return await config.get("/users/");
  } catch (error) {
    toast.error("Error while adding user");
  }
};

const getUserById = async (id) => {
  try {
    return await config.get("/users/"+ id);
  } catch (error) {
    toast.error("Error while adding user");
  }
};

/**
 *
 * @param {{}} user The user object to be used to update the user
 */
const updateUser = async (user) => {
  try {
    await config.put(`/users/${user.id}/`, user);
    toast.success("User updated successfully");
  } catch (error) {
    toast.error("Error while updating user");
  }
};

/**
 *
 * @param {{}} user The user details to be used to log in
 * @param {function} successCallback The callback to be called if the user is logged in successfully this function passes the user object as a parameter
 */
const loginUser = async (user, successCallback) => {
  try {
    const users = await config.get("/users/");
    const userFound = users.data.find((u) => u.email === user.email);
    if (!userFound) {
      toast.error("User not found , please register");
      return;
    }
    if (userFound.password !== user.password) {
      toast.error("Password is incorrect , please try again");
      return;
    }
    toast.success(
      `Welcome ${userFound.name ? userFound.name : userFound.email}`
    );

    successCallback(userFound);
  } catch (error) {
    console.log(error)
    toast.error("Error while logging in user");
  }
};

export { addUser, getUser, getUserById, updateUser, loginUser };
