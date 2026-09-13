import { auth } from "./firebase.js";
import { getUser, claimTestReward } from "./firestore.js";
import { logout } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const nameText = document.getElementById("name");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

const logoutBtn = document.getElementById("logoutBtn");

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

    let data;
    try { data = await getUser(user.uid); } catch {
        window.finishLoading?.();
        document.getElementById("status").textContent = "Мэдээлэл уншиж чадсангүй. Дахин ачаалаарай.";
        return;
    }
    window.finishLoading?.();
    claimBtn.disabled = false;
    if (!data) data = {};

    nameText.textContent =
    `${data.firstname ?? ""} ${data.lastname ?? ""}`.trim() || "Суралцагч";

    scoreText.textContent =
    data.score ?? 0;

    levelText.textContent =
    data.level ?? 1;

    // Test дууссан эсэх

    if(data.lastTestScore !== undefined){

        rewardTitle.textContent =
        "Сүүлийн тестийн үр дүн";

        rewardInfo.textContent =
        `⭐ +${data.levelReward ?? 0} түвшин`;

        rewardTime.textContent =
        `⏱ ${data.lastTestTime ?? "--:--"} • ${data.lastTestScore}/${data.lastTestTotal ?? 25} зөв`;

        claimBtn.textContent =
        "Хариугаа харах";

        claimBtn.onclick = async()=>{

            claimBtn.disabled = true;
            try { await claimTestReward(currentUser.uid); }
            catch { document.getElementById("status").textContent = "Шагнал авч чадсангүй. Дахин оролдоорой."; claimBtn.disabled = false; return; }

            location.href="Result.html";

        };

    }else{

        rewardTitle.textContent =
        "Математикийн тест";

        rewardInfo.textContent =
        "Зөв хариулт бүрд +2 түвшин";

        rewardTime.textContent =
        "20 минут · 25 асуулт";

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
