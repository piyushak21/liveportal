import React, { useEffect, useState } from "react";
import styles from "../../CSS/VehicleShow.module.css";
import Container from "react-bootstrap/Container";
import { BsTruck } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import axios from "axios";

const VehicleShow = () => {
  const { vehicle_id } = useParams();
  const [idData, setIdData] = useState(["starkenn"]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/vehicles/vehicle-card/${vehicle_id}`, {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setIdData(res.data.IdData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <div>
        <Link to="/vehicle">Vehicle</Link>
      </div>
      <div className={styles.maindiv}>
        <div>
          <BsTruck size={50} />
        </div>
        <div className={styles.flexdiv}>
          <h5>{idData[0].vehicle_name}</h5>
          <p>
            <strong>Registration Number: </strong>
            {idData[0].vehicle_registration}
          </p>
          <p>
            <strong>ECU:</strong> {idData[0].ecu} | <strong>IoT:</strong>{" "}
            {idData[0].iot}
          </p>
          <Button variant="info">Feature set</Button>{" "}
        </div>
      </div>
    </Container>
  );
};

export default VehicleShow;
