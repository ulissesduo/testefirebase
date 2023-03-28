
const firebaseConfig = {
  apiKey: "AIzaSyBuIW8w86WJM0jpd35cvZVZkSkWfDec3ik",
  authDomain: "contactform-d972f.firebaseapp.com",
  databaseURL: "https://contactform-d972f-default-rtdb.firebaseio.com",
  projectId: "contactform-d972f",
  storageBucket: "contactform-d972f.appspot.com",
  messagingSenderId: "439099220477",
  appId: "1:439099220477:web:5bdfbf2ff1a8c79003b994"
};


  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

// Firebase Variables
var auth = firebase.auth();

// on state changed
auth.onAuthStateChanged(firebaseUser => {
  // check email
  if(firebaseUser){

    currentEmail.innerHTML = auth.currentUser.email
    currentEmail.style.display = 'block';
    singoutButton.style.display = 'block';
    singupForm.style.display = 'none';
  } else{
    singoutButton.style.display = 'none';
    singupForm.style.display = 'block';
    currentEmail.style.display = 'none';
  }

});

// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// signup form
// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var singoutButton = document.querySelector("#signout");
var currentEmail = document.querySelector("#current-email");

var singupForm = document.querySelector("#signup-form");
var userName = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var singupButton = document.querySelector("#signup");

singupButton.addEventListener("click", clickSignupButton);
singoutButton.addEventListener("click", clickSignoutButton);

function clickSignupButton(){
  //signup firebase method
  auth.createUserWithEmailAndPassword(email.value, password.value).
  then(function(user){
    console.log(auth.currentUser.email)

  }, function(error) {
    console.log(error.message);
    // error message show that you need to enable that authentication in firebase
  });
}

function clickSignoutButton(){
  auth.signOut()
}

// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// singin form
// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");
var singinButton = document.querySelector("#signin");

singinButton.addEventListener("click", clickSigninButton);

function clickSigninButton() {
  auth.signInWithEmailAndPassword(signinEmail.value, signinPassword.value).
  then(function(user){
    console.log(user)
  }, function(error) {
    console.log(error.message);
    // error message show that you need to enable that authentication in firebase
  });
}
