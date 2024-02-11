import { Router } from "express";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {

  static get routes():Router {

    const router = Router()

    // *Definición de rutas*
    router.use('/api/todos', TodoRoutes.routes)
    return router

  }

}