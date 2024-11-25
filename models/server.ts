import express, { Application }  from "express";
import userRouter from "../routes/usuarios";


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Definicion de rutas
        this.routes();
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