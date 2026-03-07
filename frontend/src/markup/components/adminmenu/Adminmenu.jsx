import React from "react";


const MENU = [
  "Dashboard",
  "Orders",
  "New order",
  "Add employee",
  "Employees",
  "Add customer",
  "Customers",
  "Services",
];

function Adminmenu() {
  return (
    <nav className="side-menu">
      <h3 className="menu-title">ADMIN MENU</h3>
      <ul className="admin-menu-list">
        {MENU.map((item, i) => (
          <li
            className={`admin-menu-item${item === "Add employee" ? " active" : ""}`}
            key={i}
          >
            <a href="#" tabIndex={0}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Adminmenu;
