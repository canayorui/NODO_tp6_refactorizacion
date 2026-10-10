const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const middlewareSolicitudes = require("./middleware/solicitudes");
const crearControladorReservas = require("./controllers/reservas");
const crearRouterReservas = require("./router/reservas");

function crearApp({ servicio, formatoMorgan }) {
  const app = express();
  const controlador = crearControladorReservas(servicio);
  const routerReservas = crearRouterReservas(controlador);

  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  app.set("layout", "./layouts/main");

  app.use(morgan(formatoMorgan));
  app.use(middlewareSolicitudes.identificarSolicitud);
  app.use(middlewareSolicitudes.medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.render("inicio", { titulo: "Inicio" });
  });

  app.get("/estado", (req, res) => {
    res.json({
      servicio: "activo",
      cantidad: servicio.contar(),
      solicitudId: res.locals.solicitudId,
    });
  });
  app.use("/reservas", routerReservas);

  app.use((req, res) => {
    res.status(404).render("no_encontrados", { titulo: "No encontrado" });
  });

  return app;
}

module.exports = crearApp;
