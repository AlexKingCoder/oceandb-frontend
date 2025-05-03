import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/instalaciones/facilities.scss";

const Facilities = () => {
  const instalaciones = [
    {
      titulo: "Habitaciones a tu gusto",
      descripcion: "Elije entre habitación individual, doble o suite. Ya sea para pasar una noche tranquila o unas vacaciones en familia, ¡tenemos la habitación perfecta para ti!",
      imagenes: [
        { url: "/instalaciones/habitaciones/individual.jpeg", descripcion: "Habitación Individual" },
        { url: "/instalaciones/habitaciones/doble.jpeg", descripcion: "Habitación Doble" },
        { url: "/instalaciones/habitaciones/suite.jpeg", descripcion: "Habitación Suite" }
      ]
    },
    {
      titulo: "Restaurante World Star",
      descripcion: "Disfruta de la mejor gastronomía mundial. Cocina tradicional, italiana, francesa, asiática... Elijas la que elijas, cada plato es una obra maestra.",
      imagenes: [
        { url: "/instalaciones/restaurante/plato1.jpeg", descripcion: "Pavo relleno con almendras, tomates y romero" },
        { url: "/instalaciones/restaurante/plato2.jpeg", descripcion: "Merluza al limón con salsa secreta" },
        { url: "/instalaciones/restaurante/plato3.jpeg", descripcion: "Pizza italiana de quesos con trufa" },
        { url: "/instalaciones/restaurante/plato4.jpeg", descripcion: "Tallarines de Yun Tal con apio y sémola" }
      ]
    },
    {
      titulo: "Spa de lujo",
      descripcion: "Relájate en nuestras instalaciones de vanguardia, con tratamientos exclusivos para revitalizar cuerpo y mente.",
      imagenes: [
        { url: "/instalaciones/spa/servicio1.jpeg", descripcion: "Jacuzzi privado y sauna de lujo" },
        { url: "/instalaciones/spa/servicio2.jpeg", descripcion: "Masajes asiáticos relajantes" },
        { url: "/instalaciones/spa/servicio3.jpeg", descripcion: "Sala de meditación privada" }
      ]
    }
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="instalaciones-container">
      {instalaciones.map((instalacion, index) => (
        <div key={index} className="instalacion">
          <div className="text-container">
            <h2>{instalacion.titulo}</h2>
            <p>{instalacion.descripcion}</p>
          </div>
          <div className="carousel-container">
            <Slider {...settings}>
              {instalacion.imagenes.map((img, i) => (
                <div key={i} className="slide">
                  <div className="image-container">
                    <img src={img.url} alt={img.descripcion} />
                    <p className="image-caption">{img.descripcion}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;