const services = require("../services/userServices");

const path = require("path");

const showForm = (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}

const fetchAllRows = (req, res)=>{
    //validations
    
    services.getAllData(function(err, result){
        console.log(result);
        res.send(result);
    })
}

const insertData = (req,res)=>{
    const newUser = req.body;
    return services.insertData(newUser);
}

const deleteData = (req, res)=>{
    const id = req.body.userID;
    return services.deleteData(id);

}

const updateData = (req, res)=>{
    const updateUserData = req.body;
    return services.updateData(updateUserData);
}

module.exports = {
    showForm,
    fetchAllRows,
    insertData,
    deleteData,
    updateData
}