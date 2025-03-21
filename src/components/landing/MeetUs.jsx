import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/landing/meetUs.scss";

const MeetUs = () => {
  return (
    <div className="meet-us">
      <Link to="/instalaciones" className="meet-button">
        Conoce nuestras instalaciones
      </Link>
      <img 
        src="/meetUs/meetUs.jpeg"
        alt="Instalaciones"
        className="facilities-image"
      />
    </div>
  );
};

export default MeetUs;