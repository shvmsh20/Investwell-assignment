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
const getAllData =  (sqlQuery)=>{
    return new Promise((resolve)=>{
        connection.query(
            sqlQuery,
            (err, res)=>{
                if(err){
                    return console.log(err);
                }
                resolve(res);
            } 
        )  
    })
             
    
}


const insertData = (sqlQuery)=>{
    return connection.query(
        sqlQuery,
        (err, results)=>{
            if(err){
                return console.log(err);
            }
            console.log("New row added...");
        }
    )
}

const deleteData = (sqlQuery)=>{
    return connection.query(
        sqlQuery,
        (err, results)=>{
            if(err){
                console.log(err);
            }
            console.log("Row deleted...", results);
        }
    )
}

const updateData = (sqlQuery)=>{
    return connection.query(
        sqlQuery,
        (err, results)=>{
            if (err) {
                return console.log(err);
            }
            
            console.log("User Updated...", results);

        }
    )
}
module.exports = {
    getAllData,
    insertData,
    deleteData, 
    updateData
}