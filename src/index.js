const leerConfiguracion = require("./configuracion");
const crearApp = require("./app");

const { port, entorno } = leerConfiguracion();
const app = crearApp();

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port} (${entorno})`);
});
