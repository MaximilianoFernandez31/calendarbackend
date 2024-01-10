const {response} = require("express")
const { validationResult } = require("express-validator")

//traemos el response de express y lo igualamos a req, de esta manera vamos a tener acceso a la ayuda de visual code studio
const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){ 
        return res.status(400).json({
          ok: false,
          errors: errors.mapped() 
        })
      }

      //si no hay error pasa al next
      next()
}


module.exports= {
    validarCampos 
}