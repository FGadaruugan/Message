import { auth } from "./firebase.js";
import { getUser, updateUser, addLevel } from "./firestore.js";
import { logout } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



const nameText = document.getElementById("name");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");


const logoutBtn = document.getElementById("logoutBtn");
const gameBtn = document.getElementById("gameBtn");
const topBtn = document.getElementById("topBtn");

const exchangeBtn = document.getElementById("exchangeBtn");
const settingsBtn = document.getElementById("settingsBtn");


const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");


const claimBtn = document.getElementById("claimBtn");


const rewardTitle =
document.querySelector(".rewardText h2");

const rewardInfo =
document.querySelectorAll(".rewardText p")[0];

const rewardTime =
document.querySelectorAll(".rewardText p")[1];



let currentUser = null;



// USER LOAD

onAuthStateChanged(auth, async(user)=>{


    if(!user){

        location.href="index.html";
        return;

    }


    currentUser = user;


    const data = await getUser(user.uid);


    if(!data) return;



    nameText.textContent =
    `${data.firstname ?? ""} ${data.lastname ?? ""}`;


    scoreText.textContent =
    data.score ?? 0;


    levelText.textContent =
    data.level ?? 1;




    // Test дууссан эсэх

    if(data.lastTestScore !== undefined){



        rewardTitle.textContent =
        "Math Test Completed 🎉";


        rewardInfo.textContent =
        `⭐ +${data.levelReward ?? 0} Level`;


        rewardTime.textContent =
        `⏱ ${data.lastTestTime ?? "--:--"} • ${data.lastTestScore}/${data.lastTestTotal ?? 25} зөв`;



        claimBtn.textContent =
        "Хариугаа харах";



        claimBtn.onclick = async()=>{


            if(
                data.rewardClaimed === false
                &&
                data.levelReward > 0
            ){


                await addLevel(
                    currentUser.uid,
                    data.levelReward
                );


                await updateUser(
                    currentUser.uid,
                    {
                        rewardClaimed:true
                    }
                );


            }


            location.href="Result.html";


        };



    }else{


        rewardTitle.textContent =
        "Level Up Math";


        rewardInfo.textContent =
        "⭐ +50 Level";


        rewardTime.textContent =
        "⏱ 20 min • 25 test";


        claimBtn.textContent =
        "Эхлүүлэх";


        claimBtn.onclick = ()=>{

            location.href="Test.html";

        };


    }


});






// LOGOUT

logoutBtn?.addEventListener("click",async()=>{


    await logout();

    location.href="index.html";


});






// MATH

gameBtn?.addEventListener("click",()=>{


    location.href="Math.html";


});






// WORLD TOP

topBtn?.addEventListener("click",()=>{


    location.href="Top.html";


});






// 100 SCORE -> 1 LEVEL

exchangeBtn?.addEventListener("click",()=>{


    location.href="Exchange.html";


});







// SETTINGS

settingsBtn?.addEventListener("click",()=>{


    location.href="Settings.html";


});







// MENU OPEN

menuBtn?.addEventListener("click",(e)=>{


    e.stopPropagation();


    menu.classList.toggle("show");


});






// OUTSIDE CLICK CLOSE

document.addEventListener("click",(e)=>{


    if(
        !menu.contains(e.target)
        &&
        e.target !== menuBtn
    ){

        menu.classList.remove("show");

    }


});
