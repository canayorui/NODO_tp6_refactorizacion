function crearServicioReservas(datosIniciales) {
  let reservas = [...datosIniciales];

  function listar() {
    return reservas;
  }

  function buscarPorId(id) {
    return reservas.find((reserva) => String(reserva.id) === String(id));
  }

  function contar() {
    return reservas.length;
  }

  function crear(reservaValidada) {
    const nueva = { id: reservas.length + 1, ...reservaValidada };
    reservas.push(nueva);
    return nueva;
  }

  return { listar, buscarPorId, contar, crear };
}

module.exports = crearServicioReservas;
