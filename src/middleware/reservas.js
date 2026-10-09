function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  const body = req.body || {};
  const normalizar = v => typeof v === "string" ? v.trim() : "";
  const estudiante = normalizar(body.estudiante);
  const email = normalizar(body.email);
  const sala = normalizar(body.sala);
  const fecha = normalizar(body.fecha);
  const turno = normalizar(body.turno);
  const personasTexto = normalizar(body.personas);
  const personas = Number(personasTexto);

  const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
  const turnosPermitidos = ["Mañana", "Tarde", "Noche"];
  const valores = { estudiante, email, sala, fecha, turno, personas: personasTexto };

  const fechaValida = /^\d{4}-\d{2}-\d{2}$/.test(fecha) &&
    !Number.isNaN(Date.parse(fecha)) &&
    new Date(`${fecha}T00:00:00Z`).toISOString().slice(0, 10) === fecha;

  if (!estudiante || !email.includes("@") || !salasPermitidas.includes(sala) ||
      !fechaValida || !turnosPermitidos.includes(turno) ||
      !Number.isInteger(personas) || personas < 1 || personas > 6) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: "Datos inválidos",
      valores
    });
  }

  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
  next();
}

module.exports = { prepararAreaReservas, validarReserva };
