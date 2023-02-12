const mysql = require("mysql2");



//Connection to db
const config = {
    host: "localhost",
    user: "root",
    database: "assignment",
    password: "Agra@123"
}
const connection = mysql.createConnection(config);

//Checking connection
//connection.query(
//     "Select * from userDetails",
//     (err, results)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Connection...")
//         console.log(results);
//     }
// )

module.exports = connection;
