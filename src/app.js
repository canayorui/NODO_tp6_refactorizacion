const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const middlewareSolicitudes = require("./middleware/solicitudes");
const crearServicioReservas = require("./services/reservas");
const crearControladorReservas = require("./controllers/reservas");
const crearRouterReservas = require("./router/reservas");

function crearApp() {
  const app = express();

  // Configuración de vistas
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
  app.set("layout", "./layouts/main");

  // Pipeline
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(middlewareSolicitudes.identificarSolicitud);
  app.use(middlewareSolicitudes.medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Servicio y controlador
  const servicio = crearServicioReservas([
    { id: 1, estudiante: "Ana", email: "ana@mail.com", sala: "Sala Norte", fecha: "2026-09-22", turno: "Mañana", personas: 2 },
    { id: 2, estudiante: "Luis", email: "luis@mail.com", sala: "Sala Sur", fecha: "2026-09-23", turno: "Tarde", personas: 4 },
    { id: 3, estudiante: "María", email: "maria@mail.com", sala: "Sala Multimedia", fecha: "2026-09-24", turno: "Noche", personas: 3 },
    { id: 4, estudiante: "Pedro", email: "pedro@mail.com", sala: "Sala Norte", fecha: "2026-09-25", turno: "Mañana", personas: 1 }
  ]);
  const controlador = crearControladorReservas(servicio);
  const routerReservas = crearRouterReservas(controlador);

  // Rutas principales
  app.get("/", (req, res) => {
    res.render("inicio", { titulo: "Inicio" });
  });

  app.get("/estado", (req, res) => {
    res.json({
      servicio: "activo",
      cantidad: servicio.contar(),
      solicitudId: res.locals.solicitudId
    });
  });

  app.use("/reservas", routerReservas);

  // 404 final
  app.use((req, res) => {
    res.status(404).render("no_encontrados", { titulo: "No encontrado" });
  });

  return app;
}

module.exports = crearApp;
