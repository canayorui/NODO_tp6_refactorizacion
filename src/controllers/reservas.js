function crearControladorReservas(servicio) {
  return {
    listado(req, res) {
      res.render("reservas/lista", {
        titulo: "Listado",
        reservas: servicio.listar(),
      });
    },
    formulario(req, res) {
      res.render("reservas/nueva", {
        titulo: "Nueva reserva",
        error: null,
        valores: {},
      });
    },
    detalle(req, res) {
      const reserva = servicio.buscarPorId(req.params.id);
      if (!reserva)
        return res
          .status(404)
          .render("no_encontrados", { titulo: "No encontrado" });
      res.render("reservas/detalle", { titulo: "Detalle", reserva });
    },
    crear(req, res) {
      servicio.crear(req.reservaValidada);
      res.redirect("/reservas");
    },
  };
}

module.exports = crearControladorReservas;
