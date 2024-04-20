import Header from "../shared/header/header";
import SideBar from "../shared/sidebar/sidebar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";

type EmployeeFormData = {
  id: number;
  name: string;
  phone: number;
  email: string;
  password: string;
  address: string;
  role: "employee";
  manager_id: number;
};

export default function Donars() {
  const [showAddForm, setShowAddForm] = useState(true);
  const [employees, setEmployees] = useState([]);

  const employeeForm = useForm<EmployeeFormData>();

  const getEmployeess = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    getEmployeess();
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
          <Header title="Employees" />
        </div>
        <div className="content">
          <div className="card mt-3">
            <div className="card-body">
              {showAddForm ? (
                <div className="h6">Add Employee</div>
              ) : (
                <div className="h6">Edit Employee</div>
              )}
              <form>
                <div className="row m-0 mt-3 align-items-end">
                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...employeeForm.register("name", {
                        required: true,
                        pattern: {
                          value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                          message: "Entered value does not match name format",
                        },
                      })}
                    />
                    {employeeForm.formState.errors.name && (
                      <span className="text-danger">
                        {employeeForm.formState.errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Phone Number <span>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...employeeForm.register("phone", {
                        required: true,
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Entered value does not match phone format",
                        },
                      })}
                    />
                    {employeeForm.formState.errors.phone && (
                      <span className="text-danger">
                        {employeeForm.formState.errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    <label htmlFor="email" className="form-label">
                      Email <span>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      {...employeeForm.register("email", {
                        required: true,
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                    />
                    {employeeForm.formState.errors.email && (
                      <span className="text-danger">
                        {employeeForm.formState.errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    <label htmlFor="email" className="form-label">
                      Address <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...employeeForm.register("address", {
                        required: true,
                        minLength: {
                          value: 5,
                          message: "Address must be 5 characters",
                        },
                      })}
                    />
                    {employeeForm.formState.errors.address && (
                      <span className="text-danger">
                        {employeeForm.formState.errors.address.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    <label htmlFor="email" className="form-label">
                      Password <span>*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      {...employeeForm.register("password", {
                        required: true,
                        pattern: {
                          value: /^[a-zA-Z0-9]{8,16}$/i,
                          message: "Password must be 8-16 characters",
                        },
                      })}
                    />
                    {employeeForm.formState.errors.password && (
                      <span className="text-danger">
                        {employeeForm.formState.errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="col-3">
                    {showAddForm ? (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={employeeForm.handleSubmit(async (data) => {
                          try {
                            const user = JSON.parse(
                              localStorage.getItem("user") || "{}"
                            );
                            data.role = "employee";
                            data.manager_id = Number(user.id);
                            const res = await api.post("/employees", data);
                            getEmployeess();
                            toast.success(res.data.msg);
                            employeeForm.reset();
                          } catch (error: any) {
                            toast.error(error.response.data.msg);
                          }
                        })}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={employeeForm.handleSubmit(async (data) => {
                          try {
                            const user = JSON.parse(
                              localStorage.getItem("user") || "{}"
                            );
                            data.role = "employee";
                            data.manager_id = Number(user.id);
                            const res = await api.put("/employees/" + employeeForm.getValues("id"), data);
                            toast.success(res.data.msg);
                            getEmployeess();
                            employeeForm.reset();
                            setShowAddForm(true);
                          } catch (error: any) {
                            toast.error(error.response.data.msg);
                          }
                        })}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="card m-0 mt-3">
            <div className="card-body">
              <div className="row m-0">
                <div className="col-8">
                  <div className="h6">Employee List</div>
                </div>
                <div className="col-4">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Donar"
                  />
                </div>
              </div>
              <div className="mt-3">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee: any, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{employee.name}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.email}</td>
                          <td>{employee.address}</td>
                          <td>
                            <button
                              className="btn btn-secondary edit-btn"
                              onClick={() => {
                                setShowAddForm(false);
                                employeeForm.setValue("name", employee.name);
                                employeeForm.setValue("phone", employee.phone);
                                employeeForm.setValue("email", employee.email);
                                employeeForm.setValue(
                                  "address",
                                  employee.address
                                );
                                employeeForm.setValue(
                                  "password",
                                  employee.password
                                );
                                employeeForm.setValue(
                                  "id",
                                  employee.id
                                );
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn btn-danger delete-btn"
                              onClick={() => {
                                try {
                                  api.delete(`/employees/${employee.id}`);
                                  toast.success(
                                    "Employee Deleted Successfully"
                                  );
                                  getEmployeess();
                                } catch (error: any) {
                                  toast.error(error.response.data.msg);
                                }
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
