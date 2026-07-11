import { auth } from "./firebase.js";
import { getUser } from "./firestore.js";
import { logout } from "./auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const nameText = document.getElementById("name");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

const logoutBtn = document.getElementById("logoutBtn");
const gameBtn = document.getElementById("GameBtn");
const topBtn = document.getElementById("topBtn");

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const data = await getUser(user.uid);

    if (!data) return;

    nameText.textContent =
        `${data.firstname ?? ""} ${data.lastname ?? ""}`;

    scoreText.textContent =
        data.score ?? 0;

    levelText.textContent =
        data.level ?? 1;

});

// Logout
logoutBtn?.addEventListener("click", async () => {

    await logout();

    window.location.href = "index.html";

});

// Game
gameBtn?.addEventListener("click", () => {

    window.location.href = "Maht.html";

});

// Top
topBtn?.addEventListener("click", () => {

    window.location.href = "Top.html";

});

// Menu
menuBtn?.addEventListener("click", (e) => {

    e.stopPropagation();

    menu.classList.toggle("show");

});

document.addEventListener("click", (e) => {

    if (!menu.contains(e.target) && e.target !== menuBtn) {

        menu.classList.remove("show");

    }

});
