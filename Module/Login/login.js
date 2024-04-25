window.onload = function () {
    constructor();
};
let signup = document.getElementById("sign-up");
let opensignup = document.getElementById("open-signup");
let openlogin = document.getElementById("open-login");
let login = document.getElementById("login");
var authFlag = localStorage.getItem('authFlag');

function constructor() {
    if (authFlag == "login") {
        setLogin();
    }
    else {
        setSignup();
    }
}

function setLogin() {
    authFlag = "login"
    localStorage.setItem('authFlag', authFlag);
    login.style.display = "block";
    signup.style.display = "none";
}

function setSignup() {
    authFlag = "signup"
    localStorage.setItem('authFlag', authFlag);
    login.style.display = "none";
    signup.style.display = "block";
}

function checkPass() {
    let checkpass = document.getElementById("pass").value;
    let checkconfPass = document.getElementById("confPass").value;

    if (checkpass !== checkconfPass) {
        document.getElementById("errorpass").innerHTML = 'password dont match';
        return false; 
    } else {
        return true; 
    }
}
function createAccount() {
    if (!checkPass()) {
        return;
    }
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const mob = document.getElementById("mob").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const confPass = document.getElementById("confPass").value;

    if (!firstName || !lastName || !mob || !email || !pass || !confPass) {
        alert("Please fill in all required fields.");
        return;
    }

    let signUpData = localStorage.getItem('signUpData');
    let signUpArr = signUpData ? JSON.parse(signUpData) : [];
    if (signUpArr.length == 0) {
        maxIndex = 1;
    }
    else {
        maxIndex = signUpArr.length
        maxIndex = ++maxIndex
    }
    let signupDetails = {
        "id": maxIndex,
        'firstName': firstName,
        'lastName': lastName,
        'mob': mob,
        'email': email,
        'pass': pass
    }
    let signupDataArr = [];
    try {
        signupDataArr = JSON.parse(signUpData || '[]');
        signupDataArr.push(signupDetails);
        localStorage.setItem('signUpData', JSON.stringify(signupDataArr));
        alert("Details saved successfully");
        setLogin();
        displaySignUpDetails();

    } catch (error) {
        alert("Some error occureds")
    }
    clearInputs();
}


async function allowLogin() {
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("userPass").value;
    let signUpData = [];
    try {
        signUpData = JSON.parse(localStorage.getItem('signUpData') || '[]');
    } catch (error) {
        alert("Error occurred while retrieving user data from local storage");
        return;
    }
    if (signUpData.length > 0) {
        for (let i = 0; i < signUpData.length; i++) {
            const user = signUpData[i];
            if (user.email == userName || user.mob == userName) {
                if (user.pass == password) {
                    alert("Login successful!");
                    clearLoginField();
                    displayLogin("false", user.firstName);
                    opendashboard();                  
                    return;
                } else {
                    alert("Incorrect username or password!");
                    clearLoginField();
                    return;
                }
            }
        }
        alert("User not found!");
        clearLoginField();
    } else {
        try {
            const response = await fetch('../../Masters/usermaster.json');
            const signUpDatajson = await response.json();
            for (let i = 0; i < signUpDatajson['users'].length; i++) {
                const user = signUpDatajson['users'][i];
                if (user.email == userName || user.mob == userName) {
                    if (user.pass == password) {
                        alert("Login successful!");
                         clearLoginField();
                         displayLogin("false");
                         opendashboard();
                        return;
                    } else {
                        alert("Incorrect username or password!");
                        clearLoginField();
                        return;
                    }
                }
            }
            alert("User not found!");
            clearLoginField();
        } catch (error) {
            alert("Error occurred while fetching user data: " + error);
            clearLoginField();
        }
    }
}

function clearLoginField() {
    document.getElementById("userName").value = "";
    document.getElementById("userPass").value = "";
}


function clearInputs() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("mob").value ="";
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("confPass").value = "";
}
function displaySignUpDetails() {
    let signUpData = localStorage.getItem('signUpData');
    let signUpArr = signUpData ? JSON.parse(signUpData) : [];
    console.log(signUpData)
}

function opendashboard() {
    window.location.href = '../Dashboard/dashboard.html';
}

function displayLogin(val,name){
    localStorage.setItem("showlogin",val);
    localStorage.setItem("setusername",name);
}

