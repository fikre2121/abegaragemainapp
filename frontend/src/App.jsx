import { Route, Routes } from "react-router-dom";

// Public pages
import Home from "./markup/pages/home/Home";
import Login from "./markup/pages/login/Login";
import About from "./markup/components/about/About";
import Service from "./markup/pages/service/Service";
import ContactUS from "./markup/pages/contactus/ContactUs";

// Admin pages
import Adminpage from "./markup/pages/admin/adminpage/Adminpage";
import Addemployee from "./markup/pages/admin/addemployee/Addemployee";
import Addcustomer from "./markup/pages/admin/customerp/Addcustomerp";
import CustomerEdditP from "./markup/pages/admin/customerp/CustomerEdditp";
import CustomerProfileP from "./markup/pages/admin/customerp/CustomerProfilep";
import Customersp from "./markup/pages/admin/customerp/Customersp";
import EmployEdditp from "./markup/pages/admin/employee/EmployEdditp";
import Employeesp from "./markup/pages/admin/employee/Employeesp";
import ServiceManegp from "./markup/pages/admin/servicemanege/ServiceManegp";
import AddVehicle from "./markup/components/add_vehicle/add_vehicle";

// Layouts and route protection
import AdminLayout from "./markup/pages/layout/AdminLayout";
import ProtectedRoute from "./markup/components/protectedroute/ProtectedRoute";
import PublicLayout from "./markup/pages/layout/PublicLayout";

// CSS
import "./assets/templateassets/css/bootstrap.css";
import "./assets/templateassets/css/style.css";
import "./assets/templateassets/css/responsive.css";
import "./assets/templateassets/css/color.css";
import "./assets/styles/custom.css";

function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE LAYOUT */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* PROTECTED ADMIN SECTION */}
      <Route element={ProtectedRoute}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Adminpage />} />

          <Route path="customers" element={<Customersp />} />
          <Route path="add-customer" element={<Addcustomer />} />
          <Route path="edit-customer/:id" element={<CustomerEdditP />} />
          <Route path="customer-profile/:id" element={<CustomerProfileP />} />

          <Route path="employees" element={<Employeesp />} />
          <Route path="add-employee" element={<Addemployee />} />
          <Route path="edit-employee/:id" element={<EmployEdditp />} />

          <Route path="service-manage" element={<ServiceManegp />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
