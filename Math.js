import { auth } from "./firebase.js";
import { addScore } from "./firestore.js";

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");
const homeBtn = document.getElementById("homeBtn");

let a;
let b;
let correct;

function newQuestion(){

    a = Math.floor(Math.random()*20)+1;
    b = Math.floor(Math.random()*20)+1;

    correct = a + b;

    question.textContent = `${a} + ${b} = ?`;

    answer.value = "";

}

checkBtn.addEventListener("click", async()=>{

    if(Number(answer.value) === correct){

        result.textContent = "✅ Зөв! +2 Оноо";

        const user = auth.currentUser;

        if(user){

            await addScore(user.uid,2);

        }

    }else{

        result.textContent = `❌ Буруу! Зөв хариу: ${correct}`;

    }

    setTimeout(newQuestion,1000);

});

homeBtn.addEventListener("click",()=>{

    window.location.href="Home.html";

});

newQuestion();
