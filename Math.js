import { auth } from "./firebase.js";
import { addScore } from "./firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const button = document.getElementById("checkBtn");
const result = document.getElementById("result");
let correct, busy = false;
function next() {
    const a = Math.floor(Math.random()*20)+1, b = Math.floor(Math.random()*20)+1;
    correct = a+b; question.textContent = `${a} + ${b} = ?`; answer.value = "";
    busy = false; button.disabled = false;
}
onAuthStateChanged(auth, user => { if (!user) location.href = "index.html"; else { next(); window.finishLoading?.(); } });
document.getElementById("mathForm").addEventListener("submit", async event => {
    event.preventDefault();
    if (busy || !auth.currentUser || answer.value.trim() === "") return;
    busy = true; button.disabled = true;
    if (Number(answer.value) === correct) {
        try { await addScore(auth.currentUser.uid, 2); result.textContent = "✓ Зөв! +2 оноо"; }
        catch { result.textContent = "Зөв! Оноо хадгалж чадсангүй. Холболтоо шалгаарай."; }
    } else result.textContent = `Зөв хариу: ${correct}. Дараагийн бодлогыг бодоорой.`;
    setTimeout(() => { next(); answer.focus(); }, 1200);
});
