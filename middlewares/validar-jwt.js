const {response} = require("express");
const { restart } = require("nodemon");
const jwt = require("jsonwebtoken")

const validarJWT = (req, res = response , next) => {

    //x-token headers

    const token = req.header("x-token");

    console.log(token)

    if(!token) {
        return res.status(401).json({
            ok: false,
            msn: "No hay token en la peticion"
        })
    }


    try {
        const /* payload */ {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        
        /* console.log(payload)  -Vemos por consola lo que trae dentro el payload*/

        //Tomamos el objeto de la request y obtenemos el uid y el name

            req.uid = /* payload. */uid;
            req.name = /* payload. */name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msn: "Token invalido"
        })
    }

    next();

}





module.exports = {
    validarJWT
}