/** @format */
import Todo from "./Todo";
import { todosArray } from "./localStorage";
import makeTemplate from "./makeTemplate";

let todoCount = 0;

function init() {
  makeTemplate();
  populate();
}

function populate() {
  loadTodos();
  let todosInput = document.querySelector("#todo-input");

  todosInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      let todoText = todosInput.value;
      createTodo(todoText, todoCount);
      todosInput.value = "";
    }
  });

  deleteTodo();
  checkTodo();
}

function updateTotalTodos(num) {
  let todosTotal = document.querySelector("#count-todo");
  if (num === 1) {
    todosTotal.innerHTML = num + " item left";
  } else {
    todosTotal.innerHTML = num + " items left";
  }
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
  todoCheckboxLabel.setAttribute("for", `checkbox-${todoCount}`);
  todoCheckBox.setAttribute("id", `checkbox-${todoCount}`);
  todoCheckBox.setAttribute("dataset-count", todoCount);
  todoCheckBox.classList.add("todo-checkbox");
  todoCheckBox.setAttribute("type", "checkbox");

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

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("dataset-count", todoCount);
  deleteButton.classList.add("delete-button-class");
  deleteDiv.classList.add("delete-button");
  deleteButton.innerHTML = "X";
  deleteDiv.appendChild(deleteButton);
  deleteDiv.classList.add("delete-button");

  //Appen new todo
  const newTodo = new Todo(text, todoCount);
  todosArray.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todosArray));
  todoCount++;

  todosLI.appendChild(checkBoxDiv);
  todosLI.appendChild(contentDiv);
  todosLI.appendChild(deleteDiv);

  todosUL.appendChild(todosLI);
  checkTodo();
  deleteTodo();
  let todosArrayCount = todosArray.filter((todo) => !todo.checked);
  updateTotalTodos(todosArrayCount.length);
}

function deleteTodo() {
  let todosDeleteButtons = document.querySelectorAll(".delete-button-class");
  todosDeleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let target = e.target.getAttribute("dataset-count");
      console.log(target);
      for (let i = 0; i < todosArray.length; i++) {
        if (todosArray[i].id == target) {
          todosArray.splice(i, 1);
          localStorage.setItem("todos", JSON.stringify(todosArray));
          let todosArrayCount = todosArray.filter((todo) => !todo.checked);
          updateTotalTodos(todosArrayCount.length);
        }
      }
      let parentEl = button.parentNode.parentNode.parentNode;
      parentEl.removeChild(button.parentNode.parentNode);
    });
  });
}

function checkTodo() {
  let todosCheckButtons = document.querySelectorAll(".todo-checkbox");
  todosCheckButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let target = e.target.getAttribute("dataset-count");
      for (let i = 0; i < todosArray.length; i++) {
        if (todosArray[i].id == target) {
          if (todosArray[i].checked === false) {
            todosArray[i].checked = true;
          } else if (todosArray[i].checked === true) {
            todosArray[i].checked = false;
          }
        }
        let todosArrayCount = todosArray.filter((todo) => !todo.checked);
        updateTotalTodos(todosArrayCount.length);
        localStorage.setItem("todos", JSON.stringify(todosArray));
      }
    });
  });
}

function checkAllTodos() {}

function deleteAllTodos() {
  localStorage.clear();
  todosArray = [];
}

// LOAD TODOS FROM LOCAL STORAGE //

function loadTodos() {
  let todosCount = todosArray.filter((todo) => !todo.checked);
  updateTotalTodos(todosCount.length);
  todosArray.map((todo) => {
    todoCount++;
    let todosUL = document.querySelector("#todos-list");
    const todosLI = document.createElement("li");

    const checkBoxDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const deleteDiv = document.createElement("div");

    //Checkbox div
    const todoCheckBox = document.createElement("input");
    const todoCheckboxLabel = document.createElement("label");
    todoCheckboxLabel.setAttribute("for", `checkbox-${todo.id}`);
    todoCheckBox.setAttribute("id", `checkbox-${todo.id}`);
    todoCheckBox.setAttribute("dataset-count", todo.id);
    todoCheckBox.classList.add("todo-checkbox");
    todoCheckBox.setAttribute("type", "checkbox");
    todo.checked ? todoCheckBox.setAttribute("checked", true) : null;

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
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button-class");
    deleteButton.innerHTML = "X";
    deleteButton.setAttribute("dataset-count", todo.id);
    deleteDiv.classList.add("delete-button");

    deleteDiv.appendChild(deleteButton);

    todosLI.appendChild(checkBoxDiv);
    todosLI.appendChild(contentDiv);
    todosLI.appendChild(deleteDiv);

    todosUL.appendChild(todosLI);
  });
}

export default init;
