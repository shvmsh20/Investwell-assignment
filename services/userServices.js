const repo = require("../repository/userDb.js");

//using callbacks
// const getAllData = (cb)=>{
//     const sqlQuery = "Select * from userDetails";
//     repo.getAllData(sqlQuery, function(err, res){
//         return cb(null, res);
//     });
    
// }

//using promises
// const getAllData =  ()=>{
//     return new Promise((resolve)=>{
//         const sqlQuery = "Select * from userDetails";
//         const result = repo.getAllData(sqlQuery);
//         result.then((data)=>{
//             resolve(data);
//         })
//     })
// }

//using async await
const getAllData = async ()=>{
    const sqlQuery = "Select userId, fName, lName, userName, email from userDetails";
    const result = await repo.getAllData(sqlQuery);
    return new Promise((resolve)=>{
        resolve(result);
    })
}

//SignIn
const signIn = async (cred)=>{
    const sqlQuery = `Select * from userDetails where email = "${cred.email}" AND password="${cred.password}"`;
    const result = await repo.signIn(sqlQuery);
    return new Promise((resolve)=>{
        resolve(result);
    })
}


const insertData = async (newUser)=>{
    let success = null
    let fail = null;
    const sqlQuery = `INSERT INTO userDetails(fName, lName, userName, email, password)
            VALUES("${newUser.fname}", "${newUser.lname}", "${newUser.username}", "${newUser.email}",
            "${newUser.password}")`;
        let result;    
        try{
            result = await repo.insertData(sqlQuery);
        }
        catch(err){
            result = err;
        }
        return new Promise((resolve, reject)=>{
            resolve(result);
        })
    
}

const deleteData = async (id)=>{
    const sqlQuery = `Delete from userDetails where userId = ${id}`;
    const result = await repo.deleteData(sqlQuery);
    return new Promise((resolve, reject)=>{
        resolve(result);
    })
}

const updateData = async (updateUser)=>{
    const sqlQuery = `UPDATE userDetails SET 
    fName = "${updateUser.updateFname}", lName = "${updateUser.updateLname}", userName = "${updateUser.updateUsername}",
    email = "${updateUser.updatEmail}", password = "${updateUser.updatePassword}", updatedAt = now()
    where userId = ${updateUser.updateUserID}`;

    const result = await repo.updateData(sqlQuery);

    return new Promise((resolve, reject)=>{
        resolve(result);
    })
}

module.exports = {
    getAllData, 
    signIn,
    insertData,
    deleteData, 
    updateData
}