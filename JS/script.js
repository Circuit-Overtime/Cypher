globalThis.last_fetched_unique_id;
globalThis.blockCounter = 0;
globalThis.ViewMode = "Editable"; //ReadOnly || Editable
const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 8;
var generated_password = "";
var showAddPwd;
var ViewModeReadOnlyTimer;


window.onload = userGreetings(), scrollTop(), checkLocalStorage();
const firebaseConfig = {
    apiKey: "AIzaSyDWkgzZeTcQOGgDFC6UFs0LUA72KHtOG_4",
    authDomain: "psswdmanager-68a29.firebaseapp.com",
    databaseURL: "https://psswdmanager-68a29-default-rtdb.firebaseio.com",
    projectId: "psswdmanager-68a29",
    storageBucket: "psswdmanager-68a29.appspot.com",
    messagingSenderId: "18800570825",
    appId: "1:18800570825:web:5e8580cb73e6c3b155f818"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


function scrollTop()
{
  TopScrollInterval = setInterval(() => {
    window.scrollTo(0, 0);
  }, 20);
  setTimeout(() => {
    clearInterval(TopScrollInterval);
  }, 3300);
}


// document.getElementById("sendBtn").addEventListener('click', (e) => {
//  	e.preventDefault();
//  	Email.send({
//  		SecureToken: "token",
//  		To: 'taritbhatt2007@gmail.com',
//  		From: "ayushbhatt633@gmail.com",
//  		Subject: "This is the subject",
//  		Body: "body content"
//  	}).then(
//  		message => alert(message)
//  	);
//  })

// window.addEventListener("deviceorientation", function(event) {
//     console.log(event.gamma);
//     });

document.getElementById("searchBar").addEventListener("keyup", () => {
  filterSearch();
})
document.getElementById("searchBarPwdCollec").addEventListener("keyup", () => {
  filterSearchCollect();
})

document.getElementById("allPsswds").addEventListener("scroll", () => {
  document.getElementById("allPsswds").scrollTop === (document.getElementById("allPsswds").scrollHeight - document.getElementById("allPsswds").offsetHeight) ? loadMoreData() : null;
  
  // loadMoreData();

})
document.getElementById("navBarBtnsPsswdGen").addEventListener("click" , () => {
    document.querySelector(".autoGenPassword").classList.toggle("active");
})

document.getElementById("caretDownPsswd").addEventListener("click",() => {
    document.querySelector(".autoGenPassword").classList.toggle("active");
})

document.getElementById("navBarBtnsUsr").addEventListener("click" ,() => {
  document.querySelector(".profileContainer").classList.add("active");
})

document.getElementById("profile_logo").addEventListener("click" ,() => {
  document.querySelector(".profileContainer").classList.add("active");
})


document.getElementById("caretDownProfile").addEventListener("click", () => {
  document.querySelector(".profileContainer").classList.remove("active");
})

document.getElementById("profilePicData").addEventListener("click", () => {
  uploadUserDP();
})


document.getElementById("navBarBtnsAllPsswd").addEventListener("click" , () => {
  blockCounter = 0;
    document.getElementById("allPsswds").classList.add("active"); 
    
    document.querySelectorAll(".ALL_psswdBlobCntSng").forEach(elm => {
      // console.log(blockCounter)
      elm.style.cssText = `transform: translateX(-100%);  animation: appearFromPopping 0.5s linear forwards; animation-delay: ${blockCounter*0.1}s;`
      blockCounter += 1;
    })
    setTimeout(() => {
      document.getElementById("CrossAllPwdDown").style.display = "block";
      document.getElementById("searchBarPwdCollec").style.display = "block";
      document.querySelector(".maskPwdCollec").style.display = "block";
      filterSearchCollect();
    }, 500);
    
})

document.getElementById("CrossAllPwdDown").addEventListener("click", () => {
  blockCounter = 0;
  document.querySelectorAll(".ALL_psswdBlobCntSng").forEach(elm => {
    elm.style.cssText = `transform: translateX(-100%); animation: disapperarFromPopping 0.5s linear forwards; animation-direction: reverse; animation-delay: ${blockCounter*0.1}s;`
  })


  setTimeout(() => {
    document.getElementById("CrossAllPwdDown").style.display = "none";
    document.getElementById("searchBarPwdCollec").style.display = "none";
    document.querySelector(".maskPwdCollec").style.display = "none";
  }, 100);
    document.getElementById("allPsswds").classList.remove("active");
})



function checkLocalStorage()
{
  (localStorage.getItem("CurUsername")) ? null : location.replace("psswdlogin.html");
}




function filterSearch()
{
  var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("psswdBlobCont");
    li = ul.getElementsByClassName("psswdBlobCntSng");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("InfoContainer")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function filterSearchCollect()
{
  var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBarPwdCollec");
    filter = input.value.toUpperCase();
    ul = document.getElementById("allPsswds");
    li = ul.getElementsByClassName("ALL_psswdBlobCntSng");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("InfoContainer")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function togglePasswordvisibility(checker, target) //checker  = the id of the eye button; target = the id of the placeholder on which the action will be taken
{
    document.getElementById(checker).classList.contains("hidden") ? document.getElementById(target).setAttribute("type", "password") : document.getElementById(target).setAttribute("type", "text");
}

function GenPwd(target)
{
    clearTimeout(showAddPwd);
    generated_password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        generated_password += chars.substring(randomNumber, randomNumber +1);
       }
       document.getElementById(target).value = generated_password;
       document.getElementById(target).setAttribute("type", "name");
        showAddPwd = setTimeout(() => {
            document.getElementById(target).setAttribute("type", "password");
    }, 2500);
}

i = 0;


// function typeWriterEffect(idOfTextHolder, textToType, speed) {
//     let speed = 75; //speed duration of effect in millisec
//     var idOfPlaceholder = String(idOfTextHolder);
//     var textToTypeNew = String(textToType)
//     if (i < String(textToType).length) {
//         document.getElementById(idOfTextHolder).value += String(textToType).charAt(i);
//         i++;
//         setTimeout(() => {
//             typeWriterEffect("selectedServiceAddPassword", "google");
//         }, speed);
//     }
// }


function typeWriterEffectHTML(idOfTextHolder, textToType, speed) {
    var i = 0;
    var speed = speed || 75; // Default speed if not provided
    document.getElementById(idOfTextHolder).innerHTML = "";
    function type() {
        if (i < textToType.length) {
            document.getElementById(idOfTextHolder).innerHTML += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type(); // Call the function to start the typing effect
    
}


function typeWriterEffectValue(idOfTextHolder, textToType, speed) {
    var i = 0;
    var speed = speed || 75; // Default speed if not provided
    document.getElementById(idOfTextHolder).value = "";
    function type() {
        if (i < textToType.length) {
            (textToType.charAt(i)) == " " ?  document.getElementById(idOfTextHolder).value += " " : document.getElementById(idOfTextHolder).value += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type(); // Call the function to start the typing effect
    
}

function StarShine()
{
    let index = 0,
    interval = 500;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

}


setInterval(() => {
    document.getElementById("psswdBlobCont").childElementCount > 0 ? 
    setTimeout(() => {
      document.getElementById("loaderRippleForData").style.opacity = 0
    }, 800)
     : 
     document.getElementById("loaderRippleForData").style.opacity = 1;

     
  }, 200);

// Example usage:



function getDataOfUserCollect()
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef
  .orderByKey()
  .limitToFirst(15)
  .once('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (i = 0; i < Object.values(data).length; i++)
        {
          DataAddTagLoginCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}"  >
          <div class="ALL_psswdBlobCntSngImg"></div>
          <div class="ALL_psswdBlobCntSngName">${(Object.values(data)[i].service) == "Custom" ? "Login Details" : "Login Details of"+(Object.values(data)[i].service)} </div>
          <div class="ALL_psswdBlobCntSngEmail">${Object.values(data)[i].email}</div>
          <span class="InfoContainer" style="display: none;">Login Details ${(Object.values(data)[i].service)} ${Object.values(data)[i].email}</span>
          </div>`

          DataAddTagCardCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" >
          <div class="ALL_psswdBlobCntSngImg"></div>
          <div class="ALL_psswdBlobCntSngName">${Object.values(data)[i].typeOfData}</div>
          <div class="ALL_psswdBlobCntSngEmail">${String(Object.values(data)[i].cardNumber).slice(0,4) + "-****-****-****"}</div>
          <span class="InfoContainer" style="display: none;">${Object.values(data)[i].typeOfData} ${String(Object.values(data)[i].cardNumber)} </span>
          </div>`

          DataAddTagAppCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" >
          <div class="ALL_psswdBlobCntSngImg"></div>
          <div class="ALL_psswdBlobCntSngName">Password of ${Object.values(data)[i].typeOfData} --> ${Object.values(data)[i].AppName}</div>
          <div class="ALL_psswdBlobCntSngEmail">${String(Object.values(data)[i].AppPassword).slice(0,2) + String(Object.values(data)[i].AppPassword).slice(2).replace(String(Object.values(data)[i].AppPassword).slice(2), "*".repeat(String(Object.values(data)[i].AppPassword).slice(2).length))}</div>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].AppName} </span>
          </div>`

          if(Object.values(data)[i].typeOfData == "Login")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagLoginCollec;
          }
          else if(Object.values(data)[i].typeOfData == "Card")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagCardCollec;
          }
          else if(Object.values(data)[i].typeOfData == "App")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagAppCollec;
          }
        }
        globalThis.last_fetched_unique_id =  Object.values(data)[Object.values(data).length - 1].unique_id;
        // console.log(last_fetched_unique_id)

        
    }
    else
    {
      // console.log("No Collection can be fetched");
    }
  });
}

function getDataOfUserCollectMore(lastFetchedDocId)
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef
  .orderByKey()
  .startAfter(lastFetchedDocId)
  .limitToFirst(7)
  .once('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (i = 0; i < Object.values(data).length; i++)
        {
          DataAddTagLoginCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}"  >
          <div class="ALL_psswdBlobCntSngImg"></div>
          <div class="ALL_psswdBlobCntSngName">${(Object.values(data)[i].service) == "Custom" ? "Login Details" : "Login Details of"+(Object.values(data)[i].service)} </div>
          <div class="ALL_psswdBlobCntSngEmail">${Object.values(data)[i].email}</div>
          <span class="InfoContainer" style="display: none;">Login Details ${(Object.values(data)[i].service)} ${Object.values(data)[i].email}</span>
          </div>`

          DataAddTagCardCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" >
          <div class="ALL_psswdBlobCntSngImg"></div>
          <div class="ALL_psswdBlobCntSngName">${Object.values(data)[i].typeOfData}</div>
          <div class="ALL_psswdBlobCntSngEmail">${String(Object.values(data)[i].cardNumber).slice(0,4) + "-****-****-****"}</div>
          <span class="InfoContainer" style="display: none;">${Object.values(data)[i].typeOfData} ${String(Object.values(data)[i].cardNumber)} </span>
          </div>`

          DataAddTagAppCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" >
          <div class="ALL_psswdBlobCntSngImg"></div>
          <div class="ALL_psswdBlobCntSngName">Password of ${Object.values(data)[i].typeOfData} --> ${Object.values(data)[i].AppName}</div>
          <div class="ALL_psswdBlobCntSngEmail">${String(Object.values(data)[i].AppPassword).slice(0,2) + String(Object.values(data)[i].AppPassword).slice(2).replace(String(Object.values(data)[i].AppPassword).slice(2), "*".repeat(String(Object.values(data)[i].AppPassword).slice(2).length))}</div>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].AppName} </span>
          </div>`

          if(Object.values(data)[i].typeOfData == "Login")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagLoginCollec;
          }
          else if(Object.values(data)[i].typeOfData == "Card")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagCardCollec;
          }
          else if(Object.values(data)[i].typeOfData == "App")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagAppCollec;
          }
        }
        globalThis.last_fetched_unique_id =  Object.values(data)[Object.values(data).length - 1].unique_id;
        // console.log(last_fetched_unique_id)
        

        
    }
    else
    {
      console.log("No Collection can be fetched");
    }
  });
}

