
// Setting constants for localStorage * if empty, return [], if not return an object with key items and it's value

const projectStorage = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
const toDoStorage = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
let projectCounter = 0

//Factory function for a new todo Project.

const Newtodo = (title, date, priority) => {
    const dataset = projectCounter;
    return {
      dataset,
      title,
      date,
      priority
    };
  };


function deleteProject(){
    let allRemoveButtons = document.querySelectorAll('.delete-button');
    allRemoveButtons.forEach(function(el){
        el.addEventListener('click', function(e){
            e.preventDefault();
            console.log(el.dataset.name);
            projectStorage.splice(el.dataset.name, 1);
            localStorage.setItem("items", JSON.stringify(projectStorage));
            location.reload();
        })
    })
}

function populateProjects(){
    let newDiv = document.createElement("div");
    newDiv.classList = "eachproject";
    newDiv.dataset.name = projectStorage[projectStorage.length - 1].dataset;

    let newButton = document.createElement('button');
    newButton.classList = "list-button";
    newButton.dataset.name = projectStorage[projectStorage.length - 1].dataset;
    newButton.innerHTML = projectStorage[projectStorage.length -1].title
    newButton.style.background = projectStorage[projectStorage.length -1].priority;

    let newSpan = document.createElement('span');
    newSpan.innerHTML = projectStorage[projectStorage.length -1].date
    newSpan.style.float = "right"
    let deleteButton = document.createElement('button')
    deleteButton.classList = 'delete-button'
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.dataset.name = projectStorage[projectStorage.length - 1].dataset;
    
    
    document
    .querySelector(".projects")
    .appendChild(newDiv)
    .appendChild(newButton)
    document
    .querySelector(".projects")
    .appendChild(newDiv)
    .appendChild(newSpan)
    document
    .querySelector('.projects')
    .appendChild(newDiv)
    .appendChild(deleteButton)    
    
    
    deleteProject();
}




document.querySelector('#add-project-button').addEventListener('click', function(){
    document.querySelector(".projects-modal").style.display = "inline";
    document.querySelector(".page-mask").style.display = "inline";
})


let close = document.querySelectorAll('#close');
close.forEach(function(e){
    e.addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector('.projects-modal').style.display = "none"
        document.querySelector('.page-mask').style.display = "none"
        document.querySelector('.todos-modal').style.display = "none"
    })
})


//Clear Fiedls

function clearProjectFields(){
         projectTitle = document.querySelector('#project-name').value = ''
         projectDate = document.querySelector('#project-date').value = ''
         projectPriority = document.querySelector('#project-priority').value = ''
}

document.querySelector('#project').addEventListener('submit', function(e){
    e.preventDefault();
    let projectTitle = document.querySelector('#project-name');
    let projectDate = document.querySelector('#project-date');
    let projectPriority = document.querySelector('#project-priority');

    projectStorage.forEach(function(el) {
        if (el.title == projectTitle.value) {
          projectTitle.value = "";
        }
      });

        if(projectTitle.value == ""){
            alert('Name already picked')
        }else{
            document.querySelector(".projects-modal").style.display = "none";
            document.querySelector(".page-mask").style.display = "none";
            const newProject = Newtodo(projectTitle.value, projectDate.value, projectPriority.value);
          
            projectStorage.push(newProject)
            localStorage.setItem("items", JSON.stringify(projectStorage))
            
            populateProjects();
            projectCounter++;
            todoList();
            clearProjectFields();
        }
    
    
        
    
})


let currentProject = '';
function todoList(){
    document.querySelectorAll('.list-button').forEach(function(e){
        e.addEventListener('click', function(d){
            d.preventDefault()
            document.querySelector(".page-mask").style.display = "inline";
            document.querySelector(".todos-modal").style.display = "inline";
            document.querySelector('.modal-2-header').innerHTML = projectStorage[e.dataset.name].title
            document.querySelector('.modal-2-header')
                                .style.background = projectStorage[e.dataset.name].priority
                                

                                                    
            
            currentProject = e.dataset.name
            populateTodo(currentProject)
            
        })
    })
}

todoList();


function defaultProjects(){
    if(projectStorage.length < 2){
        let firstProject = Newtodo("Homework", "20-11-2020", "#00C851")
        firstProject.dataset = 0
        projectStorage.push(firstProject)
        
    
        let secondProject = Newtodo("Groceries", "09-05-2020", "#ff4444")
        secondProject.dataset = 1
        projectStorage.push(secondProject)
    }
}


