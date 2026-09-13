function notify(message) { document.getElementById("status").textContent = message; }
import { login, forgotPassword } from "./auth.js";
import { googleLogin, ensureProfile } from "./auth.js";
const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const forgot = document.getElementById("forgot");


// Login
document.getElementById("authForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (loginBtn.disabled) return;

    const userEmail = email.value.trim();
    const userPassword = password.value;

    if(userEmail === "" || userPassword === ""){
        notify("Имэйл болон нууц үгээ оруулна уу");
        return;
    }

    loginBtn.disabled = true;
    try {

        await login(userEmail, userPassword);

        notify("Амжилттай нэвтэрлээ!");

        window.location.href = "Home.html";

    } catch(error) {

        notify("Үйлдэл амжилтгүй. Мэдээлэл болон интернет холболтоо шалгаарай.");
        loginBtn.disabled = false;

    }

});


// Нууц үг мартсан
forgot.addEventListener("click", async (e) => {

    e.preventDefault();

    const userEmail = email.value.trim();

    if(userEmail === ""){
        notify("Эхлээд имэйлээ оруулна уу");
        return;
    }

    try {

        await forgotPassword(userEmail);

        notify("Нууц үг солих холбоос имэйл рүү явлаа");

    } catch(error){

        notify("Үйлдэл амжилтгүй. Мэдээлэл болон интернет холболтоо шалгаарай.");
        loginBtn.disabled = false;

    }

});
const googleBtn = document.getElementById("image");


googleBtn.addEventListener("click", async()=>{

    try{

        const credential = await googleLogin();
        await ensureProfile(credential.user);

        notify("Google-ээр амжилттай нэвтэрлээ!");

        window.location.href="Home.html";

    }catch(error){

        notify("Үйлдэл амжилтгүй. Мэдээлэл болон интернет холболтоо шалгаарай.");
        loginBtn.disabled = false;

    }

});
