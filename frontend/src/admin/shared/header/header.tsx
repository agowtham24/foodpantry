import "./header.css";
import { useNavigate } from "react-router-dom";
interface Props {
  title: string;
}
function Header(props: Props) {
  const navigateTo = useNavigate();
  return (
    <div className="head row justify-content-between align-items-center">
      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
        <div className="h6">{props.title}</div>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-3 col-12">
        <div className="dropdown">
          <img
            src="https://th.bing.com/th/id/R.32fc104571a9bb469f9a15e33b3b5888?rik=2pFtVAycFI23gA&riu=http%3a%2f%2fwww.dnnhero.com%2fPortals%2f0%2fimages%2fthumbs%2fadmin-account-dnn7-1.png&ehk=7rWyVFEbto1wG%2bBF1YpuCVFq0incvnLG%2bjAHBpc7bwU%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
            alt="admin"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ borderRadius: "50%", width: "45px", height: "45px" }}
          />

          <ul className="dropdown-menu">
            <li>
              <div
                className="d-flex justify-content-center dd"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigateTo("/");
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
