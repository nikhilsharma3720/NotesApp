let appAuth = firebase.auth();
let user = null;

let btn = document.getElementById("submit-button");
let signinBtn = document.getElementById("signin-button");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
const firestore = firebase.firestore();

let email = "";
let password = "";
emailInput.addEventListener("input", function (e) {
  email = e.target.value;
})

passwordInput.addEventListener("input", function (e) {
  password = e.target.value;
})

btn.addEventListener("click", function (e) {
  if (email == "" || password == "") {
    return;
  }

  appAuth.createUserWithEmailAndPassword(email, password).then(async function (e) {
    user = e.user.uid;
    
    let database = {
      users: firestore.collection("users"),
    }

    await database.users.doc(user).set(
      {
        notes:[],
      });
      
    localStorage.setItem("appAuth", appAuth);
    localStorage.setItem("user", user);
    alert("You account has been successfully created!")
  }).catch((err) => console.log(err));
})

signinBtn.addEventListener("click", function (e) {
  appAuth.signInWithEmailAndPassword(email, password).then((usr) => {
    user = usr.user.uid;
    
    localStorage.setItem("appAuth", appAuth);
    localStorage.setItem("user", user);
    window.location.href = "http://127.0.0.1:5500/main.html";
    console.log(usr.user.uid)
  }).catch((err) => alert("Password is incorrect for this email!"));
})