window.onload = function(){
    defaultProjects();
    
    for(let i=0; i< projectStorage.length; i++){
        projectStorage[i].dataset = i;
        let newDiv = document.createElement("div");
        newDiv.classList = "eachproject";
        newDiv.dataset.name = projectStorage[i].dataset;
        
        
        let button = document.createElement("button");
        button.classList = "list-button";
        button.innerHTML = projectStorage[i].title;
        button.dataset.name = projectStorage[i].dataset;
        button.style.background = projectStorage[i].priority;
        
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList = "delete-button"
        deleteButton.dataset.name = projectStorage[i].dataset;
        let span = document.createElement("span");
        span.innerHTML = projectStorage[i].date;
        span.style.float = "right";

        document
            .querySelector(".projects")
            .appendChild(newDiv)
            .appendChild(button)
        document
            .querySelector(".projects")
            .appendChild(newDiv)
            .appendChild(span);

        document
            .querySelector(".projects")
            .appendChild(newDiv)
            .appendChild(deleteButton)
        
        
        projectCounter++;
        
        
        
        todoList();
        deleteProject();
    }
}




const TodoChild = (dataset) =>{
    const content = [];
    let check;
    return {check, dataset, content,}
}



let form = document.querySelector('.todo-form');
form.addEventListener('submit', function(e){
        e.preventDefault();
        let list = document.querySelector('.todo-list')
        let taskValue = document.querySelector('.task-input').value
        
        toDoStorage.forEach(function(e) {
            if (e.content == taskValue) {
              taskValue = "";
            }
          });
    
            if(taskValue == ""){
                alert('Name already picked')
            } else {
                let div = document.createElement("div");
                div.classList = "todo-list-item";
                div.innerHTML = taskValue
                div.dataset.name = taskValue
                

                let newCheckBox = document.createElement('input');
                newCheckBox.type = 'checkbox'
                newCheckBox.dataset.name = taskValue
                newCheckBox.classList = 'checkbox'
                
                let trash = document.createElement('div')
                trash.classList = "fas fa-trash"
                trash.id = "trash"
                trash.dataset.name = taskValue

                list.appendChild(div);
                list.appendChild(newCheckBox)
                list.appendChild(trash)
                const taskStorage = TodoChild(currentProject)
                taskStorage.content.push(taskValue)
                
                
                toDoStorage.push(taskStorage)
                localStorage.setItem("todo", JSON.stringify(toDoStorage))
                console.log(currentProject);
                
                populateTodo(currentProject)
                clearToDoField();
 
            }
})



function clearToDoField () {
     taskValue = document.querySelector('.task-input').value = ''
}



function populateTodo(currentProject){
    const OLD = document.querySelectorAll(".todo-list-item");
    OLD.forEach(function(element) {
      element.remove();
      localStorage.setItem("todo", JSON.stringify(toDoStorage));
      
      
    });
    const OLDCHECK = document.querySelectorAll(".checkbox");
    OLDCHECK.forEach(function(element) {
      element.remove();
      localStorage.setItem("todo", JSON.stringify(toDoStorage));
    });

    const OLDTRASH = document.querySelectorAll("#trash");
    OLDTRASH.forEach(function(element){
        element.remove();
        localStorage.setItem("todo", JSON.stringify(toDoStorage))
    })

    toDoStorage.forEach(function(e){
        if(e.dataset == currentProject){
            let list = document.querySelector('.todo-list')
            let div = document.createElement('div');
            div.classList = "todo-list-item";
            div.dataset.name = e.content;
            div.innerHTML = e.content;
            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";
            newCheckBox.classList = "checkbox";
            newCheckBox.style.float = "right"
            newCheckBox.dataset.name = e.content;
            
            let trash = document.createElement('div');
            trash.classList = "fas fa-trash"
            trash.id = "trash"
            trash.dataset.name = e.content

            if (e.check == "checked") {
                newCheckBox.checked = true;
              }
            div.appendChild(newCheckBox)
            div.appendChild(trash)
            list.appendChild(div);

            
        }
    }) 
    checkBox();
    trashButton();
}

function checkBox() {
    let allCheckBoxes = document.querySelectorAll('.checkbox');
    allCheckBoxes.forEach(function(el){
        el.addEventListener('click', function(){
                for(let i = 0; i < toDoStorage.length ; i ++){
                    if (toDoStorage[i].content == el.dataset.name){
                        if (toDoStorage[i].check != "checked"){
                            toDoStorage[i].check = "checked";
                            localStorage.setItem("todo", JSON.stringify(toDoStorage));
                            break;
                        } else {
                            toDoStorage[i].check = "unchecked";
                            localStorage.setItem("todo", JSON.stringify(toDoStorage));
                            
                        }
                    }
                } 
        })
    })
}

function trashButton (){
    let trash = document.querySelectorAll('#trash');
    trash.forEach(function(e){
        e.addEventListener('click', function(){
            toDoStorage.forEach(function(element){
                if (element.content == e.dataset.name){
                    let del = document.querySelectorAll('div')
                    del.forEach(function(parameter){
                        if (parameter.dataset.name == element.content){
                            parameter.remove();
                            toDoStorage.splice(toDoStorage.indexOf(element), 1);
                            localStorage.setItem("todo", JSON.stringify(toDoStorage));
                        }
                    })
                }
            })
        })
    })
}
