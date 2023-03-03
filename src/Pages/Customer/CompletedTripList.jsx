import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const CompletedTripList = () => {
  const [tripData, setTripData] = useState();
  const [totalTrip, setTotalTrip] = useState();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  let token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = (async) => {
      axios
        .get(`/completedTrip/getCompletedTrips/${offset}`, {
          headers: { authorization: `bearer ${token}` },
        })
        .then((res) => {
          setTripData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();

    axios
      .get("/completedTrip/getCompletedTrips/", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setTotalTrip(res.data.length);
      })
      .catch((err) => console.log(err));
  }, [offset]);

  useEffect(() => {
    console.log(offset);
  }, [tripData]);

  const convertTime = (time) => {
    let updateStTime = new Date(time * 1000);
    return updateStTime.toLocaleString();
  };

  const handleOffsetone = () => {
    let x = totalTrip - 2;
    if (offset < x) {
      setOffset((offset) => offset + 2);
      setPage((page) => page + 1);
    }
  };

  const handleOffsettwo = () => {
    if (offset >= 2) {
      setOffset((prev) => prev - 2);
      setPage((page) => page - 1);
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between ">
        <div>
          <h4>Completed Trip List</h4>
          <small>
            <span>Total: {totalTrip}</span>
          </small>
        </div>
        <div>
          <Link to="/ongoing-trips">
            <button className="btn btn-info">Check Ongoing Trips</button>
          </Link>
        </div>
      </div>
      {/* List of vehicles */}
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Trip ID</th>
            <th>Vehicle Name</th>
            <th>Registration Number</th>
            <th>Trip Start</th>
            <th>Trip End</th>
            <th>Distance Travelled</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tripData &&
            tripData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.trip_id}</td>
                <td>{row.vehicle_name}</td>
                <td>{row.vehicle_registration}</td>
                <td>{convertTime(row.trip_start_time)}</td>
                <td>{convertTime(row.trip_end_time)}</td>
                <td>{row.total_distance} Km</td>
                <td>{row.duration}</td>
                <td>
                  <span className="text-primary">
                    <small>
                      <Link
                        to={`/completed-trips/${row.trip_id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </small>
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li onClick={handleOffsettwo} className="page-item ">
              <p className="page-link">Previous</p>
            </li>

            <li className="page-item">
              <p className="page-link fw-bolder ">{page}</p>
            </li>

            <li onClick={handleOffsetone} className="page-item">
              <p className="page-link ">Next</p>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default CompletedTripList;
