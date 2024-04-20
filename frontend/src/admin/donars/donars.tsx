import "./donars.css";
import Header from "../shared/header/header";
import SideBar from "../shared/sidebar/sidebar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";
export default function Donars() {
  const [showAddForm, setShowAddForm] = useState(true);
  const [donars, setDonars] = useState([]); // [] is the initial value
  const donarForm = useForm();

  const getDonors = async () => {
    try {
      const res = await api.get("/donors");
      setDonars(res.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getDonors();
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
          <Header title="Donars" />
        </div>
        <div className="content">
          {/* <div className="card mt-3">
            <div className="card-body">
              {showAddForm ? (
                <div className="h6">Add Donar</div>
              ) : (
                <div className="h6">Edit Donar</div>
              )}
              <form>
                <div className="row m-0 mt-3 align-items-end">
                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Donar Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...donarForm.register("name")}
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...donarForm.register("phone")}
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="email" className="form-label">
                      email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      {...donarForm.register("email")}
                    />
                  </div>
                  <div className="col-3">
                    {showAddForm ? (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={donarForm.handleSubmit(async (data) => {
                          donarForm.reset();
                          toast.success("Donar Added Successfully");
                        })}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={donarForm.handleSubmit(async (data) => {
                          console.log(data);
                          donarForm.reset();
                          setShowAddForm(true);
                          toast.success("Donar Edited Successfully");
                        })}
                      >
                        edit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div> */}

          <div className="card m-0 mt-3">
            <div className="card-body">
              <div className="row m-0">
                <div className="col-8">
                  <div className="h6">Donars List</div>
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
                    </tr>
                  </thead>
                  <tbody>
                    {donars.map((donar: any, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{donar.name}</td>
                        <td>{donar.phone}</td>
                        <td>{donar.email}</td>
                        <td>{donar.address}</td>
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