function loadMoreData()
{
getDataOfUserCollectMore(last_fetched_unique_id);
}

function getDataOfUser()
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef.limitToFirst(15)
  .on('value', (snapshot) => {
    const data = snapshot.val();
  
    // Check if data exists
    if (data) {
      document.getElementById("noDataPatch").classList.remove("noDataPatchVisible");
      document.getElementById("psswdBlobCont").style.overflowY = "auto";
      // Convert the object values to an array
      const dataArray = Object.values(new Set(Object.values(data)))

      

        for (i = 0; i < Object.values(data).length; i++)
        {
          DataAddTagLogin = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="psswdBlobCntSngImg"></div>
          <p class="psswdBlobCntSngName">${(Object.values(data)[i].service) == "Custom" ? "Login Details" : "Login Details of"+(Object.values(data)[i].service)}</p>
          <p class="psswdBlobCntSngEmail">${Object.values(data)[i].email}</p>
          <span class="InfoContainer" style="display: none;"> Login Details ${(Object.values(data)[i].service)} ${Object.values(data)[i].email} </span>
          </div>`

          

          DataAddTagCard = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="psswdBlobCntSngImg"></div>
          <p class="psswdBlobCntSngName">${Object.values(data)[i].typeOfData}</p>
          <p class="psswdBlobCntSngEmail">${String(Object.values(data)[i].cardNumber).slice(0,4) + "-****-****-****"} </p>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].typeOfData} ${String(Object.values(data)[i].cardNumber)} </span>
          </div>`

          
          

          DataAddTagApp = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="psswdBlobCntSngImg"></div>
          <p class="psswdBlobCntSngName">Password of ${Object.values(data)[i].typeOfData} --> ${Object.values(data)[i].AppName}</p>
          <p class="psswdBlobCntSngEmail">${String(Object.values(data)[i].AppPassword).slice(0,2) + String(Object.values(data)[i].AppPassword).slice(2).replace(String(Object.values(data)[i].AppPassword).slice(2), "*".repeat(String(Object.values(data)[i].AppPassword).slice(2).length))} </p>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].AppName} </span>
          </div>`

          if(Object.values(data)[i].typeOfData == "Login")
          {
            document.getElementById("psswdBlobCont").innerHTML += DataAddTagLogin;
          }
          else if(Object.values(data)[i].typeOfData == "Card")
          {
            document.getElementById("psswdBlobCont").innerHTML += DataAddTagCard;
          }
          else if(Object.values(data)[i].typeOfData == "App")
          {
            document.getElementById("psswdBlobCont").innerHTML += DataAddTagApp;
          }
          // getDataOfUserCollect(Object.values(data)[0].unique_id)
          // console.log(Object.values(data)[0].unique_id)
        }

       //dataArray.typeOfData
    } else {
      // console.log('No data available');
      document.getElementById("noDataPatch").classList.add("noDataPatchVisible");
      document.getElementById("psswdBlobCont").style.overflowY = "hidden";
    }
  });
  
  
}

getDataOfUser();
getDataOfUserCollect();





setInterval(() => {
  userGreetings();
}, 12000);
function userGreetings()
{
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greet;

  if (hrs < 12)
  greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
  greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24)
  greet = 'Good Evening';

  document.getElementById("greeting").innerHTML = greet;
}
document.getElementById("logoutBrn").addEventListener("click", () => {
  logoutRedirect();
})

function logoutRedirect()
{
  location.replace("psswdlogin.html");
}

function viewDetails(self)
{
  var obtainedUsername = self.getAttribute("data-id").split("   ")[0];
  var obtainedPassword = self.getAttribute("data-id").split("   ")[1];
  var obtainedEmail = self.getAttribute("data-id").split("   ")[2];
  var obtainedService = self.getAttribute("data-id").split("   ")[3];
  var obtainedTypeOfData = self.getAttribute("data-id").split("   ")[4];
  var obtainedAppName = self.getAttribute("data-id").split("   ")[5];
  var obtainedAppPassword = self.getAttribute("data-id").split("   ")[6];
  var obtainedCardNumber = self.getAttribute("data-id").split("   ")[7];
  var obtainedCardExpiry = self.getAttribute("data-id").split("   ")[8];
  var obtainedCardCVV = self.getAttribute("data-id").split("   ")[9];
  var obtainedCardHolderName = self.getAttribute("data-id").split("   ")[10];
  var obtainedCardService = self.getAttribute("data-id").split("   ")[11];

//   console.log(obtainedUsername,
//     obtainedPassword,
//     obtainedEmail,
//     obtainedService,
//     obtainedTypeOfData,
//     obtainedAppName,
// obtainedAppPassword,
// obtainedCardNumber,
// obtainedCardExpiry,
// obtainedCardCVV,
// obtainedCardHolderName,
// obtainedCardService);
  
    
    switch (String(obtainedTypeOfData)) {
      case "Login":
        ShowInfoforLogin(obtainedUsername, obtainedPassword, obtainedEmail, obtainedService);
        break;
      case "App":
        ShowInfoforApp(obtainedAppName, obtainedAppPassword);
        break;
      case "Card":
        ShowInfoforCard(obtainedCardNumber, obtainedCardExpiry, obtainedCardCVV, obtainedCardHolderName, obtainedCardService);
    }
   

}

function ShowInfoforLogin(name, pass, email, service)
{
    
    
    globalThis.ViewMode = "ReadOnly";
    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;
    document.getElementById("SeePwdOfAddPwd").classList.remove("hidden");
    document.getElementById("copyPassAddPassword").style.display = "block";
    document.getElementById("copyPassAddPassword").setAttribute("data-id", pass);
    

    document.getElementById("caretDown").addEventListener("click", () => {
      document.getElementById("allPsswds").classList.remove("blurHover");
      document.getElementById("CrossAllPwdDown").style.zIndex = 20;
      document.getElementById("searchBarPwdCollec").style.zIndex = 17;
      document.querySelector(".maskPwdCollec").style.zIndex = 16;
      document.getElementById("copyPassAddPassword").style.display = "none";
      document.getElementById("copyPassAddPassword").setAttribute("data-id", "");

        (ViewMode != "Editable") ? (document.getElementById("usernameInp").value = "",
        document.getElementById("passwordInp").value = "",
        document.getElementById("emailInp").value = "",
        document.getElementById("selectedServiceAddPassword").innerHTML = "",
        document.getElementById("passwordInp").setAttribute("type" , "password"),
        togglePasswordvisibility("SeePwdOfAddPwd", "passwordInp"),

        document.getElementById("usernameInp").removeAttribute("readOnly"),
        document.getElementById("passwordInp").removeAttribute("readOnly"),
        document.getElementById("emailInp").removeAttribute("readOnly"),
        document.getElementById("suggestNav").style.pointerEvents = "all",
        document.getElementById("submitEntry").style.pointerEvents = "all",

        document.getElementById("GenPwd").style.opacity = "1",
        document.getElementById("GenPwd").style.pointerEvents = "all",

        clearTimeout(ViewModeReadOnlyTimer),
        ViewMode = "Editable")
        
        
        :
        null;
    })

    ViewModeReadOnlyTimer = setInterval(() => {
        if(ViewMode == "ReadOnly")
        {
            document.getElementById("usernameInp").setAttribute("readOnly" , "true");

            document.getElementById("passwordInp").setAttribute("readOnly" , "true");
            

            document.getElementById("emailInp").setAttribute("readOnly" , "true");
            document.getElementById("suggestNav").style.pointerEvents = "none";
            document.getElementById("submitEntry").style.pointerEvents = "none";    
            
            // document.getElementById("SeePwdOfAddPwd").style.opacity = "0";
            document.getElementById("GenPwd").style.opacity = "0";
            // document.getElementById("SeePwdOfAddPwd").style.pointerEvents = "none";
            document.getElementById("GenPwd").style.pointerEvents = "none";
        }
        else
        {
            null;
        }
    }, 200);


  document.getElementById("usernameInp").value = "";
  document.getElementById("passwordInp").value = "";
  document.getElementById("emailInp").value = "";
  document.getElementById("selectedServiceAddPassword").innerHTML = "";
  
  

  document.getElementById("addPsswd").classList.contains("active") ? null : document.getElementById("addPsswd").classList.add("active");

  setTimeout(() => {
    typeWriterEffectValue("usernameInp", name);
    typeWriterEffectValue("passwordInp", pass);
    typeWriterEffectValue("emailInp", email);
    typeWriterEffectHTML("selectedServiceAddPassword", service);
  }, 800);

}

function copyPassword(self)
{
            const textToCopy = self.getAttribute("data-id");
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
}
function copyPassword(self)
{
  const textToCopy = self.getAttribute("data-id");
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
}

function ShowInfoforApp(appname, pass) 
{
    globalThis.ViewMode = "ReadOnly";
    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;
    document.getElementById("SeePwd").classList.remove("hidden");
    document.getElementById("copyPass").style.display = "block";
    document.getElementById("copyPass").setAttribute("data-id", pass);

    document.getElementById("caretDownApp").addEventListener("click", () => {
      document.getElementById("copyPass").style.display = "none";
      document.getElementById("copyPass").setAttribute("data-id", "");
    document.getElementById("allPsswds").classList.remove("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("searchBarPwdCollec").style.zIndex = 17;
    document.querySelector(".maskPwdCollec").style.zIndex = 16;

    


        (ViewMode != "Editable") ? (document.getElementById("usernameInpApp").value = "" ,
        document.getElementById("passwordInpApp").value = "",
        globalThis.ViewMode = "Editable",

        document.getElementById("passwordInpApp").setAttribute("type" , "password"),
        togglePasswordvisibility("SeePwd", "passwordInpApp"),

        document.getElementById("usernameInpApp").removeAttribute("readOnly"),
        document.getElementById("passwordInpApp").removeAttribute("readOnly"),
        document.getElementById("submitEntryApp").style.pointerEvents = "all",
        document.getElementById("GenPwdApp").style.opacity = "1",
        document.getElementById("GenPwdApp").style.pointerEvents = "all",
        clearTimeout(ViewModeReadOnlyTimer))
        :
        null;
    })


    ViewModeReadOnlyTimer = setInterval(() => {
        if(ViewMode == "ReadOnly")
        {
            document.getElementById("usernameInpApp").setAttribute("readOnly" , "true");
            document.getElementById("passwordInpApp").setAttribute("readOnly" , "true");
            document.getElementById("submitEntryApp").style.pointerEvents = "none";   
            document.getElementById("GenPwdApp").style.opacity = "0";
            document.getElementById("GenPwdApp").style.pointerEvents = "none";

        }
        else
        {
            null;
        }
    }, 200);

  document.getElementById("usernameInpApp").value = "";
  document.getElementById("passwordInpApp").value = "";
  document.getElementById("addApp").classList.contains("active") ? null : document.getElementById("addApp").classList.add("active");

  setTimeout(() => {
    typeWriterEffectValue("usernameInpApp", appname);
    typeWriterEffectValue("passwordInpApp", pass);
  }, 800);


}
function ShowInfoforCard(num, exp, cvv, name, cardService)
{
    
    globalThis.ViewMode = "ReadOnly";
    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;

    document.getElementById("caretDownCard").addEventListener("click", () => {
    document.getElementById("allPsswds").classList.remove("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("searchBarPwdCollec").style.zIndex = 17;

    

        (ViewMode != "Editable") ? (document.getElementById("usernameInpCard").value = "",
        document.getElementById("passwordInpCard").value = "",
        document.getElementById("DateInpCard").value = "",
        document.getElementById("emailInpCard").value = "",
        document.getElementById("selectedServiceCard").innerHTML = "",
        globalThis.ViewMode = "Editable",

        document.getElementById("usernameInpCard").removeAttribute("readOnly"),
        document.getElementById("passwordInpCard").removeAttribute("readOnly"),
        document.getElementById("emailInpCard").removeAttribute("readOnly"),
        document.getElementById("DateInpCard").removeAttribute("readOnly"),
        document.getElementById("suggestNavCard").style.pointerEvents = "all",
        document.getElementById("submitEntryCard").style.pointerEvents = "all",

        clearTimeout(ViewModeReadOnlyTimer))
        :
        null;
    })
     ViewModeReadOnlyTimer = setInterval(() => {
        if(ViewMode == "ReadOnly")
        {
            document.getElementById("usernameInpCard").setAttribute("readOnly" , "true");
            document.getElementById("passwordInpCard").setAttribute("readOnly" , "true");
            document.getElementById("emailInpCard").setAttribute("readOnly" , "true");
            document.getElementById("DateInpCard").setAttribute("readOnly" , "true");
            document.getElementById("suggestNavCard").style.pointerEvents = "none";
            document.getElementById("submitEntryCard").style.pointerEvents = "none";


        }
        else
        {
            null;
        }
    }, 200);

  document.getElementById("usernameInpCard").value = "";
  document.getElementById("passwordInpCard").value = "";
  document.getElementById("DateInpCard").value = "";
  document.getElementById("emailInpCard").value = "";
  document.getElementById("selectedServiceCard").innerHTML = "";

  document.getElementById("usernameInpCard").style.disabled = true;

  document.getElementById("addCard").classList.contains("active") ? null : document.getElementById("addCard").classList.add("active");

  setTimeout(() => {
    typeWriterEffectValue("usernameInpCard", num);
    typeWriterEffectValue("passwordInpCard", cvv);
    typeWriterEffectValue("DateInpCard", exp);
    typeWriterEffectValue("emailInpCard", name);
    typeWriterEffectHTML("selectedServiceCard", cardService);
  }, 800);



}



