import { Footer } from "../shared/footer/footer";
import { Header } from "../shared/header/header";
import "./profile.css";
export default function Profile() {
    return (
      <div>
        <Header />
        <div className="bodyy">
          <div className="card" style={{ marginTop: "70px" }}>
            <div className="card-body">
              <div className="h6 text-center">Profile</div>
              <div className="row m-0 mt-4">
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="pic"
                    style={{
                      borderRadius: "45%",
                      height: "200px",
                      width: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <form>
                    <div className="row m-0">
                      <div className="col-12">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input type="password" className="form-control" />
                      </div>
  
                      <div className="col-6">
                        <button className="btn btn-primary mt-4">
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }