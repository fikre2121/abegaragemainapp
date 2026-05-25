import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./markup/pages/home/Home";
import Login from "./markup/pages/login/Login";
import Addemployee from "./markup/pages/admin/addemployee/Addemployee";
// importing the css files
import "./assets/templateassets/css/bootstrap.css";
import "./assets/templateassets/css/style.css";
import "./assets/templateassets/css/responsive.css";
import "./assets/templateassets/css/color.css";
// custom css
import "./assets/styles/custom.css";

// components
import Header from "./markup/components/header/Header";
import Foter from "./markup/components/footer/Foter";
import Addcustomer from "./markup/pages/admin/customerp/Addcustomerp";
import AddVehicle from "./markup/components/add_vehicle/add_vehicle";
import Adminpage from "./markup/pages/admin/adminpage/Adminpage";
import About from "./markup/components/about/About";
import Service from "./markup/pages/service/Service";
import ContactUS from "./markup/pages/contactus/ContactUs";
import CustomerEdditP from "./markup/pages/admin/customerp/CustomerEdditp";
import CustomerProfileP from "./markup/pages/admin/customerp/CustomerProfilep";
import Customersp from "./markup/pages/admin/customerp/Customersp";
import EmployEdditp from "./markup/pages/admin/employee/EmployEdditp";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/login" element={<Login />} />
        {/* addmin pages */}
        <Route path="/admin/add-customer" element={<Addcustomer />} />
        <Route path="/admin/customer-eddit" element={<CustomerEdditP />} />
        <Route path="/admin/customer-profile" element={<CustomerProfileP />} />
        <Route path="/admin/customers" element={<Customersp />} />
        <Route path="/admin/add-employee" element={<Addemployee />} />
        <Route path="/admin/eddit-employee" element={<EmployEdditp />} />

        <Route path="/admin/add-vehicle" element={<AddVehicle />} />
        <Route path="/admin/" element={<Adminpage />} />
      </Routes>
      <Foter />
    </>
  );
}

export default App;
