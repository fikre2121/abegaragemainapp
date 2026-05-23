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
import Addcustomer from "./markup/pages/admin/addcustomer/Addcustomerp";
import AddVehicle from "./markup/components/add_vehicle/add_vehicle";
import Adminpage from "./markup/pages/admin/adminpage/Adminpage";
import About from "./markup/components/about/About";
import Service from "./markup/pages/service/Service";
import ContactUS from "./markup/pages/contactus/ContactUs";

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
        <Route path="/admin/add-employee" element={<Addemployee />} />
        <Route path="/admin/add-customer" element={<Addcustomer />} />
        <Route path="/admin/add-vehicle" element={<AddVehicle />} />
        <Route path="/admin/" element={<Adminpage />} />
      </Routes>
      <Foter />
    </>
  );
}

export default App;
