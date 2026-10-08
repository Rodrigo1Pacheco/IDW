// Persistencia con localStorage.

const STORAGE_KEY = "tareasUniversitarias";

export function guardar(tareas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  } catch (e) {
    console.error("No se pudo guardar en localStorage:", e);
  }
}

export function cargar() {
  try {
    const datos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(datos) ? datos : [];
  } catch (e) {
    return [];
  }
}