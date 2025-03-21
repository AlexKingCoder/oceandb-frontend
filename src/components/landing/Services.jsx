import React from "react";
import "../../styles/landing/services.scss";

const services = [
  {
    logo: "/services/service1.png",
    title: "Habitaciones exclusivas",
    description: "Elije tu habitación premium preferida."
  },
  {
    logo: "/services/service2.png",
    title: "Restaurante 5 Estrellas",
    description: "Menú a la carta con los mejores platos del mundo."
  },
  {
    logo: "/services/service3.png",
    title: "Spa de Lujo",
    description: "Relájate con nuestros exclusivos masajes."
  },
  {
    logo: "/services/service4.png",
    title: "Servicios Premium",
    description: "Cenas románticas, fiestas privadas, y mucho más."
  }
];

const Services = () => {
  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div className="service-item" key={index}>
          <img src={service.logo} alt={service.title} className="service-logo" />
          <div className="service-details">
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;