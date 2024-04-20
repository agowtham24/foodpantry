import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Header } from "../shared/header/header";
import { Footer } from "../shared/footer/footer";
export function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Header />
      <section className="bodyy">
        <Slider {...settings}>
          <img src="./donation3.jpg" alt="" className="slickimage" />
          <img src="./fooddonation1.webp" alt="" className="slickimage" />
          <img src="./fooddonation2.webp" alt="" className="slickimage" />
        </Slider>
        <div className="row m-0 mt-5 justify-content-center">
          <div className="col-8">
            <div className="h6 text-center">About Us</div>
            <p>
              The primary role of the pantry is storing food donations and then
              passing them on to people experiencing hunger. In addition to
              food, local pantries also provide other resources such as clothing
              and even hygiene products. Pantries are a win-win solution. Each
              Pantry has a defined geographic area, and local residents can
              become members. Members pay a small amount each week, and in
              return, they choose at least ten items of food or other groceries,
              worth many times more. Pantry cabinets were mostly used for
              storing food. But, like everything else, they too evolved into a
              much more important part of everyday life. Now, aside from storing
              food, pantries can be used to organize utensils, pots, and pans,
              for storing spices, bowls, boards, and other kitchen necessities.
              Hundreds of years ago, when pantries were first used, they were
              stores for bread. The word “pantry” derives from “pain”, the
              French for “bread”. A traditional pantry may also include a stone
              shelf, sometimes called a “thrawl”, which would be used as a
              larder to keep food cool
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
