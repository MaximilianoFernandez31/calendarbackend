const { response } = require("express")
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    
        //con find() traemos todos los eventos
        const eventos = await Evento.find()
                                    .populate("user", "name")
                              //si se necesita rellenar los datos, necesitamos expecificarle a .populate la referencia(user), y de allí sacamos lo que necesitamos(name en est caso)
        res.json({
            ok: true,
            eventos
        })
}
/* {
    ok: true,
    msg: "obtener eventos"
} */



const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body)

    try {

        //el id del usuario lo sacamos del request.uid
        //Debemos llamar al modelo y allí a la propiedad user, en donde su type es objectId
        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Hable con el administrador"
            })
    }

}
/* {
    ok: true,
    msg: "crearEvento"
} */




const actualizarEvento = async (req, res = response) => {

    //se puede tomar el valor del id que viene del url, de los params de request, sacamos la id
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //verificamos que el evento estpe en la base de datos
        const evento = await Evento.findById(eventoId);

        if (!evento) {
          return res.status(404).json({
                ok: false,
                msg: "No existe evento con esa id"
            })
        }

        // verificamos si la persona que quiere actuliar el evento es el mismo que creó el evento
        //pasamos el user a String para poder compararlo con la id
        if(evento.user.toString() !== uid){
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene privilegio para acceder"
                })
        }

        //creamos nuevoEvento, dentro esparcimos todo el body, y adicionalmente colocamos user que es igual al uid
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //creamos otraconstante de eventoActualizado, luego usamos findByIdAndUpdate, es decir que busque el evento por el id y lo actualice con nuevo evento
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})
        //Al enviarle la actualizzacion no se actualiza automaticamente en postman, pero si actualizamos la base de datos, va a verse actualizado.
        //Cuando se actualiza regresa por defecto el viejo documento para realizar alguna comparacion con el nuevo. 
        //Si se requiere que regrese los datos actualizados ponemos como tercer argumento en findByIdAndUpdate {new: true}

        //
        res.json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}
/* {
    ok: true,
    msg: "actualizar evento"
} */




const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //verificamos que el evento estpe en la base de datos
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "No existe evento con esa id"
            })
        }


        if(evento.user.toString() !== uid){
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene privilegio para acceder"
                })
        }

        /* const nuevoEvento = {
            ...req.body,
            user: uid
        } */

        /* const eventoActualizado = */ await Evento.findByIdAndDelete(eventoId)
        
        res.json({
            ok: true/* ,
            evento: eventoActualizado */
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

    
}
/* {
    ok: true,
    msg: "eliminarEvento"
} */


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento

}