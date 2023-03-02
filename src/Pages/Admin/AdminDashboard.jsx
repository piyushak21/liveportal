import React, { useEffect, useState } from "react";
import { BsPersonFill, BsFillCpuFill, BsTruck } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../CSS/AdminDashboard.module.css";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [customerData, setCustomerData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [vehcicleData, setVehicleData] = useState([]);
  const navigate = useNavigate();

  const getvehicleData = async () => {
    await axios
      .get(`http://localhost:8080/api/vehicles/getall`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => setVehicleData(res.data.getData))
      .catch((err) => console.log(err));
  };

  const getDevicesData = async () => {
    await axios
      .get("http://localhost:8080/api/devices/getall", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => setDevices(res.data.AllData))
      .catch((err) => console.lohg(err));
  };

  const getCustomersData = async () => {
    await axios
      .get(`http://localhost:8080/api/customers/getall`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setCustomerData(res.data.usersData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getvehicleData();
    getDevicesData();
    getCustomersData();
  }, []);

  return (
    <div>
      <Container>
        <div className="row mt-4">
          <div
            onClick={() => navigate("/users")}
            className="col-md-3 shadow m-3 card-body py-4"
          >
            <BsPersonFill className="h1 display-4 my-2" />
            <h1 className="display-4">{customerData.length}</h1>
            <h5>Customers</h5>
          </div>
          <div
            onClick={() => navigate("/devices")}
            className="col-md-3 shadow m-3 card-body py-4 "
          >
            <BsFillCpuFill className="h1 display-4 my-2" />
            <h1 className="display-4">{devices.length}</h1>
            <h5>Devices</h5>
          </div>
          <div className="col-md-3 shadow m-3 card-body py-4 ">
            <BsTruck className="h1 display-4 my-2" />
            <h1 className="display-4">{vehcicleData.length}</h1>
            <h5>Vehicles</h5>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
