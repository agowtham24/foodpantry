import "./orderhistory.css";
import { Header } from "../shared/header/header";
import { Footer } from "../shared/footer/footer";
import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get("/orders?student_id=" + user.id);
      setOrders(res.data);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      <section className="bodyy">
        <div className="card">
          <div className="card-body">
            <div className="h5 text-center">Order History</div>
            <div className="row m-0 mt-3 justify-content-center">
              
            </div>
            <div className="mt-3">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Date</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any, index: number) => (
                    <tr key={index} className="border-danger">
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={order.item_image}
                          alt={order.item_name}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td>{order.order_date}</td>
                      <td>{order.item_name}</td>
                      <td>{order.quantity}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
