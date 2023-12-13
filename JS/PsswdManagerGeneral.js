const firebaseConfig = {
    apiKey: "AIzaSyDWkgzZeTcQOGgDFC6UFs0LUA72KHtOG_4",
    authDomain: "psswdmanager-68a29.firebaseapp.com",
    projectId: "psswdmanager-68a29",
    storageBucket: "psswdmanager-68a29.appspot.com",
    messagingSenderId: "18800570825",
    appId: "1:18800570825:web:5e8580cb73e6c3b155f818"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
document.getElementById("pull_up").addEventListener("click" ,() =>{
    document.getElementById("registerForm").style.transform = "translateY(-20px)";
    document.getElementById("loginform").style.transform = "translateY(-520px)";
})

document.getElementById("pull_down").addEventListener("click" ,() =>{
    document.getElementById("registerForm").style.transform = "translateY(520px)";
    document.getElementById("loginform").style.transform = "translateY(0px)";

})
if (localStorage.getItem("CurUsername")) 
{
    db.collection("users").doc(localStorage.getItem("CurUsername").toLowerCase()).get().then((doc) => {
        document.getElementById("profilePicData").setAttribute("src",  doc.data().user_logo);
    });
        
    document.getElementById("loginform").style.opacity = 0;
    document.getElementById("loginform").style.pointerEvents = "none";
    document.getElementById("registerForm").style.opacity = 0;
    document.getElementById("registerForm").style.pointerEvents = "none";
    document.getElementById("LogoutForm").style.transform = "translateY(0)";

}
else
{
    document.getElementById("loginform").style.opacity = 1;
    document.getElementById("loginform").style.pointerEvents = "all";
    document.getElementById("registerForm").style.opacity = 1;
    document.getElementById("registerForm").style.pointerEvents = "all";

    document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
    document.getElementById("LogoutForm").style.opacity = 0;
    document.getElementById("LogoutForm").style.pointerEvents = "none";
    
} 

function typeWriterErrorHTML(idOfTextHolder, textToType, speed) {
    var i = 0;
    var speed = speed || 25; // Default speed if not provided
    document.getElementById(idOfTextHolder).innerHTML = "";
    function type() {
        if (i < textToType.length) {
            document.getElementById(idOfTextHolder).innerHTML += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
         if(i == textToType.length )
         {
            setTimeout(() => {
                document.getElementById(idOfTextHolder).innerHTML = "";
            }, 1500);
         }
    }
    type(); // Call the function to start the typing effect
}

function LoginError(errorLogin)
{
    typeWriterErrorHTML("ErrorLog", errorLogin);
}

function RegisterError(errorRegister)
{
    typeWriterErrorHTML("ErrorReg", errorRegister);

}