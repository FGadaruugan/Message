import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// Бүртгэл
export async function register(email, password) {
    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}


// Login
export async function login(email, password) {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}


// Logout
export async function logout() {
    return await signOut(auth);
}


// Password reset
export async function forgotPassword(email) {
    return await sendPasswordResetEmail(
        auth,
        email
    );
}


// Google login
const provider = new GoogleAuthProvider();

export async function googleLogin(){

    return await signInWithPopup(
        auth,
        provider
    );

}
