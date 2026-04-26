import {addProject,addFunctions} from "./logic.js"
import {compareAsc} from "date-fns"

const sidebar = document.querySelector(".sidebar")
const listofProject= document.querySelector(".projectlist")
const listofTodo = document.querySelector(".todolist")
const sort = document.querySelector("#sort")
let listProject

if(localStorage.getItem("projectList"))
{

    listProject=addFunctions(JSON.parse(localStorage.getItem("projectList")))

}
else
{
    addProject("Default")
    listProject=addFunctions(JSON.parse(localStorage.getItem("projectList")))
    listProject[0].addNewTodo("title","description","2004-02-04","1",` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta id eros quis suscipit. Proin ligula ante, tincidunt vel posuere non, condimentum ac ligula. Donec nec eleifend enim. Sed ultricies arcu nec lectus tempor, vitae semper turpis viverra. Nam mattis turpis lacus, vel dignissim magna feugiat id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc nec rutrum augue. Maecenas tincidunt accumsan quam et egestas. Maecenas placerat eu libero quis pulvinar. Quisque tempus, metus eu rutrum tempor, lacus massa efficitur massa, feugiat tincidunt quam turpis in velit. Fusce bibendum justo eget mauris tristique scelerisque. Vivamus consequat, velit vitae aliquet aliquam, mauris erat gravida mauris, ac finibus nisi nunc ac odio. Vestibulum ac purus ut eros condimentum auctor id vel felis.

Pellentesque consequat justo sed faucibus lacinia. Integer vitae tellus euismod, vehicula orci vel, sodales nunc. Aenean sed urna ac odio tincidunt rutrum. Sed imperdiet quam sapien, vitae vestibulum massa ornare pulvinar. Nullam vel ullamcorper urna. Phasellus imperdiet ligula luctus egestas condimentum. Aliquam erat volutpat. Fusce et ante non orci facilisis vehicula. Donec hendrerit vehicula tempor. Proin eget mauris vel dui ornare ultrices. Praesent placerat ipsum id sodales pretium. Quisque fermentum, enim sed iaculis ultrices, ligula metus interdum velit, at porttitor est sapien a nunc. Etiam faucibus tempus nibh in placerat.

Nulla nec sodales nulla. Nunc vitae sapien nunc. Duis pellentesque ornare aliquam. Fusce quis laoreet tellus, a iaculis velit. Quisque et consequat lorem. Nulla facilisi. Nulla gravida, ante et egestas dignissim, nisi sem iaculis elit, quis placerat ligula sem eu nunc. Etiam vel mattis velit, sed euismod quam. Proin eu velit odio. Fusce ac nulla metus. Aenean varius orci in lacus maximus dapibus. Proin nec sem condimentum, cursus est pharetra, posuere enim. Nullam in ligula vitae purus laoreet sollicitudin. Nullam in mollis lorem. Sed eget dui sit amet sapien sagittis congue nec et leo. Nunc euismod eros velit, ut rhoncus augue lacinia non.

Suspendisse non euismod risus. Quisque est diam, scelerisque et dui et, ultricies tempor risus. In dignissim euismod dui, vel auctor libero maximus ac. Phasellus gravida ut erat eu posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean felis mi, tempus sed tempus at, aliquam sed eros. Vivamus dapibus turpis ut ex ornare, vitae feugiat nulla condimentum. Proin elementum dignissim enim nec ultrices. Duis euismod sapien non massa dapibus laoreet.

Cras ut sapien quis augue sollicitudin finibus at id sem. Suspendisse suscipit volutpat lectus, et mollis est tempor quis. Duis in faucibus odio, et porta risus. Quisque malesuada ligula sit amet risus sollicitudin suscipit. Proin sed sapien tempus, sollicitudin sapien a, tempus lacus. Integer id nibh non justo tristique elementum. Nam non aliquam nisl. Donec facilisis libero nec sollicitudin condimentum. Mauris in auctor purus, a ultrices lacus. In in urna malesuada velit efficitur facilisis nec porttitor augue. Suspendisse enim risus, aliquam vel pharetra eu, posuere nec urna. Aenean at eros semper, malesuada felis ac, elementum velit. Aenean et laoreet magna. Nullam maximus dictum aliquam. `)
    listProject[0].addNewTodo("title1","description1","2004-02-02","2","notes1")
    listProject[0].addNewTodo("title2","description2","2004-02-03","3","notes2")

}


