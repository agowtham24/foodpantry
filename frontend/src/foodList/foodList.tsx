import { Footer } from "../shared/footer/footer";
import { Header } from "../shared/header/header";
import toast, { Toaster } from "react-hot-toast";
import "./foodList.css";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../store/index";

export default function FoodList() {
  const [foodList, setFoodList] = useState([]);
  const [searchedFoodList, setSearchedFoodList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useAtom(cartAtom);

  const getCategories = async () => {
    try {
      const res = await api.get("/items/distinct?column=category");
      setCategories(res.data);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  const getFoodList = async () => {
    try {
      const res = await api.get("/items");
      setFoodList(res.data);
      setSearchedFoodList(res.data);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  const searchFood = (e: any) => {
    const value = e.target.value;
    if (value === "") return setSearchedFoodList(foodList);
    const filteredFood = foodList.filter((item: any) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });
    setSearchedFoodList(filteredFood);
  };

  const filterFood = (e: any) => {
    const category = e.target.value;
    if (category === "All") return setSearchedFoodList(foodList);
    if (category === "All") return setSearchedFoodList(foodList);
    const filteredFood = foodList.filter((item: any) => {
      return item.category === category;
    });
    setSearchedFoodList(filteredFood);
  };

  useEffect(() => {
    getFoodList();
    getCategories();
  }, []);

  return (
    <div>
      <Header />
      <section className="bodyy">
        <div className="card">
          <div className="card-body">
            <div className="row m-0">
              <div className="col-4">
                <div className="h5">Food Items List</div>
              </div>
              <div className="col-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={searchFood}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="input-group">
                  <select className="form-select" onChange={filterFood}>
                    <option value="All">All</option>
                    {categories.map((item: any, index: number) => (
                      <option value={item.category} key={index}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-5">
          <div className="row m-0">
            {/* loop column */}
            {searchedFoodList.map((item: any, index: number) => (
              <div className="col-3 p-3" key={item.id}>
                <div className="card item">
                  <div className="card-body">
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
                    <div className="card-footer">
                      <button
                        className="btn btn-primary w-100"
                        key={item.quantity}
                        // disabled={cart.find(
                        //   (cartItem: any) => cartItem.id === item.id
                        // )}
                        disabled={Number(item.quantity) === 0}
                        onClick={() => {
                          const cartItem = cart.find(
                            (cartItem: any) => cartItem.id === item.id
                          );
                          if (cartItem) {
                            cartItem.quantity += 1;
                            item.quantity -= 1;
                            setSearchedFoodList([...searchedFoodList]);
                          } else {
                            item.quantity -= 1;
                            setSearchedFoodList([...searchedFoodList]);
                            setCart([...cart, { ...item, quantity: 1 }]);
                          }
                          toast.success("Item added to cart");
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <Footer />
      <Toaster />
    </div>
  );
}
