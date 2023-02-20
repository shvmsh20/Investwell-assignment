const connection = require("../connection/db.js");

//using callbacks
// const getAllData =  (sqlQuery, cb)=>{
//     connection.query(
//         sqlQuery,
//         (err, res)=>{
//             if(err){
//                 return console.log(err);
//             }
//             return cb(null, res);
//         }
//     )   
// }


//using promises
// const getAllData =  (sqlQuery)=>{
//     return new Promise((resolve)=>{
//         connection.query(
//             sqlQuery,
//             (err, res)=>{
//                 if(err){
//                     return console.log(err);
//                 }
//                 resolve(res);
//             } 
//         )  
//     })

//using async await
const getAllData = async (sqlQuery)=>{
    return new Promise((resolve, reject)=>{
        connection.query(sqlQuery, (err, res)=>{
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
    
}

const signIn = async (sqlQuery)=>{
    return new Promise((resolve, reject)=>{
        connection.query(sqlQuery, (err, res)=>{
            if(err){
                return reject(err);
            }
            //console.log(res);
            resolve(res);
        })
    })
}

const insertData = async (sqlQuery)=>{
    return new Promise((resolve, reject)=>{
        connection.query(
            sqlQuery,
            (err, results)=>{
                if(err){
                    //console.log(err.message);
                    return reject(err.message);
                }
                //console.log("New row added...");
                resolve("Signed up successfully");
            }
        )
    }) 
}

const deleteData = async (sqlQuery)=>{
    return new Promise((resolve, reject)=>{
        connection.query(
            sqlQuery,
            (err, results)=>{
                if(results.affectedRows===0){
                    return resolve("Invalid UserID");
                }
                return resolve("Account Deleted Successfully");
            }
        )
    })
    
}

const updateData = async (sqlQuery)=>{
    return new Promise((resolve, reject)=>{
        connection.query(
            sqlQuery,
            (err, results)=>{
                if(results.affectedRows===0){
                    return resolve("Invalid request");
                }
                return resolve("Account Updated Successfully");
    
            }
        )
    })
    
}
module.exports = {
    getAllData,
    signIn,
    insertData,
    deleteData, 
    updateData
}