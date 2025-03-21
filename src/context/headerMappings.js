const headerMappings = {
    clientes: {
      id: "ID",
      nombre: "Nombre",
      apellidos: "Apellidos",
      fecha_nacimiento: "Fecha de Nacimiento",
      dni: "DNI",
      nacionalidad: "Nacionalidad",
      email: "Email",
      telefono: "Teléfono",
      preferencias: "Preferencias",
    },
    habitaciones: {
      id: "ID",
      numero: "Número",
      tipo: "Tipo",
      precio: "Precio",
      estado: "Estado",
    },
    reservas: {
      id: "ID",
      cliente: "Cliente",
      habitacion: "Habitación",
      fecha_entrada: "Fecha de Entrada",
      fecha_salida: "Fecha de Salida",
      estado: "Estado"
    },
    servicios: {
      id: "ID",
      nombre: "Nombre del Servicio",
      descripcion: "Descripción",
      precio: "Precio",
    },
    servicio_reserva: {
      id: "ID",
      reserva_id: "ID Reserva",
      servicio_id: "ID Servicio",
      cantidad: "Cantidad",
      precio_unitario: "Precio Unitario",
      precio_total: "Precio Total",
      nombre: "Nombre",
      descripcion: "Descripción"
    },
    facturas: {
      id: "ID",
      reserva_id: "ID Reserva",
      nombre_cliente: "Cliente",
      total: "Total",
      fecha_emision: "Fecha de Emisión",
    },
  };

export default headerMappings;