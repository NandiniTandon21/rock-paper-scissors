const readline = require('readline');

function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
}

function getHumanChoice() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let humanCount = 0;
    let computerCount = 0;
    let roundsLeft = 5;

    const playRound = () => {
        if (roundsLeft === 0) {
            console.log('Game Over!');
            console.log(`Final Scores:\nYou: ${humanCount}\nComputer: ${computerCount}`);
            rl.close();
            return;
        }

        rl.question('Enter 1 for Rock, 2 for Paper, and 3 for Scissors. Press any other key to exit the game: ', (choice) => {
            if (choice !== '1' && choice !== '2' && choice !== '3') {
                console.log('Exiting game');
                rl.close();
                return;
            }

            console.log(`You entered: ${choice === '1' ? 'Rock' : choice === '2' ? 'Paper' : 'Scissors'}`);

            const computerChoice = getComputerChoice();
            console.log(`Computer chose: ${computerChoice === 1 ? 'Rock' : computerChoice === 2 ? 'Paper' : 'Scissors'}`);

            // Determine the result of the round
            if (computerChoice === 1 && choice === '1' || computerChoice === 2 && choice === '2' || computerChoice === 3 && choice === '3') {
                console.log('Tie');
            } else if (
                (computerChoice === 1 && choice === '2') || 
                (computerChoice === 2 && choice === '3') || 
                (computerChoice === 3 && choice === '1')
            ) {
                console.log('You win!');
                humanCount++;
            } else {
                console.log('Computer wins!');
                computerCount++;
            }

            console.log(`Scores:\nYou: ${humanCount}\nComputer: ${computerCount}`);
            roundsLeft--;

            // Recursively play the next round
            playRound();
        });
    };

    // Start the first round
    playRound();
}

// Start the game
getHumanChoice();
