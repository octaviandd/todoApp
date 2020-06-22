/** @format */

const makeTemplate = () => {
  var mainContainer = document.createElement("div");
  var todoContainer = document.createElement("div");
  var header = document.createElement("header");
  var footer = document.createElement("footer");

  header.innerHTML = "todos";
  footer.innerHTML = `
    <ul>
        <li>Double click to edit a to-do</li>
        <li>Created by Octavian David</li>
    </ul>
  `;

  const todoAllCheckbox = document.createElement("input");
  todoAllCheckbox.setAttribute("type", "checkbox");
  todoAllCheckbox.setAttribute("id", "todos-checkall");

  const todoInput = document.createElement("input");
  todoInput.setAttribute("placeholder", "What needs to be done today?");
  todoInput.setAttribute("id", "todo-input");
  todoInput.setAttribute("type", "text");

  const todos = document.createElement("ul");
  todos.setAttribute("id", "todos-list");

  const todosChecklist = document.createElement("div");
  todosChecklist.setAttribute("id", "todos-checklist");

  // todoChecklist elements  //

  const countSpan = document.createElement("span");
  countSpan.innerHTML = "X item left";
  countSpan.setAttribute("id", "count-todo");

  const todoInputContainer = document.createElement("div");
  todoInputContainer.classList.add("input-container");

  const buttonsContainer = document.createElement("div");
  const allButton = document.createElement("button");
  allButton.setAttribute("id", "all-button");
  allButton.classList.add("checklist-button");
  allButton.innerHTML = "All";

  const activeButton = document.createElement("button");
  activeButton.setAttribute("id", "all-button");
  activeButton.classList.add("checklist-button");
  activeButton.innerHTML = "Active";

  const completedButton = document.createElement("button");
  completedButton.setAttribute("id", "all-button");
  completedButton.classList.add("checklist-button");
  completedButton.innerHTML = "Completed";

  buttonsContainer.appendChild(allButton);
  buttonsContainer.appendChild(activeButton);
  buttonsContainer.appendChild(completedButton);

  todosChecklist.appendChild(countSpan);
  todosChecklist.appendChild(buttonsContainer);

  // //
  todoInputContainer.appendChild(todoAllCheckbox);
  todoInputContainer.appendChild(todoInput);
  todoContainer.appendChild(todoInputContainer);
  todoContainer.appendChild(todos);
  todoContainer.appendChild(todosChecklist);

  mainContainer.appendChild(header);
  mainContainer.appendChild(todoContainer);
  mainContainer.appendChild(footer);

  mainContainer.setAttribute("id", "main-container");
  todoContainer.setAttribute("id", "todos-container");
  header.setAttribute("id", "header");
  footer.setAttribute("id", "footer");

  document.body.appendChild(mainContainer);
};

export default makeTemplate;
