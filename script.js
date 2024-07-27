const quizData = [

    {
        question: "What command is used to list files and directories in Linux?",
        a: "cd",
        b: "rm",
        c: "ls",
        d: "pwd",
        correct: "c"
    },
    {
        question: "Which directory contains system configuration files in Linux?",
        
        a: "/bin",
        b: "/home",
        c: "/usr",
        d: "/etc",
        correct: "d"
    },
    {
        question: "What is the command to change the current directory in Linux?",
        
        a: "ls",
        b: "cd",
        c: "mv",
        d: "cp",
        correct: "b"
    },
    {
        question: "What command is used to display the current directory path in Linux?",
        
        a: "ls",
        b: "dir",
        c: "pwd",
        d: "whoami",
        correct: "c"
    },
    {
        question: "Which command is used to copy files in Linux?",
        a: "cp",
        b: "mv",
        c: "rm",
        d: "cat",
        correct: "a"
    },
    {
        question: "What is the default shell in most Linux distributions?",
        a: "bash",
        b: "zsh",
        c: "fish",
        d: "csh",
        correct: "a"
    },
    {
        question: "Which command is used to display the contents of a file in Linux?",
        
        a: "touch",
        b: "echo",
        c: "nano",
        d: "cat",
        correct: "d"
    },
    {
        question: "What is the command to move or rename files in Linux?",
        a: "mv",
        b: "cp",
        c: "rm",
        d: "tar",
        correct: "a"
    },
    {
        question: "Which command is used to remove files in Linux?",
        a: "rm",
        b: "rmdir",
        c: "del",
        d: "erase",
        correct: "a"
    },
    {
        question: "What is the command to create a new directory in Linux?",
        
        a: "touch",
        b: "create",
        c: "mkfile",
        d: "mkdir",
        correct: "d"
    }


   
];

const quiz = document.querySelector(".quiz-body");
const answerEl = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const footerEl = document.querySelector(".footer");
const quizDetailEl = document.querySelector(".quiz-details");
const a_txt = document.getElementById("a_text");
const b_txt = document.getElementById("b_text");
const c_txt = document.getElementById("c_text");
const d_txt = document.getElementById("d_text");
const btnSubmit = document.getElementById("btn");
const timerEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 20;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_txt.innerText = currentQuizData.a;
    b_txt.innerText = currentQuizData.b;
    c_txt.innerText = currentQuizData.c;
    d_txt.innerText = currentQuizData.d;
    quizDetailEl.innerHTML = `<p>Question ${currentQuiz + 1} of ${quizData.length}</p>`;
    resetTimer();
    updateScoreDisplay();
}

function resetTimer() {
    timeLeft = 20;
    timerEl.innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function deselectAnswers() {
    answerEl.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function getSelected() {
    let answer;
    answerEl.forEach((answerEls) => {
        if (answerEls.checked) {
            answer = answerEls.id;
        }
    });
    return answer;
}

function updateScoreDisplay() {
    scoreEl.innerText = `Score: ${score}`;
}

btnSubmit.addEventListener("click", function () {
    const answers = getSelected();

    if (answers) {
        if (answers === quizData[currentQuiz].correct) {
            score++;
            updateScoreDisplay(); // Update score display
        }
        nextQuestion();
    }
});

function nextQuestion() {
    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button type="button" onclick="location.reload()">Reload</button>`;
        footerEl.style.display = "none";

        // Reload the page after 6 seconds
        setTimeout(() => {
            location.reload();
        }, 6000);
    }
}