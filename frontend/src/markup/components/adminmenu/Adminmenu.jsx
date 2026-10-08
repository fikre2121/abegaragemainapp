import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardList,
  Plus,
  Users,
  UserRound,
  UserPlus,
  Wrench,
  Car,
} from "lucide-react";

const MENU = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ClipboardList,
  },
  {
    name: "New Order",
    path: "/admin/orders/new",
    icon: Plus,
  },
  {
    name: "Employees",
    path: "/admin/employees",
    icon: Users,
  },
  {
    name: "Add Employee",
    path: "/admin/add-employee",
    icon: UserPlus,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: UserRound,
  },
  {
    name: "Add Customer",
    path: "/admin/add-customer",
    icon: UserPlus,
  },
  {
    name: "Services",
    path: "/admin/service-manage",
    icon: Wrench,
  },
  {
    name: "Vehicles",
    path: "/admin/add-vehicle",
    icon: Car,
  },
];

function Adminmenu() {
  return (
    <aside className="bg-white border-end h-100">
      {/* Sidebar Header */}
      <div className="p-4 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-dark text-white rounded-3 p-2 d-flex align-items-center justify-content-center">
            <Wrench size={22} strokeWidth={2} />
          </div>

          <div>
            <h5 className="mb-0 fw-bold">Abe Garage</h5>

            <small className="text-muted">Management</small>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-3">
        <div className="text-uppercase text-muted small fw-semibold px-2 mb-2">
          Main Menu
        </div>

        <ul className="nav nav-pills flex-column gap-1">
          {MENU.map((item) => {
            const Icon = item.icon;

            return (
              <li className="nav-item" key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-3 rounded-3 ${
                      isActive ? "active" : "text-dark"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={2} />

                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User */}
      <div className="mt-auto p-3 border-top">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center">
            <UserRound size={18} />
          </div>

          <div>
            <div className="fw-semibold small">Administrator</div>

            <small className="text-muted">Garage Manager</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Adminmenu;
