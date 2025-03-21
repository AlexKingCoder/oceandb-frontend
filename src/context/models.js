const models = {
    clientes: [
      { name: "nombre", label: "Nombre", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "apellidos", label: "Apellidos", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "fecha_nacimiento", label: "Fecha de nacimiento", autoComplete: "off", type: "date", validation: { required: "Este campo es obligatorio" } },
      { name: "dni", label: "DNI", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "nacionalidad", label: "Nacionalidad", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "email", label: "Email", autoComplete: "off", type: "email", validation: { required: "Este campo es obligatorio" } },
      { name: "telefono", label: "Teléfono", autoComplete: "off", type: "tel", validation: { required: "Este campo es obligatorio" } },
      { name: "preferencias", label: "Preferencias", autoComplete: "off", validation: {} }
    ],
    habitaciones: [
      { name: "numero", label: "Número", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "tipo", label: "Tipo", type: "select", options: ["Individual", "Doble", "Suite"], autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "precio", label: "Precio", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "estado", label: "Estado", type: "select", options: ["Disponible"], autoComplete: "off", validation: {} }
    ],
    servicios: [
      { name: "nombre", label: "Nombre", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "descripcion", label: "Descripción", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "precio", label: "Precio", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } }
    ],
    reservas: [
      { name: "cliente_id", label: "Nombre y apellidos", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "habitacion_id", label: "Nº de Habitación", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "fecha_entrada", label: "Fecha Entrada", type: "date", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "fecha_salida", label: "Fecha Salida", type: "date", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "estado", label: "Estado", type: "select", options: ["pendiente", "pagado"], autoComplete: "off", validation: { required: "Este campo es obligatorio" } }
    ],
    servicio_reserva: [
      { name: "reserva_id", label: "ID de la reserva", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "servicio_id", label: "ID del servicio", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      { name: "cantidad", label: "Cantidad", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
    ],
    facturas: [
        { name: "reserva_id", label: "ID de la reserva", type: "number", autoComplete: "off", validation: { required: "Este campo es obligatorio" } },
      ],
  };

export default models;