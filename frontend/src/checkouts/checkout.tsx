import "./checkout.css";
import { Header } from "../shared/header/header";
import { Footer } from "../shared/footer/footer";
import toast, { Toaster } from "react-hot-toast";
import { set, useForm } from "react-hook-form";

import { useAtom } from "jotai";
import { cartAtom } from "../store/index";
import api from "../api/api";

export default function Checkout() {
  const [cart, setCart] = useAtom(cartAtom);

  const addForm = useForm();
  return (
    <div>
      <Header />
      <section className="bodyy">
        <div className="row mt-5 m-0">
          <div className="text-end">
            <button
              className="btn btn-primary mt-2"
              onClick={async () => {
                try {
                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                  if (!user) return toast.error("Please login first");
                  const res = await api.post("/orders", {
                    items: cart,
                    student_id: user.id,
                    status: "pending",
                  });
                  toast.success(res.data.msg);
                  setCart([]);
                } catch (error: any) {
                  toast.error(error.response.data.msg);
                }
              }}
            >
              Place Order
            </button>
          </div>
          <section className="mt-0">
            <div className="row m-0">
              {/* loop column */}
              {cart.map((item: any, index: number) => (
                <div className="col-3 p-3" key={item._id}>
                  <div className="card item border-danger">
                    <div className="card-body">
                      <div className="card-header text-end">
                        <span className="badge bg-danger">{item.quantity}</span>
                      </div>
                      <img
                        src={item.image}
                        alt="pic"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="h6 text-center">{item.name}</div>
                      <div className="h6 text-center">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <div
        className="modal fade"
        id="checkoutModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Check Out
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row m-0">
                  <div className="col-12">
                    <label htmlFor="username" className="form-label">
                      UserName <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("username", { required: true })}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="itemname" className="form-label">
                      Item Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...addForm.register("itemname", { required: true })}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="qty" className="form-label">
                      Quantity <span>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...addForm.register("qty", { required: true })}
                    />
                  </div>

                  <div className="col-12 text-center">
                    <button
                      className="btn btn-primary mt-3"
                      type="submit"
                      onClick={addForm.handleSubmit((data) => {
                        console.log(data);
                        addForm.reset();
                        toast.success("order placed successfully");
                      })}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
