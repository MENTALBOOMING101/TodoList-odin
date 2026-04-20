class Project {
  constructor(name) {
    this.name=name
    this.TodoList=[]
  }
  addNewTodo(title,description,dueDate,priority,notes){
    this.TodoList.push(new Todo(title,description,dueDate,priority,notes))
  }
  deleteTodo(id){
    this.TodoList=this.TodoList.filter(!((element)=>{
        return element.id==id
    }))

  }
}
class Todo {
    constructor(title,description,dueDate,priority,notes){
        this.id=crypto.randomUUID()
        this.title=title
        this.description=description
        this.dueDate=dueDate
        this.priority=priority
        this.notes=notes
    }

    updateTodo(title,description,dueDate,priority,notes){
        this.title=title
        this.description=description
        this.dueDate=dueDate
        this.priority=priority
        this.notes=notes
    }

}
