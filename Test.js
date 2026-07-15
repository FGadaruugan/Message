import { auth } from "./firebase.js";
import { updateUser } from "./firestore.js";


const questions = [

    {
        q:"55 × 7 = ?",
        a:["355","395","415","385"],
        c:"385"
    },

    {
        q:"999 + (99 - 7) ÷ 2 = ?",
        a:["1004","1045","1146","1046"],
        c:"1045"
    },

    {
        q:"28 ÷ 7 + 7 × 1 = ?",
        a:["77","4","11","8"],
        c:"11"
    },

    {
        q:"400 ÷ 5 = ?",
        a:["90","80","60","40"],
        c:"80"
    },

    {
        q:"890 ÷ 5 = ?",
        a:["196","192","186","178"],
        c:"178"
    },

    {
        q:"12 × 12 = ?",
        a:["124","142","144","154"],
        c:"144"
    },

    {
        q:"15 × 8 = ?",
        a:["120","125","115","130"],
        c:"120"
    },

    {
        q:"96 ÷ 8 = ?",
        a:["11","12","13","14"],
        c:"12"
    },

    {
        q:"75 + 25 = ?",
        a:["95","90","100","105"],
        c:"100"
    },

    {
        q:"500 - 275 = ?",
        a:["215","225","235","245"],
        c:"225"
    },

    {
        q:"45 × 9 = ?",
        a:["405","415","395","425"],
        c:"405"
    },

    {
        q:"144 ÷ 12 = ?",
        a:["10","11","12","13"],
        c:"12"
    },

    {
        q:"18 × 6 = ?",
        a:["108","116","118","98"],
        c:"108"
    },

    {
        q:"81 ÷ 9 = ?",
        a:["7","8","9","10"],
        c:"9"
    },

    {
        q:"300 + 450 = ?",
        a:["700","750","800","850"],
        c:"750"
    },

    {
        q:"1000 - 675 = ?",
        a:["325","335","345","315"],
        c:"325"
    },

    {
        q:"64 ÷ 8 = ?",
        a:["6","7","8","9"],
        c:"8"
    },

    {
        q:"14 × 7 = ?",
        a:["96","98","94","100"],
        c:"98"
    },

    {
        q:"250 ÷ 10 = ?",
        a:["20","25","30","35"],
        c:"25"
    },

    {
        q:"19 + 36 = ?",
        a:["54","55","56","57"],
        c:"55"
    },

    {
        q:"7 × 13 = ?",
        a:["81","91","101","71"],
        c:"91"
    },

    {
        q:"240 ÷ 6 = ?",
        a:["30","35","40","45"],
        c:"40"
    },

    {
        q:"56 + 44 = ?",
        a:["90","95","100","105"],
        c:"100"
    },

    {
        q:"11 × 11 = ?",
        a:["111","121","131","141"],
        c:"121"
    },

    {
        q:"100 ÷ 4 = ?",
        a:["20","25","30","35"],
        c:"25"
    }

];


// 25 болгохын тулд энд асуулт нэмнэ


let index = 0;
let score = 0;
let answered = 0;

let time = 1200;


let userAnswers = [];



const question =
document.getElementById("question");

const answers =
document.getElementById("answers");

const nextBtn =
document.getElementById("nextBtn");

const result =
document.getElementById("result");


const timeText =
document.getElementById("time");

const answeredText =
document.getElementById("answered");

const unansweredText =
document.getElementById("unanswered");





function loadQuestion(){


    let q = questions[index];


    question.textContent =
    `${index + 1}. ${q.q}`;


    answers.innerHTML = "";



    q.a.forEach(answer=>{


        let btn =
        document.createElement("button");


        btn.textContent = answer;



        btn.onclick = ()=>{


            if(btn.classList.contains("done"))
                return;



            btn.classList.add("done");



            userAnswers.push({

                question:q.q,

                selected:answer,

                correct:q.c,

                result:answer === q.c

            });



            answered++;


            answeredText.textContent =
            answered;


            unansweredText.textContent =
            questions.length - answered;



            if(answer === q.c){


                score++;


                btn.style.background =
                "#4caf50";


                btn.style.color =
                "white";


            }
            else{


                btn.style.background =
                "#e53935";


                btn.style.color =
                "white";


            }




            document
            .querySelectorAll("#answers button")
            .forEach(b=>{

                b.disabled = true;

            });



            nextBtn.style.display =
            "block";


        };



        answers.appendChild(btn);


    });


}







async function finishTest(){


    clearInterval(timer);



    const user =
    auth.currentUser;



    if(user){


        // 1 зөв = 2 Level
        let levelReward = score * 2;



        // Level өгөхгүй,
        // зөвхөн хадгална

        await updateUser(user.uid,{


            lastTestScore:score,


            lastTestTotal:
            questions.length,


            levelReward:levelReward,


            rewardClaimed:false,


            lastTestTime:
            new Date()
            .toLocaleTimeString(),


            lastTestDate:
            Date.now(),


            answers:userAnswers


        });


    }




    document.getElementById("testBox")
    .style.display="none";



    result.textContent =

    `🎉 Оноо: ${score}/${questions.length}`;

}







nextBtn.onclick = ()=>{


    index++;


    nextBtn.style.display =
    "none";



    if(index < questions.length){


        loadQuestion();


    }
    else{


        finishTest();


    }


};







let timer = setInterval(()=>{


    let min =
    Math.floor(time / 60);


    let sec =
    time % 60;



    timeText.textContent =

    `${min}:${sec < 10 ? "0"+sec : sec}`;



    time--;



    if(time < 0){


        finishTest();


    }


},1000);








nextBtn.style.display="none";


answeredText.textContent = 0;


unansweredText.textContent =
questions.length;



loadQuestion();
