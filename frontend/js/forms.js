function register(){
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;

    var gender = document.getElementsByName("gender");
    var op;
    for(let i = 0;i < gender.length; i++){
        if(gender[i].checked)op = gender[i].value;
    }

    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    console.log(name);console.log(number);
    console.log(op);console.log(dob);
    console.log(email);
    console.log(password);

    if(number.length!=10)alert("Number is invalid");
    if(password.length<6)alert("Password should be atleast 6 characters");

}

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log(email);
    console.log(password);

    if(password.length<6)alert("Password is invalid");
}