const express = require("express"); //configuracion basica de express
const { dbConnection } = require("./database/config");
require("dotenv").config() //para usar las variables de entorno en env
const cors = require("cors");

console.log(process.env)


///Crear el servidor de express
const app = express();

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio Publico
app.use(express.static("public")) //en express use es un middleware, es una funcion que va a ejecutarsae cuando pase por un lugar. ES decir se ejecuta cuando alguien hace una peticion al servidor.

//Lectura y parseo del body
app.use(express.json()) //Lo que este en formato json las procesamos aquí y extraemos su contenido.


//Rutass
app.use("/api/auth", require("./routes/auth")); //todo lo que exporte routes/auth lo va a habilitar en api/auth
/* app.get("/", (req, res) => { //el cliente pedirá algo y esperará una respuesta

    res.json({
        ok: true
    })
}) */

app.use("/api/events", require("./routes/events"))


app.get("*", (req, res) => {
        res.sendFile(__dirname + "/public/index.html")
})


//Escuchar peticiones
app.listen(process.env.PORT, () => {//reemplazamos el puerto por process.env de donde sacamos PORT de  env
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})