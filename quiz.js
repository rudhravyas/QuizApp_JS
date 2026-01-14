const quizStore = {
    science: null,
    maths: null,
    history: null,
    gk: null
};

document.addEventListener("DOMContentLoaded", () => {

    const gkBtn = document.getElementById("gkbtn");
    const scienceBtn = document.getElementById("sciencebtn");
    const mathsBtn = document.getElementById("mathsbtn");
    const historyBtn = document.getElementById("historybtn");
    
    gkBtn.addEventListener("click", () => {
        if (quizStore.gk) {
            showQuiz(quizStore.gk);
            console.log("GK Button Clicked before");
            return;
        }
        fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
            .then(res => res.json())
            .then(data => {
                quizStore.gk = data.results;
                showQuiz(quizStore.gk);
                console.log("GK Button Clicked");
            })
            .catch(err => console.log(err));
    });

    scienceBtn.addEventListener("click", () => {
        if (quizStore.science) {
            showQuiz(quizStore.science);
            return;
        }
        fetch("https://opentdb.com/api.php?amount=10&category=17&difficulty=easy")
            .then(res => res.json())
            .then(data => {
                quizStore.science = data.results;
                showQuiz(quizStore.science);
            })
            .catch(err => console.log(err));
    });

    mathsBtn.addEventListener("click", () => {
        if (quizStore.maths) {
            showQuiz(quizStore.maths);
            return;
        }
        fetch("https://opentdb.com/api.php?amount=10&category=19&difficulty=easy")
            .then(res => res.json())
            .then(data => {
                quizStore.maths = data.results;
                showQuiz(quizStore.maths);
            })
            .catch(err => console.log(err));
    });

    historyBtn.addEventListener("click", () => {
        if (quizStore.history) {
            showQuiz(quizStore.history);
            return;
        }
        fetch("https://opentdb.com/api.php?amount=10&category=23&difficulty=easy")
            .then(res => res.json())
            .then(data => {
                quizStore.history = data.results;
                showQuiz(quizStore.history);
            })
            .catch(err => console.log(err));
    });
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
});


let currentIndex = 0;
let currentQuestions = [];
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showResults() {

    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("welcomeScreen").classList.remove("hidden");

    const resultBox = document.getElementById("resultText");
    resultBox.innerHTML = `Your Score: ${score} / ${currentQuestions.length}`;

    currentQuestions = [];
    currentIndex = 0;
}



function handleAnswer(selectedOption) {

    const correctAnswer = currentQuestions[currentIndex].correct_answer;
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(btn => {

        btn.disabled = true;

        if (btn.textContent === selectedOption) {
            if (selectedOption === correctAnswer) {
                btn.style.backgroundColor = "green";
                score++;
            } else {
                btn.style.backgroundColor = "red";
            }
        }

        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "green";
        }
    });

    document.getElementById("nextBtn").classList.remove("hidden");
}


function nextQuestion() {

    currentIndex++;
    if (currentIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    renderQuestion();
}


function createOptionButton(text) {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = text;

    btn.addEventListener("click", () => handleAnswer(text));

    return btn;
}


function renderQuestion() {

    const q = currentQuestions[currentIndex];

    const questionText = document.getElementById("questionText");
    questionText.innerHTML = q.question;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    document.getElementById("nextBtn").classList.add("hidden");

    if (q.type === "boolean") {
        optionsContainer.appendChild(createOptionButton("True"));
        optionsContainer.appendChild(createOptionButton("False"));
    }
    else {
        const options = [...q.incorrect_answers, q.correct_answer];
        shuffle(options);
        options.forEach(opt => {
            optionsContainer.appendChild(createOptionButton(opt));
        });
    }
}


function showQuiz(ele){
    document.getElementById('welcomeScreen').classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");
    currentQuestions = ele;
    currentIndex = 0;
    score = 0;
    console.log(ele)
    renderQuestion();
}