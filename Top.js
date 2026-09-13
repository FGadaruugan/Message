import { getTopPlayers } from "./firestore.js";
const list = document.getElementById("topList");
function row(values, cls) {
    const row = document.createElement("div"); row.className = cls;
    for (const value of values) { const cell = document.createElement("span"); cell.textContent = value; row.append(cell); }
    list.append(row);
}
try {
    const players = await getTopPlayers(); list.replaceChildren();
    row(["№", "Нэр", "Түвшин", "Оноо"], "topHeader");
    players.forEach((user, i) => row([i+1, `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() || "Суралцагч", user.level ?? 1, user.score ?? 0], "topRow"));
    if (!players.length) list.append("Одоогоор бүртгэл алга.");
} catch { list.textContent = "Жагсаалт уншиж чадсангүй. Дахин ачаалаарай."; }

window.finishLoading?.();
