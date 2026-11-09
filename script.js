
const topics = [
    {
        name: "Nature",
        text: `Nature is beautiful and full of life.
The sun gives light and energy to Earth.
Rivers and mountains make our planet special.
We should protect nature every day.`
    },
    {
        name: "Technology",
        text: `Technology makes our daily life easier.
Computers help us complete many tasks.
Mobile phones connect people around the world.
New inventions make our future better.`
    },
    {
        name: "Education",
        text: `Education is the key to success.
Students learn new things every day.
Teachers guide us towards a bright future.
Knowledge gives us confidence and wisdom.`
    },
    {
        name: "Sports",
        text: `Sports keep our body healthy and active.
Cricket is a popular game in India.
Teamwork is important in every sport.
Practice helps players improve their skills.`
    },
    {
        name: "Environment",
        text: `Our environment is important for life.
We should keep our surroundings clean.
Reduce plastic waste and save water.
Every person can protect our planet.`
    },
    {
        name: "Artificial Intelligence",
        text: `Artificial intelligence is growing quickly.
AI helps people solve difficult problems.
Smart machines can learn from information.
Technology is changing the modern world.`
    },
    {
        name: "Science",
        text: `Science helps us understand the world.
Experiments help us discover new ideas.
Scientists work to solve many problems.
Science improves our quality of life.`
    },
    {
        name: "Books",
        text: `Books are our best friends.
Reading improves our knowledge and language.
Good books teach valuable lessons.
Make reading a daily habit.`
    },
    {
        name: "Health",
        text: `Health is wealth for every person.
Eat fresh fruits and healthy food.
Exercise regularly to stay fit.
Sleep well and drink enough water.`
    },
    {
        name: "Time Management",
        text: `Time is very valuable in our life.
Plan your daily activities carefully.
Complete important tasks on time.
Good habits make every day productive.`
    },
    {
        name: "Trees",
        text: `Trees give us oxygen and fresh air.
They provide food and shelter for animals.
Plant more trees to protect our Earth.
Save trees and save our future.`
    },
    {
        name: "Animals",
        text: `Animals are an important part of nature.
Some animals live in forests.
Birds fly high in the sky.
We should treat all animals kindly.`
    },
    {
        name: "India",
        text: `India is a beautiful country.
New Delhi is the capital of India.
India has many languages and cultures.
We are proud of our great nation.`
    },
    {
        name: "Internet",
        text: `The internet connects the whole world.
We can learn many things online.
It helps people communicate quickly.
Use the internet safely and wisely.`
    },
    {
        name: "Motivation",
        text: `Believe in yourself and your dreams.
Never give up when things become difficult.
Hard work brings success and confidence.
Every small step takes you forward.`
    },
    {
        name: "Computer",
        text: `A computer is an electronic machine.
It can store and process information.
People use computers in many fields.
Learning computer skills is very useful.`
    },
    {
        name: "Space",
        text: `Space is full of stars and planets.
The Earth moves around the Sun.
Astronauts explore space using spacecraft.
The universe is very large and mysterious.`
    },
    {
        name: "Travel",
        text: `Travel helps us explore new places.
We can learn about different cultures.
Beautiful destinations create happy memories.
Plan your journey and enjoy the experience.`
    },
    {
        name: "Food",
        text: `Food gives energy to our body.
Fresh vegetables are good for health.
A balanced diet keeps us strong.
Drink water and eat healthy meals.`
    },
    {
        name: "Success",
        text: `Success begins with a clear goal.
Hard work helps us achieve our dreams.
Learn from mistakes and keep improving.
Never stop trying to do your best.`
    }
];

// HTML elements
const topicSelect = document.getElementById("topicSelect");
const textDisplay = document.getElementById("textDisplay");
const typingInput = document.getElementById("typingInput");

const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const topicNumber = document.getElementById("topicNumber");
const result = document.getElementById("result");

// Test variables
let currentTopic = 0;
let timeLeft = 60;
let timer = null;
let started = false;
let finished = false;
let correctCharacters = 0;

// Add topics to dropdown
topics.forEach((topic, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = topic.name;
    topicSelect.appendChild(option);
});

// Display selected topic
function loadTopic() {
    const selectedTopic = topics[currentTopic];

    textDisplay.innerHTML = "";

    selectedTopic.text.split("").forEach(character => {
        const span = document.createElement("span");
        span.textContent = character;
        textDisplay.appendChild(span);
    });

    topicSelect.value = currentTopic;

    topicNumber.textContent =
        `Topic ${currentTopic + 1} of ${topics.length}`;

    prevBtn.disabled = currentTopic === 0;
    nextBtn.disabled = currentTopic === topics.length - 1;

    restartTest();
}

// Start test
function startTest() {
    if (started || finished) return;

    started = true;
    typingInput.disabled = false;
    typingInput.focus();

    startBtn.disabled = true;

    timer = setInterval(() => {
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        calculateResults();

        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

// Calculate typing speed and accuracy
function calculateResults() {
    const typedText = typingInput.value;
    const originalText = topics[currentTopic].text;

    const spans = textDisplay.querySelectorAll("span");

    let correct = 0;
    let mistakes = 0;

    spans.forEach((span, index) => {
        span.className = "";

        if (index < typedText.length) {
            if (typedText[index] === originalText[index]) {
                span.classList.add("correct");
                correct++;
            } else {
                span.classList.add("incorrect");
                mistakes++;
            }
        }
    });

    correctCharacters = correct;

    const elapsed = 60 - timeLeft;
    const minutes = elapsed / 60;

    const wpm = minutes > 0
        ? Math.round((correct / 5) / minutes)
        : 0;

    const accuracy = typedText.length > 0
        ? Math.round((correct / typedText.length) * 100)
        : 100;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + "%";
    mistakesDisplay.textContent = mistakes;

    if (typedText.length === originalText.length) {
        endTest();
    }
}

// Finish test
function endTest() {
    if (finished) return;

    clearInterval(timer);

    finished = true;
    typingInput.disabled = true;
    startBtn.disabled = false;

    result.textContent =
        `Test Completed! Speed: ${wpmDisplay.textContent} WPM | Accuracy: ${accuracyDisplay.textContent}`;
}

// Restart test
function restartTest() {
    clearInterval(timer);

    timeLeft = 60;
    started = false;
    finished = false;
    correctCharacters = 0;

    typingInput.value = "";
    typingInput.disabled = true;

    timerDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";
    mistakesDisplay.textContent = "0";

    startBtn.disabled = false;
    result.textContent = "";

    const spans = textDisplay.querySelectorAll("span");

    spans.forEach(span => {
        span.className = "";
    });
}

// Next topic
function nextTopic() {
    if (currentTopic < topics.length - 1) {
        currentTopic++;
        loadTopic();
    }
}

// Previous topic
function previousTopic() {
    if (currentTopic > 0) {
        currentTopic--;
        loadTopic();
    }
}

// Select topic from dropdown
topicSelect.addEventListener("change", function() {
    currentTopic = Number(this.value);
    loadTopic();
});

// Buttons
startBtn.addEventListener("click", startTest);
restartBtn.addEventListener("click", restartTest);
nextBtn.addEventListener("click", nextTopic);
prevBtn.addEventListener("click", previousTopic);

// Typing event
typingInput.addEventListener("input", calculateResults);

// Load first topic
loadTopic();

