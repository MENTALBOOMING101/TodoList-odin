
class Project {
  constructor(name) {
    this.projectId=Math.floor(Math.random()*100000000000)
    this.name=name
    this.TodoList=[]
  }
}
class Todo {
    constructor(title,description,dueDate,priority,notes){
        this.id=Math.floor(Math.random()*100000000000)
        this.title=title
        this.description=description
        this.dueDate=dueDate
        this.priority=priority
        this.notes=notes
    }
}



  export function addProject(name){
    let projectList=JSON.parse(localStorage.getItem("projectList"))
    if (projectList)
    {  
      projectList.push(new Project(name))
      localStorage.setItem("projectList",JSON.stringify(projectList))
    }
    else{
      projectList=[]
      projectList.push(new Project(name))
      localStorage.setItem("projectList",JSON.stringify(projectList))
    }
  }
  
  export function addFunctions(projectList){
    projectList.updateName= function(id,name){
      let projectIndex=projectList.findIndex((project)=>project.id==id)
      projectList[projectIndex].name=name
      localStorage.setItem("projectList",JSON.stringify(projectList))
    }
    projectList.deleteProject = function(id){
      projectList=projectList.filter((node)=>!(node.projectId==id))
      localStorage.setItem("projectList",JSON.stringify(projectList))
    }
    projectList.forEach((node)=>{

      node.addNewTodo=function(title,description,dueDate,priority,notes){
        this.TodoList.push(new Todo(title,description,dueDate,priority,notes))
        localStorage.setItem("projectList",JSON.stringify(projectList))
      }
      node.deleteTodo=function(id){
        this.TodoList=this.TodoList.filter((element)=> !(element.id==id))
        localStorage.setItem("projectList",JSON.stringify(projectList))
      }
      node.updateTodo=function(id,title,description,dueDate,priority,notes){
        let todoIndex=this.TodoList.findIndex((todo)=>todo.id==id)
        this.TodoList[todoIndex].title=title
        this.TodoList[todoIndex].description=description
        this.TodoList[todoIndex].dueDate=dueDate
        this.TodoList[todoIndex].priority=priority
        this.TodoList[todoIndex].notes=notes 
        localStorage.setItem("projectList",JSON.stringify(projectList))
      }
    })

    return projectList
  }
