/** @format */

const todoInputElement = document.getElementById("todo-input");
const body = document.querySelector("body");
const todosChecklistElement = document.querySelector("#todo-checklist");
const todoCountElement = document.querySelector("#count-todo");

console.log(todoInputElement);

const Factory = {
  listeonForInput: () => {
    document.addEventListener("click", (e) => {
      if (e.target.getAttribute("id") === "todo-input") {
        console.log(e.target);
        document
          .getElementById("todo-input")
          .addEventListener("keypress", (e) => {
            if (e.keyCode === 13) console.log("done");
          });
      }
    });
  },
};

const todoLogic = () => {
  Factory.listeonForInput();
};

export default todoLogic;
