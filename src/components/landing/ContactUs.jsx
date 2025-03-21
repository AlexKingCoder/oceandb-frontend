import React from "react";
import "../../styles/landing/contactUs.scss";

const ContactUs = () => {
  return (
    <section className="contact-us">
      <h2>¿Eres empresa?</h2>
      <p>
        Solicita un usuario temporal para testear nuestra base de datos OceanDB.
        Escribe a <a href="mailto:agz.articulos@gmail.com">agz.articulos@gmail.com</a> y te
        proporcionaremos un usuario de recepción y otro de gerente.
      </p>
    </section>
  );
};

export default ContactUs;