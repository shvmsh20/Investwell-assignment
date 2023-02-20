const Joi = require("joi");

const signUpSchema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password")
})


const signUpValidate = (req, res, next)=>{
    const {error} = signUpSchema.validate(req.body);
    if(error){
        const { details } = error; 
        const message = details.map(i => i.message).join(',');
        //console.log(error);5
        return res.send(message);
    }else{
        next();
    }
}

const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const signInValidate = (req, res, next)=>{
    const {error} = signInSchema.validate(req.body);
    if(error){
        const {details} = error;
        const message = details.map(i => i.message).join(',');
        //console.log(error);
        return res.send(message);
    }else{
        next();
    }
}

const deleteSchema = Joi.object({
    userID: Joi.number().required()
})


const deleteValidate = (req, res, next)=>{
    const {error} = deleteSchema.validate(req.body);
    if(error){
        const {details} = error;
        const message = details.map(i => i.message).join(',');
        //console.log(error);
        return res.send(message);
    }else{
        next();
    }
}


const updateSchema = Joi.object({
    updateUserID: Joi.number().required(),
    updateFname: Joi.string().required(),
    updateLname: Joi.string().required(),
    updateUsername: Joi.string().required(),
    updatePassword: Joi.string().required(),
    updatEmail: Joi.string().required()
})

const updateValidate = (req, res, next)=>{
    const {error} = updateSchema.validate(req.body);
    if(error){
        const {details} = error;
        const message = details.map(i => i.message).join(',');
        console.log(error);
        return res.send(message);
    }else{
        next();
    }
}

module.exports = {
    signUpValidate,
    signInValidate,
    deleteValidate,
    updateValidate
}