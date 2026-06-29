const quizData = [
    {
        question: "What is the capital of India?",
        answers: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        correct: 1
    },
    {
        question: "Which is the largest planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 3
    },
    {
        question: "HTML stands for?",
        answers: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "High Text Machine Language",
            "None"
        ],
        correct: 0
    },
    {
        question: "CSS is used for?",
        answers: ["Database", "Styling", "Logic", "Server"],
        correct: 1
    },
    {
        question: "JS stands for?",
        answers: ["JavaSource", "JavaScript", "JustScript", "None"],
        correct: 1
    },
    {
        question: "Which language runs in browser?",
        answers: ["Python", "C", "JavaScript", "Java"],
        correct: 2
    },
    {
        question: "Which tag is used for paragraph?",
        answers: ["<div>", "<span>", "<p>", "<h1>"],
        correct: 2
    },
    {
        question: "Which company developed JavaScript?",
        answers: ["Google", "Microsoft", "Netscape", "Apple"],
        correct: 2
    },
    {
        question: "Which symbol is used for comments in JS?",
        answers: ["#", "<!-- -->", "//", "**"],
        correct: 2
    },
    {
        question: "Which HTML tag is for link?",
        answers: ["<url>", "<a>", "<link>", "<href>"],
        correct: 1
    },
    {
        question: "Which is not a programming language?",
        answers: ["HTML", "Java", "C++", "Python"],
        correct: 0
    },
    {
        question: "Which is used to store data in JS?",
        answers: ["Class", "Variable", "Tag", "Style"],
        correct: 1
    },
    {
        question: "Which HTML tag is for image?",
        answers: ["<image>", "<img>", "<pic>", "<src>"],
        correct: 1
    },
    {
        question: "Which is the correct file extension for JS?",
        answers: [".java", ".html", ".css", ".js"],
        correct: 3
    },
    {
        question: "Which company owns Chrome?",
        answers: ["Mozilla", "Apple", "Google", "Microsoft"],
        correct: 2
    }
];

// DOM element selection
const question = document.querySelector("#question");
const answers = document.querySelector("#answers");
const nextBtn = document.querySelector("#nextBtn");
const progress = document.querySelector("#progress");
const quizBox = document.querySelector("#quizBox");
const resultsBox = document.querySelector("#resultsBox");
const restartBtn = document.querySelector("#restartBtn");

let currentQuestionIndex = 0
let selectedAnswer = null
let score = 0

function loadQuestion() {

    selectedAnswer = null
    nextBtn.style.display = 'none'

    const currentQuestion = quizData[currentQuestionIndex]
    question.textContent = currentQuestion.question
    progress.textContent = `${currentQuestionIndex} / ${quizData.length}`

    answers.innerHTML = ""

    currentQuestion.answers.forEach((answer, index) => {
        const answerBtn = document.createElement("button")
        answerBtn.className = "answer-btn"
        answerBtn.textContent = answer

        answerBtn.addEventListener("click",
            () => selectAnswer(answerBtn, index)
        )
        answers.append(answerBtn)
    });
}


function selectAnswer(clickedAnswer, index) {
    selectedAnswer = index;

    const buttons = document.querySelectorAll(".answer-btn")
    buttons.forEach(btn => btn.classList.remove('selected'))
    clickedAnswer.classList.add('selected')

    nextBtn.style.display = 'block'
}

function checkAnswer() {
    const currentQuestion = quizData[currentQuestionIndex]
    const buttons = document.querySelectorAll(".answer-btn")

    buttons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === currentQuestion.correct) {
        score++;
        buttons[selectedAnswer].classList.add('correct')
    }

    else {
        buttons[currentQuestion.correct].classList.add('correct')
        buttons[selectedAnswer].classList.add('wrong')
    }

}

function nextQuestion() {
    checkAnswer()
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(loadQuestion, 1500)
    }
    else {
        setTimeout(showResults, 1500)
    }

}

function showResults() {
    quizBox.style.display = 'none'
    resultsBox.style.display = 'block'


    const percentage = Math.round((score / quizData.length) * 100)
    document.querySelector('.score-number').textContent = `
        ${score} / ${quizData.length}
    `

    document.querySelector('.score-percentage').textContent = `
        ${percentage}%
    `

    const resultMessage = document.querySelector("#resultMessage")
    if (percentage >= 80) {
        resultMessage.textContent = "🔥 Genius! You nailed the quiz!";
    }
    else if (percentage >= 60) {
        resultMessage.textContent = "😎 Well Done! You're almost a pro!";
    }
    else if (percentage >= 40) {
        resultMessage.textContent = "💪 Nice Effort! Keep learning!";
    }
    else {
        resultMessage.textContent = "🚀 Every expert was once a beginner. Try again!";
    }
}



function restartQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    selectedAnswer = null
    quizBox.style.display = 'block'
    resultsBox.style.display = 'none'

    loadQuestion();

}
nextBtn.addEventListener('click', nextQuestion)
restartBtn.addEventListener('click', restartQuiz)
loadQuestion();


