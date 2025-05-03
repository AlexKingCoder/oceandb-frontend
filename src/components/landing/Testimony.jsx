import React from "react";
import "../../styles/landing/testimony.scss";

const testimonies = [
  {
    name: "Lucía Saval",
    role: "Cliente",
    stars: "⭐⭐⭐⭐⭐",
    text: "Mi trabajo es muy exigente, pero cada vez que descanso en el spa del hotel me quedo como nueva. 100% recomendado."
  },
  {
    name: "Gema Olivares",
    role: "Cliente",
    stars: "⭐⭐⭐⭐⭐",
    text: "Las habitaciones son excelentes y totalmente insonorizadas. Perfectas tanto si quieres trabajar como descansar."
  },
  {
    name: "Pablo González",
    role: "Cliente",
    stars: "⭐⭐⭐⭐⭐",
    text: "El restaurante sirve platos únicos en el mundo, ¡literal! Y si te cuesta elegir, déjate sorprender. Aciertas seguro."
  },
];

const Testimony = () => {
  return (
    <section className="testimony">
      {testimonies.map((testimony, index) => (
        <div key={index} className="testimony-box">
          <h3>{testimony.name}</h3>
          <p>{testimony.role}</p>
          <p className="stars">{testimony.stars}</p>
          <p>{testimony.text}</p>
        </div>
      ))}
    </section>
  );
};

export default Testimony;