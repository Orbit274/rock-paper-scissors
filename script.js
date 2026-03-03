function getComputerChoice() {
    num = Math.floor(Math.random() * 3)
    if (num === 0) {
        return "rock";
    }
    else if (num === 1) {
        return "paper";
    }
    else {
        return "scissors";
    }
}

function getHumanChoice() {
    return prompt('Rock, paper, or scissors? ');
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase()
    if (humanChoice === computerChoice) {
        console.log(`Tie! Human: ${humanScore} Computer: ${computerScore}`)
    }
    else if (
        (humanChoice === "rock" && computerChoice == "paper")
        || (humanChoice === "paper" && computerChoice == "scissors")
        || (humanChoice == "scissors" && computerChoice == "rock")
    ) {
        computerScore++
        console.log(`You Lose! ${computerChoice} beats ${humanChoice}! Human: ${humanScore} Computer: ${computerScore}`)
    }
    else {
        humanScore++
        console.log(`You Win! ${humanChoice} beats ${computerChoice}! Human: ${humanScore} Computer: ${computerScore}`)
    }
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        playRound(getHumanChoice(), getComputerChoice())
    }
    if (humanScore > computerScore) {
        console.log(`You Win! Human: ${humanScore} Computer: ${computerScore}`)
    }
    else if (humanScore < computerScore) {
        console.log(`You Lose! Human: ${humanScore} Computer: ${computerScore}`)
    }
    else {
        console.log(`Tie! Human: ${humanScore} Computer: ${computerScore}`)
    }
}

playGame()