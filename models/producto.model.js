import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  talla: String,
  color: String,
  precio: Number
});

export default mongoose.model("Producto", productoSchema);
