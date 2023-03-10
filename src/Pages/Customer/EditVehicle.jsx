import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import styles from "../../CSS/VehicleEdit.module.css";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EditVehicle = () => {
  const { vehicle_id } = useParams();
  const [idData, setIdData] = useState(["starkenn"]);
  const [data, setData] = useState([]);
  const [iotData, setIotData] = useState([]);
  const [ecuData, setEcuData] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    /////////Getting Data of vehicle
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

    ///getting data of iot remaining
    axios
      .get("/vehicles/get-iot", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setIotData(res.data.IotData);
      })
      .catch((err) => {
        console.log(err);
      });

    ///getting ecu remaining
    axios
      .get("/vehicles/get-ecu", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setEcuData(res.data.ECUData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (
      data.vehicle_name &&
      data.vehicle_registration &&
      data.status &&
      data.iot &&
      data.ecu &&
      data.featureset
    ) {
      axios
        .put(`/vehicles/editvehicle/${user_id}/${vehicle_id}`, data, {
          headers: { authorization: `bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          alert("Data Updated Successfully");
        })
        .catch((err) => {
          console.log(err);
          alert("Error in Updating Data");
        });
    } else {
      alert("Fill All Credentials");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <Container>
      <div>
        <div className={styles.formdiv}>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <Link to="/vehicle">Vehicle</Link>
              </div>
              <div>
                <h3>Edit Vehicle</h3>
              </div>
            </div>
            <div>
              <div className={styles.griddiv}>
                <div>
                  <p>Vehicle_Name</p>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder={`${idData[0].vehicle_name}`}
                      name="vehicle_name"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
                <div>
                  <p>Vehicle_registration</p>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder={`${idData[0].vehicle_registration}`}
                      name="vehicle_registration"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
                <div>
                  <p>ECU</p>
                  <Form.Select name="ecu" onChange={handleChange}>
                    <option>-Select ECU-</option>
                    {ecuData?.map((el) => {
                      return (
                        <option key={el.id} value={`${el.device_id}`}>
                          {el.device_id}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
                <div>
                  <p>IoT</p>
                  <Form.Select name="iot" onChange={handleChange}>
                    <option>-Select IoT-</option>
                    {iotData?.map((el) => {
                      return (
                        <option key={el.id} value={`${el.device_id}`}>
                          {el.device_id}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
                <div>
                  <p>Featureset</p>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder={`${idData[0].featureset}`}
                      name="featureset"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
                <div>
                  <p>Status</p>
                  <Form.Select onChange={handleChange} name="status">
                    <option>-Select Status-</option>
                    <option value="0">Deleted</option>
                    <option value="1">Active</option>
                    <option value="2">Deactive</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <Button
                style={{ width: "600px" }}
                type="submit"
                variant="primary"
              >
                Submit
              </Button>{" "}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditVehicle;
