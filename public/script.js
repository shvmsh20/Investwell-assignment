document.getElementsByClassName("signIn-box")[0].style.display = "none";
document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
document.getElementsByClassName("updateUser-box")[0].style.display = "none";
document.getElementsByClassName("output-container")[0].style.display = "none";

//Choose signUp and signIn
document.getElementById("upBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("signUp-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
})
document.getElementById("inBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("signIn-box")[0].style.display = "block";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
})

document.getElementById("deleteUserBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("deleteUser-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
})

document.getElementById("updateUserBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("updateUser-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
})


const submit = document.getElementById("signUpBtn").addEventListener("click", handleSubmit);
const reset = document.getElementById("resetBtn").addEventListener("click", handleReset);
document.getElementById("signIn").addEventListener('click', handleSignIn);
const getData = document.getElementById("getDataBtn").addEventListener("click", showData);
const deleteUser = document.getElementById("deleteUser").addEventListener("click", delUser);
document.getElementById("updateBtn").addEventListener("click", updateUser);


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
 
function handleSubmit(event){
    event.preventDefault();
    const fname = document.getElementById("signUpFname").value;
    const lname = document.getElementById("signUpLname").value;
    const password = document.getElementById("signUpPassword").value;
    const email = document.getElementById("signUpEmail").value;
    const username = document.getElementById("signUpUsenname").value;
    
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

    //user Object
    const user = new User(fname, lname, username, email, password);

    hashMapEmail[email] = password;
    hashMapUsername[username] = password;

    handleReset();

    //Insert in DB
    data_insert(user);
}


function handleReset(event){
    document.getElementById("signUpFname").value = "";
    document.getElementById("signUpLname").value = "";
    document.getElementById("signUpPassword").value = "";
    document.getElementById("signUpEmail").value = "";
    document.getElementById("signUpUsenname").value = "";

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

//Update User
function updateUser(e){
    e.preventDefault();
    const updateUserID = document.getElementById("updateUserID").value;
    const updateFname = document.getElementById("updateFname").value;
    const updateLname = document.getElementById("updateLname").value;
    const updatePassword = document.getElementById("updatePassword").value;
    const updatEmail = document.getElementById("updateEmail").value;
    const updateUsername = document.getElementById("updateUsenname").value;
    const updateUserObj = {
        updateUserID : parseInt(updateUserID),
        updateFname,
        updateLname,
        updateUsername,
        updatePassword,
        updatEmail
    }
    

    //ajax call
    update_user(updateUserObj)

    //Reset Values
    document.getElementById("updateUserID").value = "";
    document.getElementById("updateFname").value = "";
    document.getElementById("updateLname").value = "";
    document.getElementById("updatePassword").value = "";
    document.getElementById("updateEmail").value = "";
    document.getElementById("updateUsenname").value = "";
}

//Get all rows



//Ajax Calls

//Get data 
function showData(e){
    e.preventDefault();

    document.getElementsByClassName("output-container")[0].style.display = "block";
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";

    let rows = [];

    $.ajax({
        url: "http://localhost:5000/users",
        type: "GET",
        success: function(result){
            rows = result;
            //console.log(rows);
            let str = rows.length>0 ?
            `<tr class="header">
            <th>UserId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            </tr>`: "No Data In Database";
            rows.forEach((user)=>{
                str+= `<tr >
                <td>${user.userId}</td>
                <td>${user.fName}</td>
                <td>${user.lName}</td>
                <td>${user.userName}</td>
                <td>${user.email}</td>
                </tr>`;
            })
            const output = document.getElementsByClassName("output")[0];
            output.innerHTML = str;
        },
        error: function(error){
            console.log(error);
        }
    })
    //console.log(rows);

}

//Insert Data
function data_insert(user){
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

//DeleteUser
function delUser(e){
    e.preventDefault();
    const userID = parseInt(document.getElementById("deleteUserID").value);
    const obj = {
        userID
    }
    $.ajax({
        url: "http://localhost:5000/user/delete",
        type: "POST",
        data: obj,
        success: function(result){
            console.log(result);
            
        },
        error: function(error){
            console.log(error);
        }
    })
    document.getElementById("deleteUserID").value = "";
    
}

//Update User
function update_user(updateUserObj){
    $.ajax({
        url: "http://localhost:5000/user/update",
        type: "POST",
        data: updateUserObj,
        success: function(result){
            console.log(result);
            
        },
        error: function(error){
            console.log(error);
        }
    })
}