const data = {
    foodPlaces: [
        "gute",
        "rotisserie",
        "wok a way"
    ],
    lastPlaceGenerated: null,
    lastRoll: null,
    lastRandInterval: null
}

const assets = {
    audio: {
        labelRoll: new Audio('./audio/roll.wav')
    }
}

const dom = {
    generateBtn: document.querySelector('.generate-btn'),
    foodPlaceLabel: document.querySelector('.foodplace-label'),
    lights: document.querySelectorAll('.light')
}

function initApp() {
    console.log('initApp');
}

function generateFoodPlace() {
    let result = getFoodPlace();

    // Prevent result repetition
    while (result === data.lastPlaceGenerated) {
        result = getFoodPlace();
    }

    data.lastPlaceGenerated = result;
    updateDOM(dom.foodPlaceLabel, result);
}

function updateDOM(el, content) {
    el.textContent = content;
}

function playAudio(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

function randominzeDOMLabel() {
    clearTimeout(data.lastRoll);
    clearInterval(data.lastRandInterval);
    playAudio(assets.audio.labelRoll);
    updateDOM(dom.foodPlaceLabel, 'bon appétit');
    const roll = setTimeout(() => {
        const randInterval = setInterval(() => {
            generateFoodPlace();
        }, 100);
        setTimeout(() => clearInterval(randInterval), 2400);
        data.lastRandInterval = randInterval;
    }, 650);
    data.lastRoll = roll;
}

function getFoodPlace() {
    const min = Math.ceil(0);
    const max = Math.floor(data.foodPlaces.length - 1);
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return data.foodPlaces[result];
}

dom.generateBtn.addEventListener('click', randominzeDOMLabel);
window.addEventListener('load', initApp);