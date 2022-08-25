src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"
src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"
src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore"
src="https://www.gstatic.com/firebasejs/8.2.9/firebase-storage"
src="veri.js"

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCYybtuNQHaMpcKNdTyjK_e0Y0k5xChMQI",

authDomain: "mgpa-6cc10.firebaseapp.com",

projectId: "mgpa-6cc10",

storageBucket: "mgpa-6cc10.appspot.com",

messagingSenderId: "292918906000",

appId: "1:292918906000:web:69bf0126437f9ea2abdc15"

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();




  window.onload=function () {
render();
};
function render() {
window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
recaptchaVerifier.render();
}
function phoneAuth() {
//get the number
var number=document.getElementById('number').value;
var pass = document.getElementById('signupPassword').value;
var cpass = document.getElementById('signupcPassword').value;
//phone number authentication function of firebase
//it takes two parameter first one is number,,,second one is recaptcha
if(pass == cpass){
firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
    //s is in lowercase
    window.confirmationResult=confirmationResult;
    coderesult=confirmationResult;
    console.log(coderesult);
    alert("Message sent");
}).catch(function (error) {
    alert(error.message);
});
}
else{
alert("Please check both the passwords");
}
}
function codeverify() {
var code=document.getElementById('verificationCode').value;
coderesult.confirm(code).then(function (result) {
    alert("Successfully registered");
    var user=result.user;
    console.log(user);
}).catch(function (error) {
    alert(error.message);
});
}