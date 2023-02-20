const express = require("express");
const router = express.Router();
const path = require("path");
const {signUpValidate, signInValidate, deleteValidate, updateValidate} = require("../validation/validation");


const controller = require("../controller/userController");

//render file
router.get("/", controller.showForm)
 
//fetch all
router.get("/users", controller.fetchAllRows);

//SignIn
router.post("/user/signIn", signInValidate, controller.signIn);

//Insert
router.post("/user/create", signUpValidate, controller.insertData);


//Delete
router.post("/user/delete", deleteValidate, controller.deleteData)


//Update
router.post("/user/update", updateValidate, controller.updateData)


module.exports = router;