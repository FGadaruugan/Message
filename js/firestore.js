import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Top Coins авах
export async function getTopPlayers(){

    const q = query(
        collection(db, "users"),
        orderBy("score", "desc"),
        limit(10)
    );


    const snapshot = await getDocs(q);

    let players = [];

    snapshot.forEach((doc)=>{

        players.push({
            id: doc.id,
            ...doc.data()
        });

    });


    return players;
}


// Хэрэглэгчийн мэдээлэл унших
export async function getUser(uid){

    const docRef = doc(db, "users", uid);

    const docSnap = await getDoc(docRef);


    if(docSnap.exists()){

        return docSnap.data();

    }


    return null;

}


// Хэрэглэгчийн мэдээлэл шинэчлэх
export async function updateUser(uid, data){

    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, data);

}


// Coin нэмэх
export async function addScore(uid, amount){

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        score: increment(amount)
    });

}


// Level нэмэх
export async function addLevel(uid, amount = 1){

    const userRef = doc(db, "users", uid);


    await updateDoc(userRef, {

        level: increment(amount)

    });

}
