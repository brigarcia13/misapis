import { Router } from "express";
import producto from "./producto.routes.js";

const indexRoutes = Router();

indexRoutes.use('/confecciones', producto);

export default indexRoutes;

