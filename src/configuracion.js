function leerConfiguracion() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`PORT inválido: ${process.env.PORT}`);
  }
  const entorno = process.env.NODE_ENV || "development";
  return { port, entorno };
}

module.exports = leerConfiguracion;
