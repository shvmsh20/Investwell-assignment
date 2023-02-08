document.getElementsByClassName("signIn-box")[0].style.display = "none";

//Choose signUp and signIn
document.getElementById("upBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("signUp-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
})
document.getElementById("inBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("signIn-box")[0].style.display = "block";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
})


const submit = document.getElementById("submitBtn").addEventListener("click", handleSubmit);
const reset = document.getElementById("resetBtn").addEventListener("click", handleReset);
const getData = document.getElementById("getData").addEventListener("click", showData);

const details = [];
let hashMapEmail = {};
let hashMapUsername = {};

let userId = 0;
function User(fname, lname, username, email, password){
    this.userId = userId;
    this.fname = fname;
    this.lname = lname;
    this.password = password;                         
    this.email = email;
    this.username = username;
}
let header = `<tr class="header">
<th>UserId</th>
<th>First Name</th>
<th>Last Name</th>
<th>Username</th>
<th>Email</th>
<th>Password</th>
</tr>`;
const outputContainer = document.getElementsByClassName("output-container")[0];
outputContainer.style.display = "none";
function handleSubmit(event){
    event.preventDefault();
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    if(fname.length===0){
        const field = document.getElementById("invalid-fname");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    if(lname.length===0){
        const field = document.getElementById("invalid-lname");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    if(password.length<8){
        const field = document.getElementById("invalid-password");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    var validRegexUsername = "^[A-Za-z][A-Za-z0-9_]{7,29}$";
    if(username.match(validRegexUsername)===null || hashMapUsername[username]!=undefined){
        const field = document.getElementById("invalid-username");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegexEmail)===null || hashMapEmail[email]!=undefined){
        const field = document.getElementById("invalid-email");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    
    userId++;
    const user = new User(fname, lname, username, email, password);
    details.push(user);

    //Push data in table
    //pushInTable(user);

    let str = header;
    const output = document.getElementsByClassName("output")[0];
    outputContainer.style.display = "block";
    details.forEach((user)=>{
            str+= `<tr >
            <td>${user.userId}</td>
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            </tr>`;
})
hashMapEmail[email] = password;
hashMapUsername[username] = password;
output.innerHTML = str;
handleReset();
data_insert(user);
}

function showData(e){
    e.preventDefault();
    $.ajax({
        url: "http://localhost:5000/users",
        type: "GET",
        success: function(result){
            console.log(result);
            
        },
        error: function(error){
            console.log(error);
        }
    })
}

function data_insert(user){
      console.log(user)
      $.ajax({
        url: "http://localhost:5000/user/create",
        type:"POST",
        data : user,
        success: function(result){
          console.log(result);
        },
        error: function(error){
          console.log(error);
        }
      })
  }


function handleReset(event){
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";

}


///Sign - In
function handleSignIn(e){
    e.preventDefault();
    const EmailOrUsername = document.getElementById("signInEmail").value;
    const signInPassword = document.getElementById("signInPassword").value;
    authenticate(EmailOrUsername, signInPassword);
}
function authenticate(EmailOrUsername, signInPassword){
    if(hashMapEmail[EmailOrUsername]===signInPassword || hashMapUsername[EmailOrUsername]===signInPassword){
        alert("verified");
    }
    else{
        alert("Not verified");
    }
}
document.getElementById("signIn").addEventListener('click', handleSignIn);


//server.js
// const express = require("express");
// const app = express();

// const mysql = require("mysql2");



// //Connecting mysql database
// const config = {
//     host: "localhost",
//     user: "root",
//     database: "assignment",
//     password: "Agra@123"
// }
// const connection = mysql.createConnection(config);

// //Show all data in table
// // function showData(){
// //     connection.query(
// //         "SELECT * from userDetails",
// //         (err, results, fields)=>{
// //             if(err){
// //                 throw err;
// //             }
// //             console.log(results);
// //         }
// //     )
// // }


// //Push data in table function
// function pushInTable(data){
//     const sqlQuery = `INSERT INTO userDetails 
//     VALUES("${data.fname}", "${data.lname}", "${data.username}",
//     "${data.email}", "${data.password}", "${data.userId}")`;
//     console.log(sqlQuery);
//     connection.query(sqlQuery,
//         (err, results)=>{
//             if(err){
//                 throw err;
//             }
//             console.log(results);
//             //showData();
//         }
//     )
// }








