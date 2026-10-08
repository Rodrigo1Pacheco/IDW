// Validación del formulario.

export function parseFechaLocal(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

export function validar(titulo, curso, fecha) {
  const errores = [];

  if (!titulo) errores.push("El título es obligatorio.");
  if (!curso) errores.push("El curso es obligatorio.");

  if (!fecha) {
    errores.push("La fecha de entrega es obligatoria.");
  } else {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (parseFechaLocal(fecha) <= hoy) {
      errores.push("La fecha de entrega debe ser posterior a la fecha actual.");
    }
  }

  return errores;
}