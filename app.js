
import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import { productRouter } from "./src/routes/product.routes.js";
import { orderRouter } from "./src/routes/order.routes.js";
import { usersRouter } from "./src/routes/user.routes.js";
import loginRouter from "./src/routes/login.routes.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Usar __dirname con path.join correctamente
const staticPath = join(__dirname, 'public');  // Ruta estática correcta

const app = express();
dotenv.config();
connectionMongo();
app.use(cors());

app.use(express.json()); 
app.use('/productos', productRouter);
app.use("/ordenes", orderRouter);
app.use('/usuarios', usersRouter);
app.use('/iniciarSesion', loginRouter);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(staticPath));  // Aquí debes usar staticPath con __dirname

// Ruta principal para servir index.html
app.get("/", (req, res) => {
  res.sendFile(join(staticPath, "index.html"));  
});

export default app;
