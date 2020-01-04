// create a const that stores everything that is added to localstorage
//everything that is added is added to the key items 
const projectArr = localStorage.getItem("items") 
// if local storage has at least o key:pair value, return an object with the key:pair value
//if not, return an empty array          
  ? JSON.parse(localStorage.getItem("items"))
  : [];
const todoArr = localStorage.getItem("todo")
  ? JSON.parse(localStorage.getItem("todo"))
  : [];

//project counter is set to 0;
  let projectCounter = 0;


//new factory function for todos which set the project counter to dataset and returns the title, date and priority of todo
const Newtodo = (title, date, priority) => {
  const dataset = projectCounter;
  return {
    dataset,
    title,
    date,
    priority
  };
};


// function to add projects to the list
function populateProjects() {
  
  
  
  
  div = document.createElement("div");
  div.classList = "eachproject";
  div.dataset.name = projectArr[projectArr.length - 1].dataset;
  button = document.createElement("button");
  button.classList = "list-button";
  button.innerHTML = projectArr[projectArr.length - 1].title;
  button.dataset.name = projectArr[projectArr.length - 1].dataset;
  button.style.background = projectArr[projectArr.length - 1].priority;
  span = document.createElement("span");
  span.innerHTML = projectArr[projectArr.length - 1].date;
  span.style.float = "right";
  document
    .querySelector(".projects")
    .appendChild(div)
    .appendChild(button);
  document
    .querySelector(".projects")
    .appendChild(div)
    .appendChild(span);
  deleteProject();
}

//brings up new project modal
document.querySelector("#new-project").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "inline";
  document.querySelector("#page-mask").style.display = "inline";
});

//close button inside modal
close = document.querySelectorAll("#close");
close.forEach(function(el) {
  el.addEventListener("click", function() {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".modal-2").style.display = "none";
    document.querySelector("#page-mask").style.display = "none";
  });
});

//creates project and closes modal
document.querySelector("#project").addEventListener("submit", function(e) {
  values = document.querySelector("#project");
  projectArr.forEach(function(el) {
    if (el.title == values.elements["title"].value) {
      values.elements["title"].value = "";
    }
  });
  if (values.elements["title"].value == "") {
    alert("Project already exists!");
  } else {
    document.querySelector(".modal").style.display = "none";
    document.querySelector("#page-mask").style.display = "none";
    e.preventDefault();
    const newProject = Newtodo(
      values.elements["title"].value,
      values.elements["date"].value,
      values.elements["priority"].value
    );
    projectArr.push(newProject);
    localStorage.setItem("items", JSON.stringify(projectArr));
    console.log(localStorage);
    
    populateProjects();
    projectCounter += 1;
    todoList();
  }
});

function defaultProjects() {
  if (projectArr.length < 3) {
    one = Newtodo("The Odin Project", "2019-02-06", "red");
    one.dataset = 0;
    projectArr.push(one);
    two = Newtodo("Hartl", "2018-02-06", "orange");
    two.dataset = 1;
    projectArr.push(two);
    three = Newtodo("YDKJS", "2018-22-02", "green");
    three.dataset = 2;
    projectArr.push(three);
  }
}

window.onload = function() {
  defaultProjects();
  console.log(todoArr);
  for (i = 0; i < projectArr.length; i++) {
    projectArr[i].dataset = i;
    div = document.createElement("div");
    div.classList = "eachproject";
    div.dataset.name = projectArr[i].dataset;
    trash = document.createElement("div");
    button = document.createElement("button");
    button.classList = "list-button";
    button.innerHTML = projectArr[i].title;
    button.dataset.name = projectArr[i].dataset;
    button.style.background = projectArr[i].priority;
    span = document.createElement("span");
    span.innerHTML = projectArr[i].date;
    span.style.float = "right";
    document
      .querySelector(".projects")
      .appendChild(div)
      .appendChild(button);
    document
      .querySelector(".projects")
      .appendChild(div)
      .appendChild(span);
    projectCounter += 1;
    todoList();
  }
  //deleteProject()
};

function deleteProject() {
  trash = document.querySelectorAll("#trashproject");
  trash.forEach(function(el) {
    el.addEventListener("click", function(e) {
      projectArr.splice(el.dataset.name, 1);
      localStorage.setItem("items", JSON.stringify(projectArr));
      location.reload();
    });
  });
}

