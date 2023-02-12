const repo = require("../repository/userDb.js");

const getAllData = (cb)=>{
    const sqlQuery = "Select * from userDetails";
    repo.getAllData(sqlQuery, function(err, res){
        //console.log(res);
        cb(null, res);
        return res;
    });
    
}

const insertData = (newUser)=>{
    const sqlQuery = `INSERT INTO userDetails(fName, lName, userName, email, password)
    VALUES("${newUser.fname}", "${newUser.lname}", "${newUser.username}", "${newUser.email}",
    "${newUser.password}")`;
    return repo.insertData(sqlQuery);
}

const deleteData = (id)=>{
    const sqlQuery = `Delete from userDetails where userId = ${id}`;
    return repo.deleteData(sqlQuery);
}

const updateData = (updateUser)=>{
    const sqlQuery = `UPDATE userDetails SET 
    fName = "${updateUser.updateFname}", lName = "${updateUser.updateLname}", userName = "${updateUser.updateUsername}",
    email = "${updateUser.updatEmail}", password = "${updateUser.updatePassword}", updatedAt = now()
    where userId = ${updateUser.updateUserID}`;
    return repo.updateData(sqlQuery);
}

module.exports = {
    getAllData, 
    insertData,
    deleteData, 
    updateData
}