// Punto de entrada: conecta eventos con estado, validación, storage y UI.
import {
  obtenerTareas, establecerTareas, agregarTarea, alternarEstado,
  eliminarTarea, establecerFiltro, tareasFiltradas
} from "./estado.js";
import { validar } from "./validacion.js";
import { guardar, cargar } from "./storage.js";
import { renderizar, mostrarAlertas, marcarFiltroActivo } from "./ui.js";

const form = document.getElementById("formTarea");
const inputTitulo = document.getElementById("titulo");
const inputCurso = document.getElementById("curso");
const inputFecha = document.getElementById("fechaEntrega");
const contFiltros = document.getElementById("filtros");

// Acciones que la UI dispara sobre cada tarea.
const acciones = {
  onAlternar: (id) => { alternarEstado(id); actualizar(); },
  onEliminar: (id) => { eliminarTarea(id); actualizar(); }
};

// Sincroniza: guarda en localStorage y vuelve a dibujar la lista.
function actualizar() {
  guardar(obtenerTareas());
  renderizar(tareasFiltradas(), acciones);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const curso = inputCurso.value.trim();
  const fecha = inputFecha.value;

  const errores = validar(titulo, curso, fecha);
  mostrarAlertas(errores);
  if (errores.length > 0) return;

  agregarTarea(titulo, curso, fecha);
  actualizar();
  form.reset();
  inputTitulo.focus();
});

contFiltros.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filtro]");
  if (!btn) return;
  establecerFiltro(btn.dataset.filtro);
  marcarFiltroActivo(btn);
  renderizar(tareasFiltradas(), acciones);
});

// Inicio: al terminar de cargar el HTML, se restauran y dibujan las tareas guardadas.
document.addEventListener("DOMContentLoaded", () => {
  establecerTareas(cargar());
  renderizar(tareasFiltradas(), acciones);
});