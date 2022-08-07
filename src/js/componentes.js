import { todoList } from "..";
import { Todo } from "../classes";

// Referencias al DOM
const divTodoList = document.querySelector(".todo-list");
const input = document.querySelector(".new-todo");
const deleteButton = document.querySelector(".clear-completed");

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class=${todo.completado ? "completed" : ""} data-id=${todo.id}>
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);
  return div.firstElementChild;
};

// Events
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && input.value.length > 0) {
    const nuevoTodo = new Todo(input.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    input.value = "";
  }
});

divTodoList.addEventListener("click", (e) => {
  const nombreElemento = e.target.localName;
  const todoDiv = e.target.parentElement.parentElement;
  const todoId = todoDiv.getAttribute("data-id");

  if (nombreElemento.includes("input")) {
    todoList.marcarCompletado(todoId);
    todoDiv.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoDiv);
  }
});

deleteButton.addEventListener("click", () => {
  todoList.eliminarCompletados();
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});
