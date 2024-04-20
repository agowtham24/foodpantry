import { useEffect, useState } from "react";
import "./sidebar.css";

import { Link } from "react-router-dom";
function SideBar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setRole(user.role);
  }, []);

  return (
    <div className="sidebar">
      <div className="logo-details">
        <span className="logo_name">Administrator</span>
      </div>
      <ul className="nav-links">
        {role === "employee" && (
          <li>
            <Link to="/admin/orders">
              <i className="fa-solid fa-chart-simple"></i>
              <span className="link_name">Orders</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/orders">
                  Orders
                </Link>
              </li>
            </ul>
          </li>
        )}
        {role === "manager" && (
          <li>
            <Link to="/admin/employees">
              <i className="fa-solid fa-chart-simple"></i>
              <span className="link_name">Employees</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/employees">
                  Employees
                </Link>
              </li>
            </ul>
          </li>
        )}
        {role === "manager" && (
          <li>
            <Link to="/admin/donors">
              <i className="fa-solid fa-gauge"></i>
              <span className="link_name">Donars</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/donors">
                  Donars
                </Link>
              </li>
            </ul>
          </li>
        )}
        {role === "donor" && (
          <li>
            <Link to="/admin/donations">
              <i className="fa-solid fa-chart-simple"></i>
              <span className="link_name">Donations</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/admin/donatins">
                  Donations
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}
export default SideBar;
