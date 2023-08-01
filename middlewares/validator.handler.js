const boom = require('@hapi/boom');

// creación de middlewares dinámicos con closures
function validatorHandler(schema, property){
    return (req, res, next) =>{
        const data = req[property]
        const {error} = schema.validate(data, {abortEarly: false}); 
        //el abortEarly hace que mande todos los errores en vez de uno por uno
        if(error){
            next(boom.badRequest(error))
        }
        next();
    }
}

module.exports = validatorHandler;