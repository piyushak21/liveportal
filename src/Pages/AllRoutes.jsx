import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProtected from "../Authorization/AdminProtected";
import CustomerProtected from "../Authorization/CustomerProtected";
import AddDevices from "./Admin/AddDevices";
import AddUser from "./Admin/AddUser";
import AdminDashboard from "./Admin/AdminDashboard";
import Devices from "./Admin/Devices";
import DeviceShow from "./Admin/DeviceShow";
import EditDevices from "./Admin/EditDevices";
import EditUser from "./Admin/EditUser";
import ShowUser from "./Admin/ShowUser";
import User from "./Admin/User";
import AddVehicle from "./Customer/AddVehicle";
import CompletedTripList from "./Customer/CompletedTripList";
import CompletedTripView from "./Customer/CompletedTripView";
import CustomerDashboard from "./Customer/CustomerDashboard";
import CustomerDevices from "./Customer/CustomerDevices";
import EditVehicle from "./Customer/EditVehicle";
import OngoingTripList from "./Customer/OngoingTripList";
import OngoingTripView from "./Customer/OngoingTripView";
import Vehicle from "./Customer/Vehicle";
import VehicleShow from "./Customer/VehicleShow";
import Login from "./Login";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/customer-dashboard"
        element={
          <CustomerProtected>
            <CustomerDashboard />
          </CustomerProtected>
        }
      />
      <Route
        path="/vehicle"
        element={
          <CustomerProtected>
            <Vehicle />
          </CustomerProtected>
        }
      />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/edit-vehicle/:vehicle_id" element={<EditVehicle />} />
      <Route path="/vehicle-show/:vehicle_id" element={<VehicleShow />} />
      <Route path="/ongoing-trips" element={<OngoingTripList />} />
      <Route path="/ongoing-trips/:id" element={<OngoingTripView />} />
      <Route path="/completed-trips/" element={<CompletedTripList />} />
      <Route path="/completed-trips/:id" element={<CompletedTripView />} />
      <Route path="/customer-devices" element={<CustomerDevices />} />
      {/* /////////////////Admin Routes/////////// */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminProtected>
            <AdminDashboard />
          </AdminProtected>
        }
      />
      <Route path="/devices" element={<Devices />} />
      <Route path="/devices-add" element={<AddDevices />} />
      <Route path="/devices-edit/:id" element={<EditDevices />} />
      <Route path="/devices-show/:id" element={<DeviceShow />} />
      <Route path="/users" element={<User />} />
      <Route path="/users-add" element={<AddUser />} />
      <Route path="/users-edit/:user_id" element={<EditUser />} />
      <Route path="/users-show/:user_id" element={<ShowUser />} />
    </Routes>
  );
};

export default AllRoutes;