//opens todo list
let currentProject = "";
function todoList() {
  listButton = document.querySelectorAll(".list-button");
  listButton.forEach(function(e) {
    e.addEventListener("click", function(d) {
      document.querySelector("#page-mask").style.display = "inline";
      document.querySelector(".modal-2").style.display = "inline";
      document.querySelector(".modal-2-header").innerHTML =
        projectArr[e.dataset.name].title;
      currentProject = e.dataset.name;
      populateTodo(currentProject);
    });
  });
}

const TodoChild = dataset => {
  const content = [];

  return {
    check,
    content,
    dataset
  };
};
//adds tasks
document.querySelector(".todo-form").addEventListener("submit", function(e) {
  e.preventDefault();
  todo = document.querySelector(".todo-form");
  todoArr.forEach(function(el) {
    if (el.content == todo.elements["todo"].value) {
      todo.elements["todo"].value = "";
    }
  });
  if (todo.elements["todo"].value == "") {
    alert("Task already exists!");
  } else {
    console.log(todoArr);
    parentdiv = document.querySelector(".todo-list");
    div = document.createElement("div");
    div.classList = "todo-list-item";
    div.innerHTML = todo.elements["todo"].value;
    div.dataset.name = todo.elements["todo"].value;
    newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.classList = "checkbox";
    newCheckBox.dataset.name = todo.elements["todo"].value;
    trash = document.createElement("div");
    trash.classList = "fa fa-trash-o";
    trash.id = "trash";
    trash.dataset.name = todo.elements["todo"].value;
    parentdiv.appendChild(newCheckBox);
    parentdiv.appendChild(trash);
    parentdiv.appendChild(div);
    const taskStorage = TodoChild(currentProject);
    taskStorage.content.push(todo.elements["todo"].value);
    todoArr.push(taskStorage);
    localStorage.setItem("todo", JSON.stringify(todoArr));
    populateTodo(currentProject);
  }
});

function populateTodo(currentProject) {
  const OLD = document.querySelectorAll(".todo-list-item");
  OLD.forEach(function(element) {
    element.remove();
    localStorage.setItem("todo", JSON.stringify(todoArr));
  });
  const OLDCHECK = document.querySelectorAll(".checkbox");
  OLDCHECK.forEach(function(element) {
    element.remove();
    localStorage.setItem("todo", JSON.stringify(todoArr));
  });
  const TRASH = document.querySelectorAll("#trash");
  TRASH.forEach(function(element) {
    element.remove();
    localStorage.setItem("todo", JSON.stringify(todoArr));
  });
  todoArr.forEach(function(el) {
    if (el.dataset == currentProject) {
      parentdiv = document.querySelector(".todo-list");
      div = document.createElement("div");
      div.classList = "todo-list-item";
      div.innerHTML = el.content;
      div.dataset.name = el.content;
      newCheckBox = document.createElement("input");
      newCheckBox.type = "checkbox";
      newCheckBox.classList = "checkbox";
      newCheckBox.dataset.name = el.content;
      trash = document.createElement("div");
      trash.classList = "fa fa-trash-o";
      trash.dataset.name = el.content;
      trash.id = "trash";
      if (el.check == "checked") {
        newCheckBox.checked = true;
      }
      parentdiv.appendChild(newCheckBox);
      parentdiv.appendChild(trash);
      parentdiv.appendChild(div);
    }
  });
  checkBox();
  deleteTodo();
}

function checkBox() {
  test = document.querySelectorAll(".checkbox");
  test.forEach(function(e) {
    e.addEventListener("click", function() {
      for (i = 0; i < todoArr.length; i++) {
        if (todoArr[i].content == e.dataset.name) {
          if (todoArr[i].check != "checked") {
            todoArr[i].check = "checked";
            localStorage.setItem("todo", JSON.stringify(todoArr));
            break;
          } else {
            todoArr[i].check = "unchecked";
            localStorage.setItem("todo", JSON.stringify(todoArr));
            break;
          }
        }
      }
    });
  });
}

function deleteTodo() {
  trash = document.querySelectorAll(".fa-trash-o");
  trash.forEach(function(e) {
    e.addEventListener("click", function() {
      todoArr.forEach(function(element) {
        if (element.content == e.dataset.name) {
          del = document.querySelectorAll("div");
          del.forEach(function(el) {
            if (el.dataset.name == element.content) {
              el.remove();
            }
          });
          del2 = document.querySelectorAll(".checkbox");
          del2.forEach(function(del) {
            if (del.dataset.name == element.content) {
              del.remove();
              todoArr.splice(todoArr.indexOf(element), 1);
              localStorage.setItem("todo", JSON.stringify(todoArr));
            }
          });
        }
      });
    });
  });
}