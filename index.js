// NOTATION SWITCHER

const buttonNotes = document.querySelector('.btn-notes');
const buttonLetters = document.querySelector('.btn-letters');
const buttonContainer = document.querySelector('.btn-container');
const keys = document.querySelectorAll('.piano-key')

function notationSwitcher(event) {
    let button = event.target.closest('button');
    if (!button || event.target.classList.contains('btn-active')) return;
    buttonNotes.classList.toggle('btn-active');
    buttonLetters.classList.toggle('btn-active');
    keys.forEach(key => {
        key.classList.toggle('notes'); 
        key.classList.toggle('letters');
    });
};

buttonContainer.addEventListener('click', notationSwitcher);

// FULLSCREEN SWITCHER

    const fullscreenButton = document.querySelector('.fullscreen');

    function fullscreenSwitcher(event) {
        if (document.fullscreen) {
            document.exitFullscreen();
            return;
        };
        document.documentElement.requestFullscreen();
    };

    fullscreenButton.addEventListener('click', fullscreenSwitcher);

// // PIANO
// AUDIO
const sounds = {
    'a': new Audio('./assets/audio/a.mp3'),
    'a♯': new Audio('./assets/audio/a♯.mp3'),
    'b': new Audio('./assets/audio/b.mp3'),
    'c': new Audio('./assets/audio/c.mp3'),
    'c♯': new Audio('./assets/audio/c♯.mp3'),
    'd': new Audio('./assets/audio/d.mp3'),
    'd♯': new Audio('./assets/audio/d♯.mp3'),
    'e': new Audio('./assets/audio/e.mp3'),
    'f': new Audio('./assets/audio/f.mp3'),
    'f♯': new Audio('./assets/audio/f♯.mp3'),
    'g': new Audio('./assets/audio/g.mp3'),
    'g♯': new Audio('./assets/audio/g♯.mp3'),

    play(audio) {
        audio.currentTime = 0;
        audio.play();
    },
};

// MOUSE EVENTS

const piano = document.querySelector('.piano');
let isMouseDown = false;

function mouseDown() {
    isMouseDown = true;
};

function mouseUp() {
    isMouseDown = false;
};

window.addEventListener('pointerup', mouseUp);

function keyMouseDown(event) {
    mouseDown();
    let key = event.target.closest('.piano-key');
    key.classList.add('piano-key-active');  
    sounds.play(sounds[`${event.target.dataset.note}`])
};

piano.addEventListener('pointerdown', keyMouseDown);

function keyMouseUp(event) {
    mouseUp();
    let key = event.target.closest('.piano-key');
    key.classList.remove('piano-key-active');   
};

piano.addEventListener('pointerup', keyMouseUp);

function keyMouseOver(event) {
    if (!event.target) return;
    let keyOver = event.target.closest('.piano-key');
    if (isMouseDown) {
        keyOver.classList.toggle('piano-key-active');
        sounds.play(sounds[`${event.target.dataset.note}`])
    };
};

piano.addEventListener('pointerover', keyMouseOver);

function keyMouseOut(event) {
    if (!event.target) return;
    let keyOut = event.target.closest('.piano-key');
    if (isMouseDown) {
        keyOut.classList.toggle('piano-key-active');
    };
};

piano.addEventListener('pointerout', keyMouseOut);

// KEYBOARD EVENTS

function keyDown(event) {
    if (event.code.length > 5) return;
    if (event.repeat === true) return;
    const keyLetter = `${event.code[3]}`;
        // const 'keys' were declared in NOTATION SWITCHER
    let key;
    for (let div of keys) {
        if (div.dataset.letter === keyLetter) {
            key = div;
            break;
        };
    };
    if (key) {
        key.classList.add('piano-key-active');  
        sounds.play(sounds[`${key.dataset.note}`]);
    };
};

document.addEventListener('keydown', keyDown);

function keyUp(event) {
    if (event.code.length > 5) return;
    const keyLetter = `${event.code[3]}`;
    let key;
    for (let div of keys) {
        if (div.dataset.letter === keyLetter) {
            key = div;
            break;
        };
    };
    if (key) {
        key.classList.remove('piano-key-active');  
    };
};

document.addEventListener('keyup', keyUp);