const Joi = require("joi");

const signUpSchema = Joi.object({
    fname: Joi.string().pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    lname: Joi.string().pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    email: Joi.string().email().pattern(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)),
    username: Joi.string().pattern(new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)),
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
    email: Joi.string().email().pattern(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)),
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
    updateFname: Joi.string().pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    updateLname: Joi.string().pattern(new RegExp(/^[A-Za-z]+$/)).required(),
    updateUsername: Joi.string().pattern(new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")).required(),
    updatePassword: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)),
    updatEmail: Joi.string().email().pattern(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
})

const updateValidate = (req, res, next)=>{
    const {error} = updateSchema.validate(req.body);
    if(error){
        const {details} = error;
        const message = details.map(i => i.message).join(',');
        //console.log(error);
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