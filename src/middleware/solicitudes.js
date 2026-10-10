let contadorSolicitud = 1;

function identificarSolicitud(req, res, next) {
  res.locals.solicitudId = `BIB-${String(contadorSolicitud).padStart(4, "0")}`;
  contadorSolicitud += 1;
  next();
}

function medirDuracion(req, res, next) {
  const inicio = Date.now();

  res.on("finish", () => {
    const duracion = Date.now() - inicio;
    console.log(
      `${res.locals.solicitudId} ${req.method} ${req.originalUrl} ${res.statusCode} ${duracion}ms`,
    );
  });

  next();
}

module.exports = { identificarSolicitud, medirDuracion };
