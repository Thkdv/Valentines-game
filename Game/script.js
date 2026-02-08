const stages = [
    { answer: "will", imgs: ["images/LastWill.webp", "images/Will-Smith.webp", "images/willpower.jpg", "images/Will1.avif"] },
    { answer: "you", imgs: ["images/you1.webp", "images/you2.webp", "images/you3.jpg", "images/you4.webp"] },
    { answer: "bee", imgs: ["images/bee1.jpg", "images/bee2.webp", "images/bee3.jpg", "images/bee4.jpg"] },
    { answer: "may", imgs: ["images/my1.webp", "images/my2.jpg", "images/my3.jpg", "images/my4.webp"] },
    { answer: "valentines", imgs: ["images/valentines1.webp", "images/valentines2.webp", "images/valentines3.webp", "images/valentines4.jpeg"] }
];

let currentStage = 0;
let solvedWords = [];
let yesScale = 1;

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadStage();
}

function loadStage() {
    const stage = stages[currentStage];
    const container = document.getElementById('box-container');
    container.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        document.getElementById(`img${i+1}`).src = stage.imgs[i];
    }

    for (let i = 0; i < stage.answer.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.classList.add('letter-input');
        input.autocomplete = "off";

        input.addEventListener('input', function() {
            if (this.value.length === 1 && input.nextElementSibling) {
                input.nextElementSibling.focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === "Backspace" && !this.value && input.previousElementSibling) {
                input.previousElementSibling.focus();
            }
        });

        container.appendChild(input);
    }
    
    document.getElementById('feedback').innerText = "";
}

function checkAnswer() {
    const boxes = document.querySelectorAll('.letter-input');
    let userInput = "";
    boxes.forEach(box => userInput += box.value);
    userInput = userInput.toLowerCase().trim();
    
    if (userInput === stages[currentStage].answer) {
        solvedWords.push(stages[currentStage].answer);
        currentStage++;
        if (currentStage < stages.length) {
            loadStage();
        } else {
            showFinal();
        }
    } else {
        document.getElementById('feedback').innerText = "WRONG! TRY AGAIN";
        boxes.forEach(box => box.value = "");
        if(boxes[0]) boxes[0].focus();
    }
}

function showFinal() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    const sentence = solvedWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    document.getElementById('combined-result').innerText = sentence + "?";
}

function sayNo() {
    const interior = document.querySelector('.interior');
    interior.classList.add('shake');
    setTimeout(() => interior.classList.remove('shake'), 200);
    yesScale += 0.4;
    document.getElementById('yes-btn').style.transform = `scale(${yesScale})`;
}

function sayYes() {
    document.getElementById('choice-area').classList.add('hidden');
    document.getElementById('combined-result').innerText = 
        "YAY! SEE YOU SOON!\n------˖⁺. ༶ ❤︎ ⋆˙⊹ 𐦍 ˖⁺. ༶ ❤︎ ⋆˙⊹------";
    document.getElementById('final-icon').innerText = "(づ ᴗ _ᴗ)づ ♡";
    document.body.style.backgroundColor = "#ff85a2";
}