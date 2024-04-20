import "./login.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/api";

type LoginFormData = {
  email: string;
  password: string;
  role: "student" | "donor" | "manager" | "employee";
};

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "student" | "donor";
};

export function Login() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();
  useEffect(() => {}, []);

  return (
    <div>
      <div className="row m-0 mt-5 justify-content-center">
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
          {showLoginForm ? (
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  No Account{" "}
                  <span
                    id="register"
                    onClick={() => {
                      setShowLoginForm(false);
                    }}
                  >
                    Register ?
                  </span>
                </p>
                <hr />
                <div className="h5 text-center">Login</div>
                <form>
                  <div className="row mt-5">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Role <span>*</span>
                      </label>
                      <select
                        {...loginForm.register("role", { required: true })}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="" disabled selected>
                          Select Role
                        </option>
                        <option value="student">Student</option>
                        <option value="donor">Donor</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                      </select>
                      {loginForm.formState.errors.role && (
                        <span className="text-danger">
                          {" "}
                          {loginForm.formState.errors.role.message}{" "}
                        </span>
                      )}
                    </div>
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
                            if (data.role === "employee") {
                              const res = await api.post(
                                "/employees/login",
                                data
                              );
                              localStorage.setItem(
                                "user",
                                JSON.stringify(res.data)
                              );
                              navigate("/admin/orders");
                            } else if (data.role === "manager") {
                              const res = await api.post(
                                "/employees/login",
                                data
                              );
                              localStorage.setItem(
                                "user",
                                JSON.stringify(res.data)
                              );
                              navigate("/admin/employees");
                            } else if (data.role === "donor") {
                              const res = await api.post("/donors/login", data);
                              localStorage.setItem(
                                "user",
                                JSON.stringify(res.data)
                              );
                              navigate("/admin/donations");
                            } else if (data.role === "student") {
                              const res = await api.post(
                                "/students/login",
                                data
                              );
                              localStorage.setItem(
                                "user",
                                JSON.stringify(res.data)
                              );
                              navigate("/");
                            } else {
                              toast.error("Invalid Role");
                            }
                          } catch (error: any) {
                            toast.error(error.response.data.msg);
                          }
                        })}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <p className="text-center">
                  Back to{" "}
                  <span
                    id="register"
                    onClick={() => {
                      setShowLoginForm(true);
                    }}
                  >
                    Login ?
                  </span>
                </p>
                <hr />
                <div className="h5 text-center">Register</div>
                <form>
                  <div className="row mt-3">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Role <span>*</span>
                      </label>
                      <select
                        {...registerForm.register("role", { required: true })}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="" disabled selected>
                          Select Role
                        </option>
                        <option value="student">Student</option>
                        <option value="donor">Donor</option>
                      </select>
                      {registerForm.formState.errors.role && (
                        <span className="text-danger">
                          {" "}
                          {registerForm.formState.errors.role.message}{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Name <span>*</span>
                      </label>
                      <input
                        {...registerForm.register("name", {
                          required: true,
                        })}
                        type="text"
                        className="form-control"
                        maxLength={50}
                        id="name"
                      />
                      {registerForm.formState.errors.name && (
                        <span className="text-danger">
                          {" "}
                          {registerForm.formState.errors.name.message}{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Email <span>*</span>
                      </label>
                      <input
                        {...registerForm.register("email", {
                          required: true,
                          pattern: {
                            // email regex
                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            message: "Invalid Email",
                          },
                        })}
                        type="email"
                        className="form-control"
                        maxLength={50}
                        id="name"
                      />
                      {registerForm.formState.errors.email && (
                        <span className="text-danger">
                          {" "}
                          {registerForm.formState.errors.email.message}{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Phone <span>*</span>
                      </label>
                      <input
                        {...registerForm.register("phone", {
                          required: true,
                          pattern: {
                            // phone regex
                            value: /^[0-9]{10}$/i,
                            message: "Invalid Phone",
                          },
                        })}
                        type="text"
                        className="form-control"
                        maxLength={50}
                        id="email"
                      />
                      {registerForm.formState.errors.phone && (
                        <span className="text-danger">
                          {" "}
                          {registerForm.formState.errors.phone.message}{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Address <span>*</span>
                      </label>
                      <input
                        {...registerForm.register("address", {
                          required: true,
                          minLength: {
                            value: 5,
                            message: "Address must be atleast 5 characters",
                          },
                        })}
                        type="text"
                        className="form-control"
                        maxLength={50}
                        id="password"
                      />
                      {registerForm.formState.errors.address && (
                        <span className="text-danger">
                          {" "}
                          {registerForm.formState.errors.address.message}{" "}
                        </span>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span>*</span>
                      </label>
                      <input
                        {...registerForm.register("password", {
                          required: true,
                          pattern: {
                            value: /^[a-zA-Z0-9]{8,16}$/i,
                            message: "Password must be 8-16 characters",
                          },
                        })}
                        type="password"
                        className="form-control"
                        maxLength={50}
                        id="password"
                      />
                      {registerForm.formState.errors.password && (
                        <span className="text-danger">
                          {" "}
                          {registerForm.formState.errors.password.message}{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn btn-primary mt-5"
                        type="submit"
                        onClick={registerForm.handleSubmit(async (data) => {
                          try {
                            if (data.role === "student") {
                              const res = await api.post("/students", data);
                              toast.success(res.data.msg);
                            } else if (data.role === "donor") {
                              const res = await api.post("/donors", data);

                              toast.success(res.data.msg);
                            }
                            registerForm.reset();
                          } catch (error: any) {
                            toast.error(error.response.data.msg);
                          }
                        })}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
