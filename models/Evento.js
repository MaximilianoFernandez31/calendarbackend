const {Schema, model/* mongoose */} = require("mongoose")

const EventoSchema = Schema({
    
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start:{
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
        //Usuario es el nombre del otro Schema.
    }
})


EventoSchema.method("toJSON", function() {
    const {__v, _id, ...object} =  this.toObject();
    object.id = _id;
    return object;
})


module.exports = model("Evento", EventoSchema)