import { Carousel } from "react-bootstrap";
import "./carousel.css";
import { useTranslation } from "react-i18next";

export default function MyCarousel() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="carousel-cap">{t("features.carousel_title")}</h1>
      <Carousel>
        <Carousel.Item>
          <img className="carousel-img" src="../../public/images/transformation1.png" alt="First slide" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="carousel-img" src="../../public/images/transformation2.png" alt="Second slide" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="carousel-img" src="../../public/images/transformation3.jpeg" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
