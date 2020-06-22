/** @format */
import Todo from "./Todo";
import { todosArray } from "./localStorage";

console.log(todosArray);

let todoCount = 1;

function init() {
  window.onload = () => {
    listeonForInput();
    loadTodos();
  };
}

function loadTodos() {
  todosArray.map((todo) => {
    let todosUL = document.querySelector("#todos-list");
    const todosLI = document.createElement("li");

    const checkBoxDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const deleteDiv = document.createElement("div");

    //Checkbox div
    const todoCheckBox = document.createElement("input");
    const todoCheckboxLabel = document.createElement("label");
    todoCheckboxLabel.setAttribute("for", "checkbox");
    todoCheckBox.setAttribute("id", "checkbox");
    todoCheckBox.setAttribute("dataset-count", todo.id);
    todoCheckBox.classList.add("todo-checkbox");
    todoCheckBox.setAttribute("type", "checkbox");

    checkBoxDiv.appendChild(todoCheckBox);
    checkBoxDiv.appendChild(todoCheckboxLabel);
    checkBoxDiv.classList.add("round");

    //Content div
    const todoContent = document.createElement("span");
    todoContent.classList.add("todo-content");
    todoContent.setAttribute("dataset-count", todo.id);
    todoContent.textContent = todo.text;

    contentDiv.appendChild(todoContent);

    //Delete div
    const todoDeleteBox = document.createElement("input");
    todoDeleteBox.setAttribute("dataset-count", todo.id);
    todoDeleteBox.setAttribute("type", "checkbox");
    todoDeleteBox.setAttribute("dataset-count", todoCount);
    todoDeleteBox.classList.add("todo-delete");

    deleteDiv.appendChild(todoDeleteBox);

    todosLI.appendChild(checkBoxDiv);
    todosLI.appendChild(contentDiv);
    todosLI.appendChild(deleteDiv);

    todosUL.appendChild(todosLI);
  });
}

init();

function listeonForInput() {
  let todosInput = document.querySelector("#todo-input");

  todosInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      let todoText = todosInput.value;
      createTodo(todoText, todoCount);
      todosInput.value = "";
    }
  });
}

function createTodo(text) {
  if (text === undefined) return;
  let todosUL = document.querySelector("#todos-list");
  const todosLI = document.createElement("li");

  const checkBoxDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const deleteDiv = document.createElement("div");

  //Checkbox div

  const todoCheckBox = document.createElement("input");
  const todoCheckboxLabel = document.createElement("label");
  todoCheckboxLabel.setAttribute("for", "checkbox");
  todoCheckBox.classList.add("todo-checkbox");
  todoCheckBox.setAttribute("id", "checkbox");
  todoCheckBox.setAttribute("type", "checkbox");
  todoCheckBox.setAttribute("dataset-count", todoCount);

  checkBoxDiv.appendChild(todoCheckBox);
  checkBoxDiv.appendChild(todoCheckboxLabel);
  checkBoxDiv.classList.add("round");

  //Content div

  const todoContent = document.createElement("span");
  todoContent.classList.add("todo-content");
  todoContent.setAttribute("dataset-count", todoCount);
  todoContent.textContent = text;

  contentDiv.appendChild(todoContent);

  //Delete div

  const todoDeleteBox = document.createElement("input");
  todoDeleteBox.setAttribute("type", "checkbox");
  todoDeleteBox.classList.add("todo-delete");
  todoDeleteBox.setAttribute("dataset-count", todoCount);

  deleteDiv.appendChild(todoDeleteBox);

  //Appen new todo
  const newTodo = new Todo(text, todoCount);
  todosArray.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todosArray));
  todoCount++;

  todosLI.appendChild(checkBoxDiv);
  todosLI.appendChild(contentDiv);
  todosLI.appendChild(deleteDiv);

  todosUL.appendChild(todosLI);
}

function deleteTodo(id) {
  console.log(id);
}

function checkTodo(id) {}

function checkAllTodos() {}

function deleteAllTodos() {
  localStorage.clear();
  todosArray = [];
}

export default init;