// Adds The Project List in 
export function addtoHTML()
{
    listofProject.textContent=""
    listProject.forEach(node =>{
        let projectContainer=document.createElement("div")
        let project = document.createElement("div")
        let deleteAndUpdateContainer = document.createElement("span")
        let projectDelete = document.createElement("button")
        let projectUpdate = document.createElement("button")
        
        project.textContent=node.name
        projectDelete.textContent="Delete"
        projectUpdate.textContent="Update"
        
        projectContainer.className="projectContainer"
        deleteAndUpdateContainer.className="deleteAndUpdateContainer"
        project.className="projectName"
        projectDelete.className="deleteProject"
        projectUpdate.className="updateProject"

        project.addEventListener("click",(e)=>{
            
            sort.addEventListener("change",()=>{
                if(sort.value=="bypriority")
                {
                    node.TodoList.sort(sortByPriority)
                    showListofTodo(node)
                }
                else
                {
                    node.TodoList.sort(sortByDate)
                    showListofTodo(node)
                }
            })
            console.log(listofTodo.textContent)
            showListofTodo(node)
            addTodoForm(node)
        })
        projectDelete.addEventListener("click",()=>{
            listProject.deleteProject(node.projectId)
            listofTodo.textContent=""
            projectContainer.remove()
            
        })
        projectUpdate.addEventListener("click",()=>{
            updateProjectForm(node.projectId,node.name,project)
        })
        deleteAndUpdateContainer.appendChild(projectUpdate)
        deleteAndUpdateContainer.appendChild(projectDelete)
        projectContainer.appendChild(project)
        projectContainer.appendChild(deleteAndUpdateContainer)
        
        listofProject.appendChild(projectContainer)
    })
 
    addToProject()
}

listofTodo.addEventListener("click",()=>{console.log(listofTodo.textContent)})


// Shows List of Todo
function showListofTodo(node)
{   
    listofTodo.textContent=""
    node.TodoList.forEach(todo=>{
        TodoToHTML(todo,node)
    })
}

function sortByPriority(todoA,todoB){
    return todoA.priority<todoB.priority
}
function sortByDate(todoA,todoB){
    return compareAsc(todoA.dueDate,todoB.dueDate) 
}
//ADDS THE LIST OF TODO PER PROJECT
function TodoToHTML(todo,project)
{
    let toDo=document.createElement("div")
    let title = document.createElement("div")
    let description=document.createElement("div")
    let dueDate = document.createElement("div")
    let priority =document.createElement("div")
    let notes=document.createElement("div")
    let deleteButton=document.createElement("button")
    let updateButton = document.createElement("button")

    title.textContent=todo.title
    description.textContent=todo.description
    dueDate.textContent=todo.dueDate
    priority.textContent=todo.priority
    notes.textContent=todo.notes
    deleteButton.textContent="Delete ToDo"
    updateButton.textContent="Update ToDo"
    toDo.className="TodoCard"

    title.className="todoTitle";
    description.className="todoDescription";
    dueDate.className="todoDueDate";
    priority.className="todoPriority";
    notes.className="todoNotes";
    deleteButton.className="todoDelete"
    updateButton.className="todoUpdate"

    toDo.appendChild(title)
    toDo.appendChild(description)
    toDo.appendChild(dueDate)
    toDo.appendChild(priority)
    toDo.appendChild(notes)
    toDo.appendChild(deleteButton)
    toDo.appendChild(updateButton)

    deleteButton.addEventListener("click",()=>{
        project.deleteTodo(todo.id)
        toDo.remove()
    })

    updateButton.addEventListener("click",()=>{
        updateToDoForm(todo.id,
            todo.title,todo.description,
            todo.dueDate,todo.priority,
            todo.notes,project)

    })

    listofTodo.appendChild(toDo)
}




