import { auth, db } from "./firebase.js";

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

export async function ensureProfile(user) {
    const { doc, runTransaction } = await import("https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js");
    const ref = doc(db, "users", user.uid);
    await runTransaction(db, async tx => {
        const snap = await tx.get(ref);
        if (!snap.exists()) tx.set(ref, {firstname:user.displayName || "Суралцагч",lastname:"",email:user.email || "",score:0,level:1});
    });
}
