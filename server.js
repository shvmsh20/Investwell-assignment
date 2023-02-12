const express = require("express");
const app = express();
const path = require("path");
const route = require("./routes/routes.js");

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
    // res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
})



//BodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", route);

//Accessing CSS and JS
app.use(express.static(path.join(__dirname, "public")));


//Listening on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
