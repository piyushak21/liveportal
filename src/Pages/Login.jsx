import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../CSS/Login.module.css";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://13.127.22.231:3001/api/login/login-user", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_type", res.data.user_type);
        localStorage.setItem("user_id", res.data.user_id);
        if (res.data.user_type === 1) {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("InValid Credentials");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div className={styles.maindiv}>
      <div className={styles.logindiv}>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h1>LOGIN</h1>
            </div>
            <div>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>

            <div>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div>
              <Button className={styles.btn} type="submit" variant="primary">
                Submit
              </Button>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
