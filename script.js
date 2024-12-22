const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Java", "Python", "JavaScript", "C++"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = "";

// Get DOM elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Function to load the current question and options
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => {
            selectedAnswer = option;
            disableOptions();
            nextButton.disabled = false;
        });
        optionsContainer.appendChild(optionButton);
    });

    nextButton.disabled = true;
}

// Function to disable options after one is selected
function disableOptions() {
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Function to move to the next question or end the quiz
function nextQuestion() {
    // Check if the selected answer is correct
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    // Reset selected answer and increment question index
    selectedAnswer = "";
    currentQuestionIndex++;

    // Check if the quiz has ended
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Function to display the score
function showScore() {
    scoreElement.textContent = `Your Score: ${score} / ${quizData.length}`;
    nextButton.style.display = "none"; // Hide Next button after quiz ends
}

// Load the first question
loadQuestion();

// Event listener for the next button
nextButton.addEventListener('click', nextQuestion);