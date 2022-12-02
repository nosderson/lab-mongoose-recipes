//ARQUIVO PRINCIPAL
import express from "express";
import * as dotenv from "dotenv";

// Import of the model Recipe from './models/Recipe.model.js'
import connect from "./config/db.config.js";
import recipeRoute from './routes/recipe.routes.js';
import userRoute from './routes/user.routes.js';

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();
//Roda o express

const app = express();
//configurar o servidor para aceitar JSON
app.use(express.json());
//conectando com o sgbd
connect()

app.use("/recipe", recipeRoute);
app.use('/user', userRoute);

// SERVIDOR RODANDO 
app.listen(process.env.PORT, () => {
    console.log(`App up and running on http://localhost:${process.env.PORT}`)
})