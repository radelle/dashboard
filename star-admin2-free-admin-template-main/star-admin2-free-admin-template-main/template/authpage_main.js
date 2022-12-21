import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

 const firebaseConfig = {
  apiKey: "AIzaSyD04Qf12qgRAf7Joburgt5v4UJwEitY0fk",
    authDomain: "its-worth-a-shot.firebaseapp.com",
    databaseURL: "https://its-worth-a-shot-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "its-worth-a-shot",
    storageBucket: "its-worth-a-shot.appspot.com",
    messagingSenderId: "613566342054",
    appId: "1:613566342054:web:fea46a561de70eaf342567"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

//Listen for login button
  document.getElementById("login-btn").addEventListener('click', function(){
    //Get login email value
   const loginEmail= document.getElementById("login-email").value;
   //Get login password value
   const loginPassword =document.getElementById("login-password").value;

   //signs in user
   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    //prints if login is successful
    document.getElementById("result-box").style.display="inline";
     document.getElementById("b-container").style.display="none";
     document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail+" was Login Successfully";
  })
  //if user sign in is is not successful
  .catch((error) => {
    //print error message
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("b-container").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});

  //listens for register button 
  document.getElementById("register-btn").addEventListener('click', function(){
  // gets register email value
   const registerEmail= document.getElementById("register-email").value;
   //gets register password value
   const registerPassword =document.getElementById("register-password").value;

   //Creates a user in firebase auth
   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    //prints if user registers successfully
    document.getElementById("result-box").style.display="inline";
     document.getElementById("a-container").style.display="none";
     document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";
  }).catch((error) => {
    //prints if registration is not successful
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("a-container").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});