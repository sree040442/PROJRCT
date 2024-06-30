import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { getGroup } from "../../api/GroupApi";
import { addUser } from "../../api/UserApi";
import Navbar from "../../components/Navbar";
import Validate from "../../validation/ValidateUser";

const AddUsers = () => {
  const [data, setData] = useState({
    username: "",
    first_name: "",
    email: "",
    password: "",
    groups: "",
  });

  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const getGroups = async () => {
    try {
      const res = await getGroup();
      setGroups(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendMailToUser = async () => {
    try {
      const body = {
        Recipients: [
          {
            Email: data.email,
          },
        ],
        Content: {
          Body: [
            {
              ContentType: "HTML",
              Content: ` You are added for Ship Yard...`,
              Charset: "string",
            },
          ],
          From: "cse.takeoff@gmail.com",
          Subject: "You have been added in Ship Yard!",
        },
      };

      const headers = {
        "X-ElasticEmail-ApiKey":
          " FCE09D54A8F56F09716DC8FB3550636773E71D1219444F7EF87613C6E8B29E58621E031BBCB92D5D51ECBC63E0DA7BE9",
      };

      await axios.post(`https://api.elasticemail.com/v4/emails`, body, {
        headers: headers,
      });

      toast.success(`Email Sended to User Successfully!`, {});
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const role = [];
        role.push(data.groups);
        data.groups = role;
        sendMailToUser();
        await addUser(data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "rgb(230 238 245)", height: "100vh" }}
        className="pb-2"
      >
        <Navbar />
        <div className="container py-5">
          <div className="card mx-auto w-50 my-5">
            <div className="card-header">
              <h1>ADD USER</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputUsername4" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputUsername4"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                  />
                  {errors && errors.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputName4" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName4"
                    name="first_name"
                    value={data.first_name}
                    onChange={handleChange}
                  />
                  {errors && errors.first_name && (
                    <span className="text-danger">{errors.first_name}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {errors && errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  {errors && errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                <div className="col-6">
                  <label htmlFor="inputLocation" className="form-label">
                    Roles
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    type="text"
                    name="groups"
                    value={data.groups}
                    onChange={handleChange}
                  >
                    <option defaultValue>Role</option>
                    {groups &&
                      groups.map((role, index) => {
                        return (
                          <option key={index} value={role.id}>
                            {role.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors && errors.groups && (
                    <span className="text-danger">{errors.groups}</span>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success w-50 mx-auto"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
