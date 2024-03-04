//Son los contorladores de las rutas

//Llamamos de nuevo a express y se lo asignamos a res para poder tener la ayuda del intellisense, que al escribir nos vaya ayudando
const {response} = require("express");
const Usuario = require("../models/Usuario")
/* const { validationResult } = require("express-validator"); */
const bcrypt = require("bcryptjs"); 
const {generarJWT} = require("../helpers/jwt")

const crearUsuario = async (req, res =  response) => { 

   /*  console.log(req.body)  */ //sacamos la informacion de la request, en este caso body

    /* const {name, email, password} = req.body; */ //se extrae lo que se necesita para registrarse y loguearse
    //*USO DE LA BASE DE DATOS DE MONGO
    
    const {email, password} = req.body;
  
    try {

    
        let usuario = await Usuario.findOne({email})

        
  
        if(usuario){
          return res.status(400).json({ //se le agrega el status(400 o otro codigo dependiendo lo que pase, en este caso es un error 400)
            //Retorna eso si efectivamente se cumple, sino continua 
              ok: false,
              msg: "Ya existe un usuario con ese correo"
          })
        }

        usuario = new Usuario( req.body) //le enviamos el req.body, ya no es necesario desestructurarlo porque mongoose sabe lo que necesitamos, que son las tres cosas que desestructuramos anteriormente
        
        //Encriptar contraseña
            const salt = bcrypt.genSaltSync()
            usuario.password = bcrypt.hashSync(password, salt)

        
        await usuario.save() //se espera hasta que se graba
        
        //Generar JWT

        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            /* msg: "register", */
        /*  name,
            email,
            password */
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        })
    }




    //*sin base de datos
    //manejo de errores
    //validationResult viene de express. Hacemos el manejo de errores en otro archivo
   /*  const errors = validationResult(req)
    if (!errors.isEmpty()){ //si no esta vacio de errores
        return res.status(400).json({
          ok: false,
          errors: errors.mapped() //para mostrar los errores usamos mapped()
        })
      } */

    /* res.status(201).json({
        ok: true,
        msg: "register", */
        /* user: req.body */
      /*   name,
        email,
        password */
    /* }) */

}


const loginUsuario = async (req, res = response) => { 

    const {email, password} = req.body; 

    try {
        
        let usuario = await Usuario.findOne({email})

        
  
        if(!usuario){
          return res.status(400).json({
              ok: false,
              msg: "El usuario no existe con ese email"
              ///No es recomendable decirle al usuario en que se equivocó, sino decirle que hubo un error en usuario o email
          })
        }


        //Confirmar password
         const validPassword = bcrypt.compareSync(password, usuario.password)

         if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: "Password incorrecto"
                })
         }

         //Generar nuesto JSON WEB TOKEN (JWT)
         const token = await generarJWT(usuario.id, usuario.name)

         res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
         })

         

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contactese con el administrador"
        })
    }

}


const revalidarToken = async (req, res = response) => { 
    
    /* const uid = req.uid;
    const name = req.name; */

    const {uid, name} = req;

    //Generar JWT
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,       
        token, uid,
        name,
    })
}



//podemos tener muchas cosas para exportar, por eso creamos un objeto
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}