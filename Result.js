import { auth } from "./firebase.js";
import { getUser } from "./firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



const scoreText =
document.getElementById("score");


const timeText =
document.getElementById("time");


const answersList =
document.getElementById("answersList");


const backBtn =
document.getElementById("backBtn");





onAuthStateChanged(auth, async(user)=>{


    if(!user){

        window.location.href="index.html";

        return;

    }



    const data =
    await getUser(user.uid);



    if(!data) return;



    // Оноо

    scoreText.textContent =
    `🎉 Оноо: ${data.lastTestScore}/${data.lastTestTotal ?? 25}`;



    // Цаг

    timeText.textContent =
    `⏱ ${data.lastTestTime ?? "--:--"}`;





    // Хариу

    answersList.innerHTML = "";



    if(data.answers){


        data.answers.forEach((item,index)=>{


            const div =
            document.createElement("div");



            div.className =
            "answerCard";



            div.innerHTML = `

            <h3>
            ${index+1}. ${item.question}
            </h3>


            <p>
            Таны хариу:
            <b>${item.selected}</b>
            </p>


            <p>
            Зөв хариу:
            <b>${item.correct}</b>
            </p>


            <h4>
            ${
                item.result
                ?
                "✅ Зөв"
                :
                "❌ Буруу"
            }
            </h4>

            `;



            answersList.appendChild(div);



        });



    }

});






backBtn?.addEventListener("click",()=>{


    window.location.href="Home.html";


});
