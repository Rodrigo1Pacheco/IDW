// Estado de la aplicación: arreglo de tareas y filtro actual.
// Estructura de cada tarea: { id, titulo, curso, fechaEntrega, completada }
let tareas = [];
let filtroActual = "todas";

export function obtenerTareas() {
  return tareas;
}

export function establecerTareas(nuevasTareas) {
  tareas = nuevasTareas;
}

export function agregarTarea(titulo, curso, fechaEntrega) {
  const nuevoId = tareas.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  tareas = [...tareas, { id: nuevoId, titulo, curso, fechaEntrega, completada: false }];
}

export function alternarEstado(id) {
  tareas = tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t);
}

export function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
}

export function buscarTarea(id) {
  return tareas.find(t => t.id === id);
}

export function establecerFiltro(filtro) {
  filtroActual = filtro;
}

export function tareasFiltradas() {
  if (filtroActual === "pendientes") return tareas.filter(t => !t.completada);
  if (filtroActual === "completadas") return tareas.filter(t => t.completada);
  return tareas;
}