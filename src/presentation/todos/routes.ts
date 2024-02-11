
import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {

  static get routes():Router {

    const router = Router()

    const todoController = new TodosController()

    // *Definición de rutas*
    router.get('/', todoController.getTodos) // Esto se abrevia así, pero podría ser así: router.get('/api/todos', (req, res) => todoController.getTodos(req, res)) cuando tenemos una serie de argumentos que pasamos a la función que se ejecuta en el callback podemos abreviarlo así
    router.get('/:id', todoController.getTodoById)
    router.post('/create', todoController.createTodo)
    router.put('/update/:id', todoController.updateTodo)
    router.delete('/delete/:id', todoController.deleteTodo)

    return router

  }


}