import { auth } from "./firebase.js";
import { updateUser } from "./firestore.js";


const questions = [

    {
        q:"55 × 7 = ?",
        a:["355","395","415","385"],
        c:"385"
    },

    {
        q:"999 + (99 - 7) ÷ 2 = ?",
        a:["1004","1045","1146","1046"],
        c:"1045"
    },

    {
        q:"28 ÷ 7 + 7 × 1 = ?",
        a:["77","4","11","8"],
        c:"11"
    },

    {
        q:"400 ÷ 5 = ?",
        a:["90","80","60","40"],
        c:"80"
    },

    {
        q:"890 ÷ 5 = ?",
        a:["196","192","186","178"],
        c:"178"
    },

    {
        q:"12 × 12 = ?",
        a:["124","142","144","154"],
        c:"144"
    },

    {
        q:"15 × 8 = ?",
        a:["120","125","115","130"],
        c:"120"
    },

    {
        q:"96 ÷ 8 = ?",
        a:["11","12","13","14"],
        c:"12"
    },

    {
        q:"75 + 25 = ?",
        a:["95","90","100","105"],
        c:"100"
    },

    {
        q:"500 - 275 = ?",
        a:["215","225","235","245"],
        c:"225"
    },

    {
        q:"45 × 9 = ?",
        a:["405","415","395","425"],
        c:"405"
    },

    {
        q:"144 ÷ 12 = ?",
        a:["10","11","12","13"],
        c:"12"
    },

    {
        q:"18 × 6 = ?",
        a:["108","116","118","98"],
        c:"108"
    },

    {
        q:"81 ÷ 9 = ?",
        a:["7","8","9","10"],
        c:"9"
    },

    {
        q:"300 + 450 = ?",
        a:["700","750","800","850"],
        c:"750"
    },

    {
        q:"1000 - 675 = ?",
        a:["325","335","345","315"],
        c:"325"
    },

    {
        q:"64 ÷ 8 = ?",
        a:["6","7","8","9"],
        c:"8"
    },

    {
        q:"14 × 7 = ?",
        a:["96","98","94","100"],
        c:"98"
    },

    {
        q:"250 ÷ 10 = ?",
        a:["20","25","30","35"],
        c:"25"
    },

    {
        q:"19 + 36 = ?",
        a:["54","55","56","57"],
        c:"55"
    },

    {
        q:"7 × 13 = ?",
        a:["81","91","101","71"],
        c:"91"
    },

    {
        q:"240 ÷ 6 = ?",
        a:["30","35","40","45"],
        c:"40"
    },

    {
        q:"56 + 44 = ?",
        a:["90","95","100","105"],
        c:"100"
    },

    {
        q:"11 × 11 = ?",
        a:["111","121","131","141"],
        c:"121"
    },

    {
        q:"100 ÷ 4 = ?",
        a:["20","25","30","35"],
        c:"25"
    }

];



import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const question = document.getElementById("question"), answers = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn"), result = document.getElementById("result");
const actions = document.querySelector(".actions"); actions.hidden = true;
let index = 0, score = 0, records = [], locked = false, finished = false, timer, deadline, payload;
function loadQuestion() {
    locked = false; nextBtn.hidden = true; answers.replaceChildren();
    question.textContent = `${index+1}. ${questions[index].q}`;
    for (const value of questions[index].a) {
        const button = document.createElement("button"); button.textContent = value;
        button.onclick = () => {
            if (locked || finished) return;
            locked = true;
            const q = questions[index], right = value === q.c;
            if (right) score++;
            records.push({ question:q.q, selected:value, correct:q.c, result:right });
            for (const b of answers.children) b.disabled = true;
            button.style.background = right ? "#dce9cb" : "#f9ded8";
            button.textContent = `${value} ${right ? "✓" : "✕"}`;
            document.getElementById("answered").textContent = records.length;
            document.getElementById("unanswered").textContent = questions.length-records.length;
            document.getElementById("progress").value = records.length;
            nextBtn.hidden = false;
            nextBtn.textContent = index === questions.length-1 ? "Дуусгах →" : "Дараагийн асуулт →";
        };
        answers.append(button);
    }
}
async function saveResult() {
    result.textContent = "Үр дүнг хадгалж байна…";
    try {
        await updateUser(auth.currentUser.uid, payload);
        result.textContent = `Оноо: ${score}/${questions.length}. Үр дүн хадгалагдлаа!`;
        actions.hidden = false;
    } catch {
        result.textContent = "Хадгалж чадсангүй. Холболтоо шалгаад дахин оролдоорой. ";
        const retry = document.createElement("button"); retry.textContent = "Дахин хадгалах";
        retry.onclick = saveResult; result.append(retry);
    }
}
function finish() {
    if (finished) return;
    finished = true; clearInterval(timer);
    document.getElementById("testBox").hidden = true;
    const elapsed = Math.min(1200, Math.max(0, Math.floor((Date.now()-(deadline-1200000))/1000)));
    payload = {lastTestScore:score,lastTestTotal:questions.length,levelReward:score*2,rewardClaimed:false,
        lastTestTime:`${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,"0")}`,lastTestDate:Date.now(),
        answers:questions.map((q,i)=>records[i] ?? {question:q.q,selected:"Хариулаагүй",correct:q.c,result:false})};
    saveResult();
}
nextBtn.onclick = () => { if (!locked || finished) return; if (++index < questions.length) loadQuestion(); else finish(); };
nextBtn.hidden = true;
onAuthStateChanged(auth, user => {
    if (!user) { location.href="index.html"; return; }
    if (deadline) return;
    deadline = Date.now()+1200000; loadQuestion(); window.finishLoading?.();
    timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((deadline-Date.now())/1000));
        document.getElementById("time").textContent = `${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,"0")}`;
        if (!remaining) finish();
    }, 1000);
});
