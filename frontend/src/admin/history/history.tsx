import Header from "../shared/header/header";
import SideBar from "../shared/sidebar/sidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";

export default function EmployeeOrderHistory() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await api.get("/orders/total");
      setOrders(res.data);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="parent">
      <div className="childleft">
        <div className="sidnav">
          <SideBar />
        </div>
      </div>
      <div className="childright">
        <div className="header">
          <Header title="Orders List" />
        </div>
        <div className="content">
          <div className="card m-0 mt-3">
            <div className="card-body">
              <div className="row m-0">
                <div className="col-8">
                  <div className="h6">Items List</div>
                </div>
              </div>
              <div className="mt-3">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Item Image</th>
                      <th>Order Date</th>
                      <th>Student Name</th>
                      <th>Student Phone</th>
                      <th>Student Address</th>
                      <th>Item Name</th>
                      <th>Item Quantity</th>
                      <th>Accept</th>
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
                        <td>{order.student_name}</td>
                        <td>{order.student_phone}</td>
                        <td>{order.student_address}</td>
                        <td>{order.item_name}</td>
                        <td>{order.quantity}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={async () => {
                              try {
                                const res = await api.patch(
                                  `/orders/${order.order_id}/status/change`
                                );
                                toast.success(res.data.msg);
                                getOrders();
                              } catch (error: any) {
                                toast.error(error.response.data.msg);
                              }
                            }}
                          >
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
