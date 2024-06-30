import { toast } from "react-hot-toast";
import config from "./config";

const addGroup = async (group) => {
  try {
    await config.post("/groups/", group);
    toast.success("Group added successfully");
  } catch (error) {
    toast.error("Error while adding group");
  }
};

const getGroup = async () => {
  try {
    return await config.get("/groups/");
  } catch (error) {
    toast.error("Error while adding user");
  }
};
const getGroupById = async (id) => {
  // try {
    return await config.get("/groups/" + id);
  // } catch (error) {
  //   toast.error("Error while adding user");
  // }
};


const updateGroup = async (group) => {
  try {
    await config.put(`/groups/${group.id}/`, group);
    toast.success("Group updated successfully");
  } catch (error) {
    toast.error("Error while updating group");
  }
};

export { addGroup ,getGroup ,getGroupById, updateGroup };
