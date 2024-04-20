import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home/home";
import { Login } from "./login/login";
import FoodList from "./foodList/foodList";
import Checkout from "./checkouts/checkout";
import OrderHistory from "./ordersHistory/orderhistory";
import Profile from "./profile/profile";
import Donars from "./admin/donars/donars";
import Donations from "./admin/donations/donations";
import Employees from "./admin/employees/employees";
import EmployeeOrderHistory from "./admin/history/history";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/donors" element={<Donars />} />
        <Route path="/admin/donations" element={<Donations />} />
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/orders" element={<EmployeeOrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
