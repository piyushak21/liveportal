import React, { useEffect, useState } from "react";
import {
  BsPersonFill,
  BsFillCpuFill,
  BsRecycle,
  BsFillCheckSquareFill,
  BsTruck,
} from "react-icons/bs";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  let user_id = localStorage.getItem("user_id");
  let token = localStorage.getItem("token");
  let [vehicleData, setVehicleData] = useState([]);
  let [devicesData, setDevicesData] = useState([]);
  let [tripsCompleted, setTripsCompleted] = useState([]);
  let [tripsOngoing, setTripsOngoing] = useState([]);
  const navigate = useNavigate();

  const getVehicleData = () => {
    axios
      .get(`/vehicles/user-vehicle/${user_id}`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setVehicleData(res.data.VehiData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDevicesData = () => {
    axios
      .get(`/devices/get-user-device/${user_id}`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => setDevicesData(res.data.idData))
      .catch((err) => console.log(err));
  };

  const completedTrips = () => {
    axios
      .get(`/completedTrip/getCompletedTrips`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setTripsCompleted(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OngoingTrips = () => {
    axios
      .get(`/ongoingTrip/getOngoingTrips`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setTripsOngoing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVehicleData();
    getDevicesData();
    completedTrips();
    OngoingTrips();
  }, []);

  return (
    <div>
      <Container className="mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <BsTruck
                  onClick={() => navigate("/vehicle")}
                  className="h1 display-4 my-2"
                />
                <h1 className="display-4">{vehicleData.length}</h1>
                <h5>Vehicle</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <BsRecycle
                  onClick={() => navigate("/ongoing-trips")}
                  className="h1 display-4 my-2"
                />
                <h1 className="display-4">{tripsOngoing.length}</h1>
                <h5>Ongoing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <BsFillCheckSquareFill
                  onClick={() => navigate("/completed-trips/")}
                  className="h1 display-4 my-2"
                />
                <h1 className="display-4">{tripsCompleted.length}</h1>
                <h5>Completed</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow">
              <div className="card-body">
                <BsFillCpuFill
                  onClick={() => navigate("/customer-devices")}
                  className="h1 display-4 my-2"
                />
                <h1 className="display-4">{devicesData.length}</h1>
                <h5>Devices</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
