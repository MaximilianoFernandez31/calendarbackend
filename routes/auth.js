/* 
    Rutas de usuarios / Auth
    host + /api/auth

    Las rutas de este archivo iran colocadas luego de esta path.
*/


const {Router /* express */} = require("express");
const { crearUsuario, loginUsuario, revalidarToken} = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJWT} =require("../middlewares/validar-jwt")

const router = Router(); //ejecutamos la funcion de Router


///get, post, put, delete. Dependerá de lo que se necesite, por ejemplo para crear un nuevo usuario usamos POST, ya que va a postear nueva informacion que van a recibir.

//CONFIGURACIONES DE RUTAS: estas se le agregan a la ruta api/auth

/* router.post("/new", (req, res) => { //el cliente pedirá algo y esperará una respuesta. Ahora en lugar de uasr app.get, será router.get
    res.json({
        ok: true,
        msg: "register"
    })
})  */


//llevamos la logica hacia el auth de controllers
router.post("/new",
[ //middlwares express-validator
        //se usa check, es un middldeware que se va a encargar de validar un campo, el primer argumento es el nombre del campo, el segundo la descripcion del error.
        //Ademas de esto necesitamos hacer el manejo de errores en el auth de controllers
    check("name", "el nombre es obligatorio").not().isEmpty(), //no esta vacío
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe tener minimo 6 caracteres").isLength({min: 6}),
    validarCampos
], 
crearUsuario )

router.post("/",
    [
        check("email", "el email es obligatorio").isEmail(),
        check("password", "el password debe tener minimo 6 caracteres").isLength({min: 6}),
        validarCampos
    ], loginUsuario) 

router.get("/renew", validarJWT, revalidarToken) 



module.exports = router; //asi se exporta en node