//ADDS A PROJECT VIA DIALOG
function addToProject()
{
    const addProj= document.querySelector(".addbar > div")
    const addProjButton = document.querySelector(".addProject")
    const closebutton = document.querySelector(".addProjectForm .closeForm")
    removeListeners()
    addProj.addEventListener("click",showAddProjForm)
    addProjButton.addEventListener("click",addProjectToTheList)
    closebutton.addEventListener("click",closeAddProjectForm)

}

function removeListeners()
{
    const addProj= document.querySelector(".addbar > div")
    const addProjButton = document.querySelector(".addProject")
    const closebutton = document.querySelector(".addProjectForm .closeForm")

    addProj.removeEventListener("click",showAddProjForm)
    addProjButton.removeEventListener("click",addProjectToTheList)
    closebutton.removeEventListener("click",closeAddProjectForm)
}


function showAddProjForm()
{
    const addProjForm = document.querySelector(".addProjectForm")
    addProjForm.showModal()
}

function addProjectToTheList()
{
    const projectName=document.querySelector(".addProjectForm [name=\"Name\"]")
    const addProjForm = document.querySelector(".addProjectForm")

    addProject(projectName.value)
    listProject=addFunctions(JSON.parse(localStorage.getItem("projectList")))
    addtoHTML()
    addProjForm.close()
}

function closeAddProjectForm()
{
    const addProjForm = document.querySelector(".addProjectForm")
    addProjForm.close()
}

