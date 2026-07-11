@ -0,0 +1,82 @@
import { login, forgotPassword } from "./auth.js";
import { googleLogin } from "./auth.js";
const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const forgot = document.getElementById("forgot");


// Login
loginBtn.addEventListener("click", async () => {

    const userEmail = email.value.trim();
    const userPassword = password.value;

    if(userEmail === "" || userPassword === ""){
        alert("Имэйл болон нууц үгээ оруулна уу");
        return;
    }

    try {

        await login(userEmail, userPassword);

        alert("Амжилттай нэвтэрлээ!");

        window.location.href = "Home.html";

    } catch(error) {

        alert(error.message);

    }

});


// Нууц үг мартсан
forgot.addEventListener("click", async (e) => {

    e.preventDefault();

    const userEmail = email.value.trim();

    if(userEmail === ""){
        alert("Эхлээд имэйлээ оруулна уу");
        return;
    }

    try {

        await forgotPassword(userEmail);

        alert("Нууц үг солих холбоос имэйл рүү явлаа");

    } catch(error){

        alert(error.message);

    }

});
const googleBtn = document.getElementById("image");


googleBtn.addEventListener("click", async()=>{

    try{

        await googleLogin();

        alert("Google-ээр амжилттай нэвтэрлээ!");

        window.location.href="Home.html";

    }catch(error){

        alert(error.message);

    }

});
