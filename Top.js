import { db } from "./firebase.js";

import {
collection,
query,
orderBy,
limit,
getDocs
} 
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const topList = document.getElementById("topList");

async function loadTop(){

    const q = query(
        collection(db,"users"),
        orderBy("score","desc"),
        limit(10)
    );

    const snap = await getDocs(q);

    let html = `

    <div class="topHeader">
        <span>Top</span>
        <span>Name</span>
        <span>Lv</span>
        <span>Score</span>
    </div>

    `;

    let rank = 1;

    snap.forEach((doc)=>{

        const user = doc.data();

        html += `

        <div class="topRow">

            <span>${rank}</span>

            <span>
            ${user.firstname} ${user.lastname}
            </span>

            <span>
            ⭐ ${user.level}
            </span>

            <span>
            🏆 ${user.score}
            </span>

        </div>

        `;

        rank++;

    });


    topList.innerHTML = html;

}

loadTop();
