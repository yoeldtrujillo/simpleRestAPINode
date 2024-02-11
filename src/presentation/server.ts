import express, { Router } from 'express';
import path from 'path';

interface Options {

  port: number
  routes: Router
  public_path?: string

}

export class Server {

  private app = express();

  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor(options: Options){
    const {port, public_path = 'public', routes} = options
    this.port = port
    this.publicPath = public_path
    this.routes = routes
  }

  async start() {

    //Los middlewares no son más que funciones que se ejecutan antes de que lleguen a las rutas
    this.app.use(express.json()) // Permite raw - json en el body
    this.app.use(express.urlencoded({extended:true})) //permite x-www-form-url-encoded
  
    //Public folder
    //app.use es llamado cada vez que se hace una petición al servidor y sirve para definir middlewares
    this.app.use(express.static(this.publicPath))

    //* Routes
    this.app.use(this.routes)


    // *Cualquier ruta que no sea una de las definidas, se redirige a index.html*
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
      return
    })

    
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
    
  }

}