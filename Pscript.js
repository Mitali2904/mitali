const questions = [
    {
        question: "What does CPU stand for?",
        answers: [
            {text: "Central Processing Unit",correct:true},
            {text: "Computer personal Unit",correct:false},
            {text: "Central Program Unit",correct:false},
            {text: "Control Processing Unit",correct:false},
        ]
    },
    {
        question: "Which programming language is primarily used for web development?",
        answers: [
            {text: "Java",correct:false},
            {text: "Python",correct:false},
            {text: "HTML",correct:true},
            {text: "C++",correct:false},
        ]
    },
    {
        question: "Which company developed windows operating system?",
        answers: [
            {text: "Apple",correct:false},
            {text: "Microsoft",correct:true},
            {text: "IBM",correct:false},
            {text: "Google",correct:false},
        ] 
    },
    {
        question: "Which protocol is used for secure data transmission over the internet?",
        answers: [
            {text: "HTTP",correct:false},
            {text: "FTP",correct:false},
            {text: "HTTPS",correct:true},
            {text: "SMTP",correct:false},
        ]
    },
    {
        question: "What is default port number for HTTP?",
        answers: [
            {text: "21",correct:false},
            {text: "80",correct:true},
            {text: "443",correct:false},
            {text: "8080",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}
 
function showScore(){
resetState();
questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
nextButton.innerHTML="Play Again";
nextButton.style.display="block";
}

function handleNextButton(){
currentQuestionIndex++;
if(currentQuestionIndex< questions.length){
    showQuestion();
}else{
    showScore();
}
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
