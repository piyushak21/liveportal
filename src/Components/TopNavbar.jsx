import React, { useState } from "react";
import "./TopNavbar.css";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  BsFillGrid3X3GapFill,
  BsFillBellFill,
  BsFillHouseFill,
  BsFillCpuFill,
  BsTruck,
  BsPersonFill,
  BsColumnsGap,
  BsArrowLeftCircle,
  BsArrowCounterclockwise,
  BsCheckCircle,
} from "react-icons/bs";

//Navbar

const TopNavbar = () => {
  const token=localStorage.getItem("token")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user_type = localStorage.getItem("user_type");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const handleNotification = () => {
    setOpen(!open);
  };

  if(token) {
    return(
      <div>
      <Navbar expand="lg" className="topnav">
        <Container fluid>
          <div className="maindiv">
            <div className="nav1">
              <Navbar.Brand>
                {user_type == "1" ? (
                  <Link to="/admin-dashboard">
                    <span>
                      <img
                        className="logoimg"
                        src="https://starkenn-admin.app.redbytes.in/static/media/logo_dashboard.7d91b8801cb0911d502a81eea2c22a09.svg"
                        alt="Starkenn"
                      />
                    </span>
                  </Link>
                ) : (
                  <Link to="/customer-dashboard">
                    <span>
                      <img
                        className="logoimg"
                        src="https://starkenn-admin.app.redbytes.in/static/media/logo_dashboard.7d91b8801cb0911d502a81eea2c22a09.svg"
                        alt="Starkenn"
                      />
                    </span>
                  </Link>
                )}
              </Navbar.Brand>
            </div>
            <div className="nav2">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Nav.Link to="#">
                    <span>
                      <BsFillHouseFill size={20} color="grey" />
                    </span>
                  </Nav.Link>
                  <Nav.Link to="#">
                    <span>
                      <BsFillBellFill
                        onClick={handleNotification}
                        size={20}
                        color="grey"
                      />
                    </span>
                  </Nav.Link>

                  <Nav.Link href="#">
                    <span>
                      <BsFillGrid3X3GapFill
                        onClick={handleShow}
                        color="grey"
                        size={20}
                      />
                    </span>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body className="canvasbody">
          {user_type === "1" ? (
            <div className="griddiv">
              <div>
                <span>
                  <BsColumnsGap
                    onClick={() => navigate("/admin-dashboard")}
                    size={35}
                  />
                </span>
                <p>Dashboard</p>
              </div>
              <div>
                <span>
                  <BsFillCpuFill
                    onClick={() => navigate("/devices")}
                    size={35}
                  />
                </span>
                <p>Devices</p>
              </div>
              <div>
                <span>
                  <BsPersonFill onClick={() => navigate("/users")} size={35} />
                </span>
                <p>Customers</p>
              </div>
              <div>
                <BsArrowLeftCircle onClick={handleLogout} size={35} />
                <p>Logout</p>
              </div>
            </div>
          ) : (
            <div className="griddiv">
              <div>
                <span>
                  <BsColumnsGap
                    onClick={() => navigate("/customer-dashboard")}
                    size={35}
                  />
                </span>
                <p>Dashboard</p>
              </div>
              <div>
                <span>
                  <BsTruck onClick={() => navigate("/vehicle")} size={35} />
                </span>
                <p>Vehicles</p>
              </div>
              <div>
                <span>
                  <BsArrowCounterclockwise
                    onClick={() => navigate("/ongoing-trips")}
                    size={35}
                  />
                </span>
                <p>OnGoing</p>
              </div>
              <div>
                <span>
                  <BsCheckCircle
                    onClick={() => navigate("/completed-trips")}
                    size={35}
                  />
                </span>
                <p>Completed</p>
              </div>
              <div>
                <BsArrowLeftCircle onClick={handleLogout} size={35} />
                <p>Logout</p>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      {open ? (
        <div onClick={handleNotification} className="clickdiv"></div>
      ) : (
        ""
      )}
      {open ? (
        <div className="notificationdiv">
          <div>
            <h5 className="my-3 border-0 mx-4 rounded-2 ">
              Notification
            </h5>
          </div>

          <div className="d-flex flex-column gap-1">
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
            <div className="d-flex justify-content-around border-0 p-3 mx-2 border-bottom">
              <div className="border rounded-2 align-self-center">
                <h3 className="px-2"><BsFillCpuFill /></h3>
              </div>
              <div className="">
                <p className="text-start ms-2 mb-1"><small>
                You have Notification about vehicle Added</small></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
    )
  } else{
    return ""
  }
    
  
};

export default TopNavbar;
