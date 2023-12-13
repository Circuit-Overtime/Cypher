

document.getElementById("submitEntryCardLogout").addEventListener("click", () => {


    document.getElementById("loginform").style.opacity = 1;
    document.getElementById("loginform").style.pointerEvents = "all";
    document.getElementById("registerForm").style.opacity = 1;
    document.getElementById("registerForm").style.pointerEvents = "all";

    document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
    document.getElementById("LogoutForm").style.opacity = 0;
    document.getElementById("LogoutForm").style.pointerEvents = "none";


    localStorage.clear();
    location.reload();
})

document.getElementById("reEnter").addEventListener("click", () => {
    location.replace("psswd.html");
})