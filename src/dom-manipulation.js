import {addProject,addFunctions} from "./logic.js"

const sidebar = document.querySelector(".sidebar")
const listofProject= document.querySelector(".projectlist")
const listofTodo = document.querySelector(".todolist")

let listProject

if(localStorage.getItem("projectList"))
{

    listProject=addFunctions(JSON.parse(localStorage.getItem("projectList")))

}
else
{
    addProject("Default")
    listProject=addFunctions(JSON.parse(localStorage.getItem("projectList")))
    listProject[0].addNewTodo("title","description","dueDate","priority","notes")
    listProject[0].addNewTodo("title1","description1","dueDate1","priority1","notes1")
    listProject[0].addNewTodo("title2","description2","dueDate2","priority2","notes2")
}


// Adds The Project List in 
export function addtoHTML(){
listofProject.textContent=""
listProject.forEach(node =>{
    let project = document.createElement("div")
    
    project.textContent=node.name
    
    project.addEventListener("click",(e)=>{
        showListofTodo(node)
        toTodoForm(node)
    })
    
    listofProject.appendChild(project)
})
addToProject()
}
function showListofTodo(node){
    listofTodo.textContent=""
    node.TodoList.forEach(todo=>{
        TodoToHTML(todo)
    })
}

//ADDS THE LIST OF TODO PER PROJECT
function TodoToHTML(todo){
    let toDo=document.createElement("div")
    let title = document.createElement("div")
    let description=document.createElement("div")
    let dueDate = document.createElement("div")
    let priority =document.createElement("div")
    let notes=document.createElement("div")

    title.textContent=todo.title
    description.textContent=todo.description
    dueDate.textContent=todo.dueDate
    priority.textContent=todo.priority
    notes.textContent=todo.notes

    toDo.className="TodoCard"

    toDo.appendChild(title)
    toDo.appendChild(description)
    toDo.appendChild(dueDate)
    toDo.appendChild(priority)
    toDo.appendChild(notes)
    
    listofTodo.appendChild(toDo)
}
//ADDS A PROJECT VIA DIALOG
function addToProject(){
const addProj= document.querySelector(".addbar > div")
const addProjForm = document.querySelector(".addProjectForm")
const addProjButton = document.querySelector(".addProject")
const closebutton = document.querySelector(".addProjectForm .closeForm")
const projectName=document.querySelector(".addProjectForm [name=\"Name\"]")

addProj.addEventListener("click",()=>{
    addProjForm.showModal()
})

addProjButton.addEventListener("click",()=>{
    addProject(projectName.value)
    listProject=addFunctions(JSON.parse(localStorage.getItem("projectList")))
    addtoHTML()
    addProjForm.close()

})

closebutton.addEventListener("click",()=>{
    addProjForm.close()
})

}
function toTodoForm(project){
    const addToDoForm = document.querySelector(".addTodoForm")
    const addtodobar = document.querySelector(".addtodobar")
    const addTodoButton = document.querySelector(".addTodo")
    const closebutton=document.querySelector(".addTodoForm .closeForm")
    
    addtodobar.removeEventListener("click",showTodoForm)
    addTodoButton.removeEventListener("click",addTodo)
    
    addtodobar.project=project
    addtodobar.addToDoForm=addToDoForm
    addTodoButton.project=project
    addTodoButton.addToDoForm=addToDoForm

    addtodobar.addEventListener("click",showTodoForm)
    addTodoButton.addEventListener("click",addTodo)
    closebutton.addEventListener("click",()=>{
        addToDoForm.close()
    })

}
function addTodo(e){
    let title=document.querySelector(".addTodoForm [name=\"title\"]").value
    let description=document.querySelector(".addTodoForm [name=\"description\"]").value
    let duedate=document.querySelector(".addTodoForm [name=\"duedate\"]").value
    let priority=document.querySelector(".addTodoForm [name=\"notes\"]").value
    let notes=document.querySelector(".addTodoForm [name=\"notes\"]").value
    e.currentTarget.project.addNewTodo(title,description,duedate,priority,notes)
    e.currentTarget.addToDoForm.close()
    showListofTodo(e.currentTarget.project)
}

function showTodoForm(e){
    console.log(e.currentTarget.project.name)
    e.currentTarget.addToDoForm.showModal()
}