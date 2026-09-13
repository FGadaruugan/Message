function notify(message) { document.getElementById("status").textContent = message; }
import { register } from "./auth.js";
import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");

const signupBtn = document.getElementById("signupBtn");

document.getElementById("authForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (signupBtn.disabled) return;

    if (
        firstname.value.trim() === "" ||
        lastname.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value === ""
    ) {
        notify("Бүх мэдээллээ бөглөнө үү.");
        return;
    }

    signupBtn.disabled = true;
    try {

        const userCredential = await register(
    email.value.trim(),
    password.value
);

await setDoc(doc(db, "users", userCredential.user.uid), {
    firstname: firstname.value.trim(),
    lastname: lastname.value.trim(),
    email: email.value.trim(),
    score: 0,
    level: 1
});

        notify("Бүртгэл амжилттай үүслээ!");
        window.location.href ="Home.html";

    } catch (error) {
        notify("Үйлдэл амжилтгүй. Мэдээлэл болон интернет холболтоо шалгаарай.");
        signupBtn.disabled = false;
    }

});
