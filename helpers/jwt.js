const jwt = require("jsonwebtoken")


    //Deberia recibir lo que necesitamos colocar como payload del token, en este caso es uid y name
const generarJWT = (uid, name) => {
            //jwt por si mismo no funciona con promesas, por lo que debemos crear una promesa y trabajar dentro.
            //dentro irá el payload y el jwt.sign el cual servira para firmar el token, que dentro debe tener el payload y PrivateKey, y otras opciones como cuanto tiempo dura el token, con expiresIn.
            //Podemos crear el PrivateKey en env y luego llamarlo.
            //Luego de las opciones va un callback, que se va a disparar con una error si es que hay error, o con un token si esta todo bien.
            //este se utiliza en este ejemplo en auth.js de controllers, se crea tanto en el a creacion de usuario como en el login de usuario
    return new Promise((resolve,reject) => {
            const payload = {uid,  name}

            jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn:"2h"},
            (err, token) => {
                if (err){
                    reject("no se puedo generar el token")
                }

                resolve(token);
                    
            })

    })

}




module.exports = {
    generarJWT
}