document.getElementsByClassName("signIn-box")[0].style.display = "none";
document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
document.getElementsByClassName("updateUser-box")[0].style.display = "none";
document.getElementsByClassName("output-container")[0].style.display = "none";
document.getElementsByClassName("signIn-Table")[0].style.display = "none";

//Choose signUp
document.getElementById("upBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("signUp-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
    document.getElementsByClassName("signIn-Table")[0].style.display = "none";
})

//Choose signIn
document.getElementById("inBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("signIn-box")[0].style.display = "block";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
    document.getElementsByClassName("signIn-Table")[0].style.display = "none";
})

///Choose deleteUser Btn
document.getElementById("deleteUserBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("deleteUser-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
    document.getElementsByClassName("signIn-Table")[0].style.display = "none";
})

//Choose updateUser Btn
document.getElementById("updateUserBtn").addEventListener('click', ()=>{
    document.getElementsByClassName("updateUser-box")[0].style.display = "block";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("output-container")[0].style.display = "none";
    document.getElementsByClassName("signIn-Table")[0].style.display = "none";
})

//Adding event listeners
document.getElementById("signUpBtn").addEventListener("click", handleSubmit);
document.getElementById("resetBtn").addEventListener("click", handleReset);
document.getElementById("signIn").addEventListener('click', handleSignIn);
document.getElementById("getDataBtn").addEventListener("click", showData);
document.getElementById("deleteUser").addEventListener("click", delUser);
document.getElementById("updateBtn").addEventListener("click", updateUser);




function User(fname, lname, username, email, password, confirmPassword){
    this.fname = fname;
    this.lname = lname;
    this.password = password;                         
    this.email = email;
    this.username = username;
    this.confirmPassword = confirmPassword
}
 
function handleSubmit(event){
    event.preventDefault();
    const fname = document.getElementById("signUpFname").value;
    const lname = document.getElementById("signUpLname").value;
    const password = document.getElementById("signUpPassword").value;
    const email = document.getElementById("signUpEmail").value;
    const username = document.getElementById("signUpUsenname").value;
    const confirmPassword = document.getElementById("signUpPasswordConfirm").value

    //validations
    var letters = /^[A-Za-z]+$/;

    if(fname.length===0 || fname.match(letters)===null){
        const field = document.getElementById("invalid-fname");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    if(lname.length===0 || lname.match(letters)===null){
        const field = document.getElementById("invalid-lname");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    var validRegexUsername = "^[A-Za-z][A-Za-z0-9_]{7,29}$";
    if(username.match(validRegexUsername)===null){
        const field = document.getElementById("invalid-username");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegexEmail)===null){
        const field = document.getElementById("invalid-email");
        field.innerHTML = "Invaid Data";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    var validPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(password.match(validPassword)===null){
        const field = document.getElementById("invalid-password");
        field.innerHTML = "Password not strong";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }
    if(password!=confirmPassword){
        const field = document.getElementById("invalid-confirmPassword");
        field.innerHTML = "Password not match";
        setTimeout(()=>{
            field.innerHTML = "";
        },2000);
        return false;
    }


    //user Object
    const user = new User(fname, lname, username, email, password, confirmPassword);

    //Insert in DB
    data_insert(user);

    //reset
    handleReset();
}
//handle reset
function handleReset(event){
    document.getElementById("signUpFname").value = "";
    document.getElementById("signUpLname").value = "";
    document.getElementById("signUpPassword").value = "";
    document.getElementById("signUpEmail").value = "";
    document.getElementById("signUpUsenname").value = "";
    document.getElementById("signUpPasswordConfirm").value = "";

}


///Sign - In

function displayDetails(userDetails){
    const userDetailsTable = document.getElementsByClassName("signIn-Table")[0];
    const signInErr = document.getElementById("signInErr");
    //Invalid user
    if(typeof (userDetails) === "string"){
        signInErr.innerHTML = userDetails;
        signInErr.style.display = "block";
        setTimeout(()=>{
            signInErr.style.display = "none";
        } ,2000)
    }else{
        //Valid user
        document.getElementById("user-userID").innerHTML = userDetails.userId;
        document.getElementById("userCreatedAt").innerHTML = userDetails.createdAt;
        document.getElementById("userUpdatedAt").innerHTML = userDetails.updatedAt;
        document.getElementById("user-fName").innerHTML = userDetails.fName;
        document.getElementById("user-lName").innerHTML = userDetails.lName;
        document.getElementById("user-userName").innerHTML = userDetails.userName;
        document.getElementById("user-email").innerHTML = userDetails.email;
        userDetailsTable.style.display = "block";
        document.getElementsByClassName("signIn-box")[0].style.display = "none";
    }
   
    
}
function handleSignIn(e){
    e.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    const cred = {
        email,
        password
    }
    let userData;
    $.ajax({
        url: "http://localhost:5000/user/signIn",
        type:"POST",
        data : cred,
        success: function(result){
          displayDetails(result);
          userData = result;
        },
        error: function(error){
          console.log(error);
        }
      })
      document.getElementById("signInEmail").value = "";
      document.getElementById("signInPassword").value = "";
    
      //Update user
      

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


//Ajax Calls

//Get data 
function showData(e){
    e.preventDefault();

    document.getElementsByClassName("output-container")[0].style.display = "block";
    document.getElementsByClassName("deleteUser-box")[0].style.display = "none";
    document.getElementsByClassName("signIn-box")[0].style.display = "none";
    document.getElementsByClassName("signUp-box")[0].style.display = "none"; 
    document.getElementsByClassName("updateUser-box")[0].style.display = "none";
    document.getElementsByClassName("signIn-Table")[0].style.display = "none";

    let rows = [];

    $.ajax({
        url: "http://localhost:5000/users",
        type: "GET",
        success: function(result){
            rows = result;
            //console.log(rows);
            let str = rows.length>0 ?
            `<tr class="header" style="backg">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            </tr>`: "No Data In Database";
            rows.forEach((user)=>{
                str+= `<tr >
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

}

//Insert Data
function data_insert(user){
    $.ajax({
      url: "http://localhost:5000/user/create",
      type:"POST",
      data : user,
      success: function(result){
        signupMsg.innerHTML = result;
        signupMsg.style.display = "block";
        if(result==="Signed up successfully"){
            signupMsg.style.color = "#03C988";
        }else{
            signupMsg.style.color = "#F55050";
        }
        setTimeout(()=>{
            signupMsg.style.display = "none";
        } ,2000)
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
            deleteMsg.innerHTML = result;
            deleteMsg.style.display = "block";
            if(result==="Account Deleted Successfully"){
                deleteMsg.style.color = "#03C988";
            }else{
                deleteMsg.style.color = "#F55050";
            }
            setTimeout(()=>{
                deleteMsg.style.display = "none";
            } ,2000)
        },
        error: function(error){
            console.log(error);
        },
        
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
            updateMsg.innerHTML = result;
            updateMsg.style.display = "block";
            if(result==="Account Updated Successfully"){
                updateMsg.style.color = "#03C988";
            }else{
                updateMsg.style.color = "#F55050";
            }
            setTimeout(()=>{
                updateMsg.style.display = "none";
            } ,2000)
        },
        error: function(error){
            console.log(error);
        }
    })
}