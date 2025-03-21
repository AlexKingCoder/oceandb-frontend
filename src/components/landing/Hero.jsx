import { useState, useEffect } from "react";
import "../../styles/landing/hero.scss";

const images = [
  "/hero/hero1.jpeg",
  "/hero/hero2.jpeg",
  "/hero/hero3.jpeg",
  "/hero/hero4.jpeg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      {images.map((img, index) => (
        <div
          key={index}
          className={`hero__image ${index === currentImage ? "visible" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}
      <div className="hero__text">
        <h1>Bienvenido a Ocean Experience Hotel</h1>
        <p>Vive el lujo y una experiencia personal en cada estancia</p>
      </div>
    </div>
  );
};

export default Hero;