function addTodoForm(project)
{
    const addToDoForm = document.querySelector(".addTodoForm")
    const addtodobar = document.querySelector(".addtodobar > div")
    const addTodoButton = document.querySelector(".addTodo")
    const closebutton=document.querySelector(".addTodoForm .closeForm")
    
    removeAddTodoListener()
    
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
function removeAddTodoListener(){
    console.log("was Here")
    const addtodobar = document.querySelector(".addtodobar > div")
    const addTodoButton = document.querySelector(".addTodo")

    addtodobar.removeEventListener("click",showTodoForm)
    addTodoButton.removeEventListener("click",addTodo)
}


function addTodo(e)
{
    let title=document.querySelector(".addTodoForm [name=\"title\"]").value
    let description=document.querySelector(".addTodoForm [name=\"description\"]").value
    let duedate=document.querySelector(".addTodoForm [name=\"duedate\"]").value
    let priority=document.querySelector(".addTodoForm [name=\"priority\"]").value
    let notes=document.querySelector(".addTodoForm [name=\"notes\"]").value
    e.currentTarget.project.addNewTodo(title,description,duedate,priority,notes)
    e.currentTarget.addToDoForm.close()
    showListofTodo(e.currentTarget.project)
}

function showTodoForm(e){
    console.log(e.currentTarget.project.name)
    e.currentTarget.addToDoForm.showModal()
}


function updateToDoForm(id,title,description,dueDate,priority,notes,project){
    const body = document.querySelector("body")
    let toDoDialog=document.createElement("dialog")

    // let titleLabel = document.createElement("label")
    // let descriptionLabel = document.createElement("label")
    // let dueDateLabel = document.createElement("label")
    // let priorityLabel = document.createElement("label")
    // let notesLabel = document.createElement("label")

    let titleInput = document.createElement("input")
    let descriptionInput = document.createElement("input")
    let dueDateInput = document.createElement("input")
    let priorityInput = document.createElement("input")
    let notesInput = document.createElement("textarea")

    let titleDiv = document.createElement("div")
    let descriptionDiv =document.createElement("div")
    let dueDateDiv = document.createElement("div")
    let priorityDiv =document.createElement("div")

    let closeButton = document.createElement("button")
    let updateButton = document.createElement("button")

    // titleLabel.textContent="Title:"
    // descriptionLabel.textContent="Description:"
    // dueDateLabel.textContent="Due Date:"
    // priorityLabel.textContent="Priority:"
    // notesLabel.textContent="Notes:"

    titleInput.className="todoTitle";
    descriptionInput.className="todoDescription";
    dueDateInput.className="todoDueDate";
    priorityInput.className="todoPriority";
    notesInput.className="todoNotes";

    toDoDialog.className="TodoCard";
    toDoDialog.classList.add("toDoDialog")
    updateButton.className="todoUpdate"
    closeButton.className="todoDelete"

    titleDiv.className="todoTitle";
    descriptionDiv.className="todoDescription";
    dueDateDiv.className="todoDueDate";
    priorityDiv.className="todoPriority";

    
    dueDateInput.setAttribute("type","date")
    priorityInput.setAttribute("type","number")
    priorityInput.setAttribute("min","1")
    priorityInput.setAttribute("max","10")

    titleInput.value=title
    descriptionInput.value=description
    dueDateInput.value=dueDate
    priorityInput.value=priority
    notesInput.value=notes

    updateButton.textContent="Update"
    closeButton.textContent="Close"
    
    // titleDiv.appendChild(titleLabel)
    titleDiv.appendChild(titleInput)

    // descriptionDiv.appendChild(descriptionLabel)
    descriptionDiv.appendChild(descriptionInput)

    // dueDateDiv.appendChild(dueDateLabel)
    dueDateDiv.appendChild(dueDateInput)

    // priorityDiv.appendChild(priorityLabel)
    priorityDiv.appendChild(priorityInput)

    // notesDiv.appendChild(notesLabel)
    //notesDiv.appendChild(notesInput)

    toDoDialog.appendChild(titleDiv)
    toDoDialog.appendChild(descriptionDiv)
    toDoDialog.appendChild(dueDateDiv)
    toDoDialog.appendChild(priorityDiv)
    toDoDialog.appendChild(notesInput)
    toDoDialog.appendChild(updateButton)
    toDoDialog.appendChild(closeButton)
    body.appendChild(toDoDialog)

    toDoDialog.showModal()

    closeButton.addEventListener("click",()=>{
        toDoDialog.close()
        toDoDialog.remove()
    })

    updateButton.addEventListener("click",()=>{
        project.updateTodo(id
            ,titleInput.value
            ,descriptionInput.value
            ,dueDateInput.value
            ,priorityInput.value
            ,notesInput.value)
        console.log(project.TodoList[0].title)
        showListofTodo(project)
        toDoDialog.close()
        toDoDialog.remove()

    })


}

function updateProjectForm(id,name,project){
    const body = document.querySelector("body")
    let projectDialog=document.createElement("dialog")
    let nameLabel = document.createElement("label")
    let nameInput = document.createElement("input")
    let nameDiv = document.createElement("div")
    let closeButton = document.createElement("button")
    let updateButton = document.createElement("button")
    
    nameLabel.textContent="Name:"
    nameInput.value=name

    closeButton.textContent="Close"
    updateButton.textContent="Update"

    nameDiv.appendChild(nameLabel)
    nameDiv.appendChild(nameInput)

    projectDialog.appendChild(nameDiv)
    projectDialog.appendChild(updateButton)
    projectDialog.appendChild(closeButton)

    body.appendChild(projectDialog)
    


    projectDialog.showModal()

    closeButton.addEventListener("click",()=>{
        projectDialog.close()
        projectDialog.remove()
    })

    updateButton.addEventListener("click",()=>{
        listProject.updateName(id,nameInput.value)
        project.textContent=nameInput.value
        projectDialog.close()
        projectDialog.remove()

    })
}