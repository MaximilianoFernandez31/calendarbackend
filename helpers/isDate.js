const moment = require("moment");

const isDate = (value/* , {req, location, path} */) => {

    if (!value){
        return false;
    }
    
    //le pasamos el valor y se lo asignamos a fecha. Luego chequeamos que sea valida con isValid()
    const fecha = moment(value)

    if (fecha.isValid()) {
        return true;
    }else{
        return false;
    }

} 


module.exports = {
    isDate
}