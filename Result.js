import { auth } from "./firebase.js";
import { getUser, claimTestReward } from "./firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const score = document.getElementById("score"), time = document.getElementById("time");
document.getElementById("backBtn").onclick = () => location.href="Home.html";
onAuthStateChanged(auth, async user => {
    if (!user) { location.href="index.html"; return; }
    try {
        const data = await getUser(user.uid);
        if (data?.lastTestScore === undefined) { score.textContent="Тестийн үр дүн алга"; return; }
        score.textContent=`${data.lastTestScore} / ${data.lastTestTotal ?? 25} зөв хариулт`;
        time.textContent=`Хугацаа: ${data.lastTestTime ?? "—"}`;
        const list = document.getElementById("answersList"); list.replaceChildren();
        (data.answers ?? []).forEach((item,index) => {
            const card = document.createElement("article"); card.className="answerCard";
            for (const [tag,text] of [["h3",`${index+1}. ${item.question}`],["p",`Чиний хариу: ${item.selected}`],["p",`Зөв хариу: ${item.correct}`],["p",item.result ? "✓ Зөв" : "✕ Дахин давтаарай"]]) {
                const el=document.createElement(tag); el.textContent=text; card.append(el);
            }
            list.append(card);
        });
        try { await claimTestReward(user.uid); }
        catch { time.textContent += " · Шагнал авч чадсангүй. Нүүрнээс дахин оролдоорой."; }
    } catch { score.textContent="Үр дүн уншиж чадсангүй. Дахин ачаалаарай."; }
});
