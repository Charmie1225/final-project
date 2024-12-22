const quizData = {
    science: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], correctAnswer: "H2O" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"], correctAnswer: "Mitochondria" },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Mercury"], correctAnswer: "Mars" },
        { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
        { question: "What is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], correctAnswer: "Jupiter" },
        { question: "What is the human body's largest organ?", options: ["Liver", "Skin", "Brain", "Heart"], correctAnswer: "Skin" },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "80°C", "110°C"], correctAnswer: "100°C" },
        { question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: "Nitrogen" },
        { question: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCl2", "MgCl2"], correctAnswer: "NaCl" },
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "200,000 km/s"], correctAnswer: "300,000 km/s" }
    ],
    computer: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlink Text Markup Language", "High Text Markup Language", "Hyper Transfer Markup Language"], correctAnswer: "Hyper Text Markup Language" },
        { question: "Which programming language is used for AI?", options: ["Python", "JavaScript", "C", "SQL"], correctAnswer: "Python" },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: "Cascading Style Sheets" },
        { question: "What is the main function of a CPU?", options: ["Processing data", "Storing data", "Connecting devices", "Displaying output"], correctAnswer: "Processing data" },
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Query Language", "Standard Query Language", "Short Query Language"], correctAnswer: "Structured Query Language" },
        { question: "What is a loop in programming?", options: ["A sequence of repeated instructions", "A function definition", "A variable declaration", "An input operation"], correctAnswer: "A sequence of repeated instructions" },
        { question: "Which company developed the Java programming language?", options: ["Sun Microsystems", "Microsoft", "Google", "Apple"], correctAnswer: "Sun Microsystems" },
        { question: "What is an IP address?", options: ["A unique identifier for a device", "A programming term", "A file format", "A hardware component"], correctAnswer: "A unique identifier for a device" },
        { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Integration", "Artificial Programming Intelligence", "Application Processing Integration"], correctAnswer: "Application Programming Interface" },
        { question: "Which language is commonly used for web development?", options: ["HTML", "Python", "C++", "Java"], correctAnswer: "HTML" }
    ],
    biology: [
        { question: "What is the basic unit of life?", options: ["Cell", "Tissue", "Organ", "Molecule"], correctAnswer: "Cell" },
        { question: "Which blood type is known as the universal donor?", options: ["O-", "O+", "AB+", "B-"], correctAnswer: "O-" },
        { question: "What is the process by which plants make food?", options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"], correctAnswer: "Photosynthesis" },
        { question: "What is the human skeleton made up of?", options: ["Bones", "Muscles", "Cartilage", "Cells"], correctAnswer: "Bones" },
        { question: "What is the genetic material in most living organisms?", options: ["DNA", "RNA", "Protein", "Carbohydrates"], correctAnswer: "DNA" },
        { question: "What organ pumps blood throughout the body?", options: ["Heart", "Lungs", "Kidney", "Brain"], correctAnswer: "Heart" },
        { question: "What is the main function of the lungs?", options: ["Oxygen exchange", "Digestion", "Pumping blood", "Producing hormones"], correctAnswer: "Oxygen exchange" },
        { question: "What part of the brain controls balance?", options: ["Cerebellum", "Cerebrum", "Brainstem", "Hippocampus"], correctAnswer: "Cerebellum" },
        { question: "What is the largest bone in the human body?", options: ["Femur", "Tibia", "Humerus", "Radius"], correctAnswer: "Femur" },
        { question: "What is the term for animals that eat only plants?", options: ["Herbivores", "Carnivores", "Omnivores", "Detritivores"], correctAnswer: "Herbivores" }
    ],
    math: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
        { question: "What is the square root of 16?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
        { question: "What is the value of Pi rounded to two decimal places?", options: ["3.14", "3.15", "3.13", "3.12"], correctAnswer: "3.14" },
        { question: "What is 7 x 8?", options: ["54", "56", "58", "60"], correctAnswer: "56" },
        { question: "What is 50% of 200?", options: ["100", "50", "150", "200"], correctAnswer: "100" },
        { question: "What is the perimeter of a square with side length 5?", options: ["20", "25", "15", "30"], correctAnswer: "20" },
        { question: "What is 12 divided by 3?", options: ["4", "5", "6", "3"], correctAnswer: "4" },
        { question: "What is 9 squared?", options: ["81", "72", "90", "64"], correctAnswer: "81" },
        { question: "What is the sum of 45 and 55?", options: ["100", "110", "90", "95"], correctAnswer: "100" },
        { question: "What is the result of 100 - 25?", options: ["75", "70", "80", "65"], correctAnswer: "75" }
    ],
    history: [
        { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correctAnswer: "George Washington" },
        { question: "In what year did World War II end?", options: ["1942", "1945", "1950", "1939"], correctAnswer: "1945" },
        { question: "Who wrote the Declaration of Independence?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], correctAnswer: "Thomas Jefferson" },
        { question: "Which country gifted the Statue of Liberty to the United States?", options: ["France", "England", "Germany", "Spain"], correctAnswer: "France" },
        { question: "What year was the United Nations established?", options: ["1945", "1950", "1939", "1942"], correctAnswer: "1945" },
        { question: "Who discovered America?", options: ["Christopher Columbus", "Amerigo Vespucci", "Leif Erikson", "Marco Polo"], correctAnswer: "Christopher Columbus" },
        { question: "Who was the British Prime Minister during World War II?", options: ["Winston Churchill", "Neville Chamberlain", "Margaret Thatcher", "Tony Blair"], correctAnswer: "Winston Churchill" },
        { question: "What year did the Berlin Wall fall?", options: ["1989", "1990", "1988", "1991"], correctAnswer: "1989" },
        { question: "Who was the famous Civil Rights leader in the USA?", options: ["Martin Luther King Jr.", "Rosa Parks", "Malcolm X", "Frederick Douglass"], correctAnswer: "Martin Luther King Jr." },
        { question: "What empire was known as the 'Empire on which the sun never sets'?", options: ["British Empire", "Roman Empire", "Ottoman Empire", "Mongol Empire"], correctAnswer: "British Empire" }
    ]
};

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(category) {
    currentCategory = quizData[category];
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("category-container").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < currentCategory.length) {
        const questionData = currentCategory[currentQuestionIndex];

        document.getElementById("question").innerText = questionData.question;

        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        questionData.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(option, questionData.correctAnswer, button);
            optionsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

function checkAnswer(selected, correct, button) {
    if (selected === correct) {
        button.classList.add("correct");
        button.innerText += " (Correct)";
        score++;
    } else {
        button.classList.add("incorrect");
        button.innerText += " (Incorrect)";
    }

    Array.from(document.getElementById("options").children).forEach(btn => {
        btn.disabled = true;
        if (btn.innerText.startsWith(correct) && !btn.classList.contains("correct")) {
            btn.classList.add("correct");
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

function showResults() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("results").style.display = "block";

    document.getElementById("score").innerText = `You scored ${score} out of ${currentCategory.length}!`;
}

function resetQuiz() {
    document.getElementById("results").style.display = "none";
    document.getElementById("category-container").style.display = "block";
}
