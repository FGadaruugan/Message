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



// ===== Top Players =====

export async function getTopPlayers(){

    const q = query(
        collection(db, "users"),
        orderBy("level", "desc"),
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





// ===== Get User =====

export async function getUser(uid){


    const docRef = doc(db,"users",uid);


    const docSnap = await getDoc(docRef);



    if(docSnap.exists()){

        return docSnap.data();

    }



    return null;

}





// ===== Update User =====

export async function updateUser(uid,data){


    const userRef = doc(db,"users",uid);



    await updateDoc(userRef,data);


}





// ===== Add Score =====

export async function addScore(uid,amount){


    const userRef = doc(db,"users",uid);



    await updateDoc(userRef,{

        score: increment(amount)

    });


}





// ===== Add Level =====

export async function addLevel(uid,amount=1){


    const userRef = doc(db,"users",uid);



    await updateDoc(userRef,{

        level: increment(amount)

    });


}
