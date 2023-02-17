const services = require("../services/userServices");

const path = require("path");

const showForm = (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}

const fetchAllRows = async (req, res)=>{
    //validations
    
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
        res.send("No user found with this email id");
    }else if(temp[0].password===cred.password){
        res.send({
            userId: (temp[0].userId),
            fName: temp[0].fName,
            lName: temp[0].lName,
            userName: temp[0].userName,
            email: temp[0].email,
            createdAt: temp[0].createdAt,
            updatedAt: temp[0].createdAt

        });
    }else{
        res.send("Incorrect password")
    }
}

const insertData = async (req,res)=>{
    const newUser = req.body;
    
    
    const result = await services.insertData(newUser);
        
    
    res.send(result);
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
    signIn,
    fetchAllRows,
    insertData,
    deleteData,
    updateData
}