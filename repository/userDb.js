const connection = require("../connection/db.js");

const getAllData =  (sqlQuery, cb)=>{
    connection.query(
        sqlQuery,
        (err, res)=>{
            if(err){
                return console.log(err);
            }
            //console.log(res);
            cb(null, res);
            //return res;
        }
    )   
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