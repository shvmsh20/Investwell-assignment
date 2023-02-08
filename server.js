const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

//Parsing res.body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Accessing CSS and JS
app.use(express.static(path.join(__dirname, "public")));

//Connection to db
const config = {
    host: "localhost",
    user: "root",
    database: "assignment",
    password: "Agra@123"
}
const connection = mysql.createConnection(config);

//Checking connection
// connection.query(
//     "Select * from userDetails",
//     (err, results)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Connection...")
//         console.log(results);
//     }
// )


//apis
 
//render file
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"index.html");
})

//fetch all
app.get("/users", (req, res)=>{
    const sqlQuery = "Select * from userDetails";
    connection.query(
        sqlQuery,
        (err, results)=>{
            if(err){
                return console.log(err);
            }
            console.log("All rows ", results);
        }
    )
    

})

//Insert
app.post("/user/create", (req,res)=>{
    const newUser = req.body;
    console.log(newUser);
    const sqlQuery = `INSERT INTO userDetails(fName, lName, userName, email, password)
    VALUES("${newUser.fname}", "${newUser.lname}", "${newUser.username}", "${newUser.email}",
    "${newUser.password}")`;
    //console.log(sqlQuery);
    connection.query(
        sqlQuery,
        (err, results)=>{
            if(err){
                return console.log(err);
            }
            console.log("New row added...");
        }
    )

    res.send("<h1>New User added</h1>");

})


//Delete
app.delete("/users/delete/:id", (req, res)=>{
    const id = req.params.id;
    const sqlQuery = `Delete from userDetails where userId = "${id}"`;
    console.log(sqlQuery);
    connection.query(
        sqlQuery,
        (err, results)=>{
            if(err){
                console.log(err);
            }
            console.log("Row deleted...", results);
            res.send(results);
        }
    )
})


//Update

app.put("/users/update/:id", (req, res)=>{
    const updateUser = req.body;
    const id = req.params.id;
    const sqlQuery = `UPDATE userDetails SET 
    fName = "${updateUser.fName}", lName = "${updateUser.lName}", userName = "${updateUser.userName}",
    email = "${updateUser.email}", password = "${updateUser.password}"
    where userId = ${id}`;
    console.log(sqlQuery);
    connection.query(
        sqlQuery,
        (err, results)=>{
            if (err) {
                return console.log(err);
            }
            
            console.log("User Updated...", results);

        }
    )
    res.send(updateUser);
})






//Listening on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
