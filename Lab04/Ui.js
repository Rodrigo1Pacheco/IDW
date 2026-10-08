// Todo lo que manipula el DOM.
import { parseFechaLocal } from "./validacion.js";

const divAlertas = document.getElementById("alertas");
const lista = document.getElementById("listaTareas");

export function mostrarAlertas(errores) {
  divAlertas.textContent = "";
  errores.forEach(msg => {
    const p = document.createElement("p");
    p.textContent = msg;
    divAlertas.appendChild(p);
  });
}

function crearElementoTarea(tarea, { onAlternar, onEliminar }) {
  const li = document.createElement("li");
  li.className = "tarea" + (tarea.completada ? " completada" : "");
  li.dataset.id = tarea.id;

  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = tarea.completada;
  check.setAttribute("aria-label", "Marcar como completada");
  check.addEventListener("change", () => onAlternar(tarea.id));

  const info = document.createElement("div");
  info.className = "info";

  const titulo = document.createElement("div");
  titulo.className = "titulo";
  titulo.textContent = tarea.titulo;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${tarea.curso} - Entrega: ${parseFechaLocal(tarea.fechaEntrega).toLocaleDateString("es")}`;

  info.append(titulo, meta);

  const btnEliminar = document.createElement("button");
  btnEliminar.className = "eliminar";
  btnEliminar.type = "button";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", () => onEliminar(tarea.id));

  li.append(check, info, btnEliminar);
  return li;
}

export function renderizar(tareas, acciones) {
  lista.textContent = "";

  if (tareas.length === 0) {
    const li = document.createElement("li");
    li.className = "vacio";
    li.textContent = "No hay tareas para mostrar.";
    lista.appendChild(li);
    return;
  }

  tareas.forEach(t => lista.appendChild(crearElementoTarea(t, acciones)));
}

export function marcarFiltroActivo(botonActivo) {
  document.querySelectorAll("#filtros button").forEach(b =>
    b.classList.toggle("activo", b === botonActivo)
  );
}