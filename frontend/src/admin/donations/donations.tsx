import "./donations.css";
import Header from "../shared/header/header";
import SideBar from "../shared/sidebar/sidebar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api";

type DonationFormData = {
  name: string;
  description: string;
  quantity: number;
  donor_id: number;
  category: string;
};

export default function Donations() {
  const [showAddForm, setShowAddForm] = useState(true);
  const donationForm = useForm<DonationFormData>();

  const [items, setItems] = useState([]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const getItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get("/items/filter?donor_id=" + user.id);
      setItems(res.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getCategories = async () => {
    try {
      const res = await api.get("/items/distinct?column=category");
      setCategories(res.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCategories();
    getItems();
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
          <Header title="Donations" />
        </div>
        <div className="content">
          <div className="card mt-3">
            <div className="card-body">
              {showAddForm ? (
                <div className="h6">Add Donation</div>
              ) : (
                <div className="h6">Edit Donation</div>
              )}
              <form>
                <div className="row m-0 mt-3 align-items-end">
                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Food Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...donationForm.register("name", { required: true })}
                    />
                    {donationForm.formState.errors.name && (
                      <div className="text-danger">
                        {donationForm.formState.errors.name.message}
                      </div>
                    )}
                  </div>
                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Quantity <span>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...donationForm.register("quantity", {
                        required: true,
                        min: {
                          value: 1,
                          message: "Quantity must be greater than 0",
                        },
                      })}
                    />
                    {donationForm.formState.errors.quantity && (
                      <div className="text-danger">
                        {donationForm.formState.errors.quantity.message}
                      </div>
                    )}
                  </div>

                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Enter Category <span>*</span>
                    </label>
                    {/* if he wants he can choose or else he can input his own category */}
                    <input
                      type="text"
                      className="form-control my-1"
                      {...donationForm.register("category", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "Category must be greater than 3 words",
                        },
                      })}
                    />
                    <div className="text-center"> OR </div>
                    <select
                      className="form-select"
                      onChange={(e) => {
                        const value = e.target.value as string;
                        donationForm.setValue("category", value);
                      }}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category: any) => (
                        <option value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                    {donationForm.formState.errors.category && (
                      <div className="text-danger">
                        {donationForm.formState.errors.category.message}
                      </div>
                    )}
                  </div>

                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Image <span>*</span>
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="form-control"
                      onChange={handleImageChange}
                      required
                    />
                  </div>

                  <div className="col-3">
                    <label htmlFor="name" className="form-label">
                      Description <span>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={3}
                      {...donationForm.register("description", {
                        required: true,
                        minLength: {
                          value: 10,
                          message: "Description must be greater than 10",
                        },
                      })}
                    ></textarea>
                    {donationForm.formState.errors.description && (
                      <div className="text-danger">
                        {donationForm.formState.errors.description.message}
                      </div>
                    )}
                  </div>

                  <div className="col-3 mt-2 mx-auto">
                    {showAddForm ? (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={donationForm.handleSubmit(async (data) => {
                          try {
                            const user = JSON.parse(
                              localStorage.getItem("user") || "{}"
                            );
                            const formData = new FormData();
                            formData.append("name", data.name);
                            formData.append(
                              "quantity",
                              data.quantity.toString()
                            );
                            formData.append("description", data.description);
                            formData.append("donor_id", user.id);
                            formData.append("image", selectedImage || "");
                            formData.append("category", data.category);
                            const res = await api.post("/items", formData);
                            toast.success(res.data.msg);
                            donationForm.reset();
                            selectedImage && setSelectedImage(null);
                            getItems();
                          } catch (error: any) {
                            toast.error(error.response.data.message);
                          }
                        })}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={donationForm.handleSubmit(async (data) => {
                          console.log(data);
                          donationForm.reset();
                          setShowAddForm(true);
                          toast.success("Donation Edited Successfully");
                        })}
                      >
                        edit
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
                  <div className="h6">Donations List</div>
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
                      <th>Quantity</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: any, index: number) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            className="img-fluid"
                            width="100px"
                          />
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm">
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => {
                              api
                                .delete("/items/" + item.id)
                                .then((res) => {
                                  toast.success(res.data.msg);
                                  getItems();
                                })
                                .catch((err) => {
                                  toast.error(err.response.data.msg);
                                });
                            }}
                          >
                            Delete
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
