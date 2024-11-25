import express, { Application }  from "express";
import userRouter from "../routes/usuarios";

import cors from 'cors'


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        //Middlewares
        this.middlewares();

        // Definicion de rutas
        this.routes();

    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public'));
    }


    routes(){
        this.app.use( this.apiPaths.usuarios, userRouter  )
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }


}

export default Server;