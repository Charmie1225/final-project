const quizData = {
    science: [
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "H2"],
            correctAnswer: "H2O"
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
            correctAnswer: "Mitochondria"
        }
    ],
    computer: [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "High Text Markup Language", "Hyperlink Text Markup Language"],
            correctAnswer: "Hyper Text Markup Language"
        },
        {
            question: "Which programming language is known as the backbone of web development?",
            options: ["C++", "JavaScript", "Python", "Java"],
            correctAnswer: "JavaScript"
        }
    ],
    biology: [
        {
            question: "What is the basic unit of life?",
            options: ["Atom", "Molecule", "Cell", "Tissue"],
            correctAnswer: "Cell"
        },
        {
            question: "Which part of the plant conducts photosynthesis?",
            options: ["Roots", "Stem", "Leaves", "Flowers"],
            correctAnswer: "Leaves"
        }
    ],
    math: [
        {
            question: "What is the square root of 16?",
            options: ["2", "4", "8", "16"],
            correctAnswer: "4"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4"
        }
    ],
    history: [
        {
            question: "Who was the first president of the United States?",
            options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
            correctAnswer: "George Washington"
        },
        {
            question: "Which war ended in 1945?",
            options: ["World War I", "World War II", "Vietnam War", "Civil War"],
            correctAnswer: "World War II"
        }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = "";
let currentCategory = "";

// Get DOM elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const categorySelection = document.getElementById('category-selection');
const quizElement = document.getElementById('quiz');

// Start the quiz by category
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = "";
    
    // Hide category selection and show the quiz
    categorySelection.style.display = "none";
    quizElement.style.display = "block";

    loadQuestion();
}

// Load question based on the selected category
function loadQuestion() {
    const currentQuestion = quizData[currentCategory][currentQuestionIndex];
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

// Disable options after one is selected
function disableOptions() {
    const buttons = optionsContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Move to the next question or end the quiz
function nextQuestion() {
    // Check if the selected answer is correct
    const currentQuestion = quizData[currentCategory][currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    // Reset selected answer and increment question index
    selectedAnswer = "";
    currentQuestionIndex++;

    // Check if the quiz has ended
    if (currentQuestionIndex < quizData[currentCategory].length) {
        loadQuestion();
    } else {
        showScore();
    }
}

// Display the score at the end of the quiz
function showScore() {
    scoreElement.textContent = `Your Score: ${score} / ${quizData[currentCategory].length}`;
    nextButton.style.display = "none"; // Hide Next button after quiz ends
}

// Event listener for the next button
nextButton.addEventListener('click', nextQuestion);
