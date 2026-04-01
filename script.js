// UI Elements
const UI = {
    readyButton: document.querySelector(".readyButton"),
    drawText: document.querySelector(".pop"),
    playerBullet: document.querySelector(".player .hidden"),
    aiBullet: document.querySelector(".ai .hidden"),
    tumbleweed: document.querySelector(".tumbleweed img"),
    roundText: document.querySelector(".roundText"),
    playerButtons: document.querySelectorAll(".playerChoices button"),
    aiButtons: document.querySelectorAll(".aiChoices button"),
    playerChoicesContainer: document.querySelector(".playerChoices"),
    drawSound: document.querySelector(".drawSound"),
    revolverSound: document.querySelector(".revolverSound"),
    playerHearts: Array.from(document.querySelectorAll(".heart")).slice(0, 5),
    aiHearts: Array.from(document.querySelectorAll(".heart")).slice(5)
};

// Game State
let gameState = {
    playerScore: 0,
    aiScore: 0,
    round: 0,
    playerChoice: null,
    isGameOver: false
};

// Win Logic
const WIN_MAP = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

// Random generation of "AI" choice
function getAiChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

// Resets state of game so it looks like a clean slate once the round starts
function resetRoundUI() {
    UI.playerBullet.classList.add("hidden");
    UI.aiBullet.classList.add("hidden");
    UI.playerButtons.forEach(btn => btn.classList.remove("glow"));
    UI.aiButtons.forEach(btn => {
        btn.classList.remove("glow");
        btn.textContent = "";
    });
    UI.tumbleweed.style.animation = "";
    UI.tumbleweed.offsetHeight;
    gameState.playerChoice = null;
}

// Clicking for all the player choice buttons, adds a glow to easily identify clicked button
UI.playerChoicesContainer.addEventListener("click", (event) => {
    let target = event.target;
    if (target.tagName !== "BUTTON" || target.classList.contains("disabled")) return;
    UI.playerButtons.forEach(b => b.classList.remove("glow"));
    target.classList.add("glow");
    if (target.classList.contains("rock")) {
        gameState.playerChoice = "rock";
    }
    else if (target.classList.contains("paper")) {
        gameState.playerChoice = "paper";
    }
    else if (target.classList.contains("scissors")) {
        gameState.playerChoice = "scissors";
}
});

// 
UI.readyButton.addEventListener("click", (event) => {
    resetRoundUI();
    if (gameState.round >= 1) {
        UI.drawText.classList.toggle("hidden");
    }
    let num = (Math.random() * 2) + 1;
    UI.tumbleweed.style.animation = `roll ${num}s linear forwards`;
});

UI.tumbleweed.addEventListener("animationend", () => {
    UI.drawText.classList.remove("hidden");
    UI.playerChoicesContainer.classList.remove("disabled");
    UI.playerButtons.forEach(btn => btn.classList.remove("disabled"));
    UI.drawSound.play()
    setTimeout(() => {
        playRound();
        UI.playerButtons.forEach(btn => btn.classList.add("disabled"));
        UI.playerChoicesContainer.classList.add("disabled");
        UI.revolverSound.play()
        }, 1000);
})

function playRound() {
    gameState.round++;
    let aiChoice = getAiChoice();
    let playerChoice = gameState.playerChoice;
    addGlow(aiChoice);
    if (playerChoice === aiChoice) {
        UI.roundText.textContent = `Round: ${gameState.round} | Player: ${playerChoice} | AI: ${aiChoice} | Tie!`;
    }
    else if (WIN_MAP[playerChoice] === aiChoice || playerChoice === null) {
        gameState.aiScore++;
        UI.roundText.textContent = `Round: ${gameState.round} | Player: ${playerChoice} | AI: ${aiChoice} | Player Loses!`;
        UI.playerBullet.classList.remove("hidden");
        updateHeart(gameState.aiScore, UI.playerHearts);
    }
    else {
        gameState.playerScore++;
        UI.roundText.textContent = `Round: ${gameState.round} | Player: ${playerChoice} | AI: ${aiChoice} | Player Wins!`;
        UI.aiBullet.classList.toggle("hidden", false);
        updateHeart(gameState.playerScore, UI.aiHearts);
    }
    checkWin();
}

function checkWin() {
    if (gameState.playerScore === 5) {
        UI.drawText.textContent = "YOU WIN!!!";
        UI.readyButton.classList.add("disabled");
    }
    if (gameState.aiScore === 5) {
        UI.drawText.textContent = "YOU LOSE!!!";
        UI.readyButton.classList.add("disabled")
    }
}

function addGlow(choice) {
    switch(choice) {
        case "rock":
            UI.aiButtons[0].textContent = "Rock";
            UI.aiButtons[0].classList.add("glow");
            break;
        case "paper":
            UI.aiButtons[1].textContent = "Paper";
            UI.aiButtons[1].classList.add("glow");
            break;
        case "scissors":
            UI.aiButtons[2].textContent = "Scissors";
            UI.aiButtons[2].classList.add("glow");
            break;
    }
}

function updateHeart(score, hearts) {
    let i = hearts.length - 1;
    for (let k = score; k > 0; k--) {
        hearts[i].classList.add("hidden");
        i--;
    }
}