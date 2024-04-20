import "./login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function AdminLogin() {
  const navigate = useNavigate();
  const loginForm = useForm();
  return (
    <div className="row m-0 mt-5 justify-content-center">
      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
        {" "}
        <div className="card">
          <div className="card-body">
            <div className="h5 text-center">Admin Login</div>
            <form>
              <div className="row mt-5">
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span>*</span>
                  </label>
                  <input
                    {...loginForm.register("email", { required: true })}
                    type="email"
                    className="form-control"
                    maxLength={50}
                    id="email"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">
                    Password <span>*</span>
                  </label>
                  <input
                    {...loginForm.register("password", { required: true })}
                    type="password"
                    className="form-control"
                    maxLength={50}
                    id="password"
                  />
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary mt-5"
                    type="submit"
                    onClick={loginForm.handleSubmit(async (data) => {
                      try {
                        if (
                          data.email === "admin@gmail.com" &&
                          data.password === "admin"
                        ) {
                          sessionStorage.setItem("admin", JSON.stringify(data));
                          navigate("/admin/donars");
                        } else {
                          toast.error("Invalid Credentials");
                        }
                      } catch (error: any) {
                        toast.error(error.message);
                      }
                    })}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
