import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js'
import * as db from '../db/cnn_mongodb.js';
export default class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute ='/api/';
        this.conectarDBMongo();

        this.middlewares();
        this.routes();
    }
    async conectarDBMongo(){
        if(!db.isConected){
            await db.conectarAMongoDB();

        }
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }
    routes(){
       // localhost:000/api/ejemplo
       this.app.use(this.generalRoute, indexRoutes);
         this.app.use((req, res) => {
        res.status(404).json({
            msg: 'ruta no encontrada'
        });
     });
    }

    
    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', `${this.port}`.yellow);
        });

    }
}