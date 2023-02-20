const services = require("../services/userServices");
const path = require("path");
var CryptoJS = require("crypto-js");

const showForm = (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}

const fetchAllRows = async (req, res)=>{
    
    //Using callbacks
    // services.getAllData(function(err, result){
    //     //console.log(result);
    //     console.log(req);
    //     return res.send(result);
    // })


    //Using promises
    // const temp = services.getAllData();
    // temp.then((data)=>{
    //     res.send(data);
    // });


    //Using async await
    const temp = await services.getAllData();
    //console.log(temp);
    res.send(temp);
}
 
const signIn = async (req, res)=>{
    const cred = req.body;
    const temp = await services.signIn(cred);
    if(temp.length==0){
        return res.send("Invalid credential");
    }
   
    var bytes  = CryptoJS.AES.decrypt(temp[0].password, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if(originalText!==cred.password){
        return res.send("Invalid credential");
    }else{
        res.send({
            userId: (temp[0].userId),
            fName: temp[0].fName,
            lName: temp[0].lName,
            userName: temp[0].userName,
            email: temp[0].email,
            createdAt: temp[0].createdAt,
            updatedAt: temp[0].createdAt

        });
    }
    
}

const insertData = async (req,res)=>{
    const newUser = req.body;
    
    const result = await services.insertData(newUser);
        
    res.send(result);
}

const deleteData = async (req, res)=>{
    const id = req.body.userID;
    const result = await services.deleteData(id);
    res.send(result);
}

const updateData = async (req, res)=>{
    const updateUserData = req.body;
    const result = await services.updateData(updateUserData);
    res.send(result);
}

module.exports = {
    showForm,
    signIn,
    fetchAllRows,
    insertData,
    deleteData,
    updateData
}