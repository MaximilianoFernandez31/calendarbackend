const { Router } = require("express");
const {validarJWT} = require("../middlewares/validar-jwt")
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} =require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();


//Todas tienen que pasar por la validacion de token

//Obtener eventos
 router.get("/", validarJWT,
  getEventos);

 //Crear un evento nuevo
 router.post(
    "/", validarJWT,
     [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom( isDate),
        check("end", "Fecha de finalizacion es obligatoria").custom( isDate),
        validarCampos

     ],
    crearEvento);

 //Actualizar evento
 router.put("/:id", validarJWT, actualizarEvento);

 //Obtener eventos
 router.delete("/:id", validarJWT, eliminarEvento);



 module.exports = router;