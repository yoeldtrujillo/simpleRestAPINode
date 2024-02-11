import { Request, Response } from "express"

interface Todo {
  id: Number,
  name: string,
  completedAt: Date | null
}

const todos: Todo[] = [
  {id: 1, name: 'Todo 1', completedAt: new Date()}, 
  {id: 2, name: 'Todo 2', completedAt: new Date()},
  {id: 3, name: 'Todo 3', completedAt: new Date()}
]

export class TodosController {

  //* Inección de dependencias
  constructor() {}

  public getTodos = (req: Request, res:Response) => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id
    const todoReturn = todos.find(todo => todo.id === id)

    if(isNaN(id)) {
      return res.status(400).json({Error: `The id type it's not a number`})
    }

    if(!todoReturn) {
      return res.status(404).json({Error: `Todo with id: ${id} not found`})
    }

    return res.status(200).json(todoReturn)
  }

  public createTodo = (req: Request, res:Response) => {

    const {name} = req.body

    if(!name) return res.status(400).json({error: 'Text property is required'})

    const newTodo = {
      id: todos.length + 1,
      name,
      completedAt: new Date()
    }
    todos.push(newTodo)
    res.status(201).json(todos)

  }

  public updateTodo = (req:Request, res:Response) => {

    const id = +req.params.id
    const { name, completedAt} = req.body

    if(isNaN(id)) {
      return res.status(400).json({Error: `The id type it's not a number`})
    }

    const todo = todos.find(todo => todo.id === id)

    if(!todo) {
      return res.status(404).json({Error: `Todo with id: ${id} not found`})
    }

    // if(!name) return res.status(400).json({error: 'Text property is required'})
    
    todo.name = name || todo.name;
    (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt)

    res.json(todo)

  }

  public deleteTodo = (req: Request, res: Response) => {

    const id = +req.params.id

    const todoToDelete = todos.find(todo => todo.id === id)
    if (!todoToDelete) return res.status(404).json({error: `there is no todo with id: ${id}`})

    todos.splice(todos.indexOf(todoToDelete), 1)

    res.status(200).json(todoToDelete)

  }

}