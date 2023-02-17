const express = require("express");
const path = require("path");
const router = express.Router();

const controller = require("../controller/userController");

//render file
router.get("/", controller.showForm)
 
//fetch all
router.get("/users", controller.fetchAllRows);

//SignIn
router.post("/user/signIn", controller.signIn);

//Insert
router.post("/user/create", controller.insertData);


//Delete
router.post("/user/delete", controller.deleteData)


//Update
router.post("/user/update", controller.updateData)


module.exports = router;