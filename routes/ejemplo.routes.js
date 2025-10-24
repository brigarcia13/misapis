import {Router} from 'express';
import { getAllEjemplos, getEjemploByid,postEjemplo, putEjemeplo,deleteEjemplo

} from '../controllers/ejemplo.controller.js';
const ejemplo = Router();

ejemplo.get('/', getAllEjemplos );

ejemplo.get('/:id', getEjemploByid);


ejemplo.put('/', putEjemeplo);

 ejemplo.post('/', postEjemplo);

 ejemplo.delete('/:id', deleteEjemplo);

 export default ejemplo;