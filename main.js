const readline = require('readline');

/**
 * Function to generate a random choice for the computer.
 * 
 * The computer's choice is randomly selected between 1 (Rock), 2 (Paper), or 3 (Scissors).
 * It generates a random number between 1 and 3 using `Math.random()`, then maps it to the 
 * corresponding game choice.
 * 
 * @returns {number} - A random number representing the computer's choice (1 for Rock, 2 for Paper, 3 for Scissors).
 */
function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
}

/**
 * Main game loop function that controls the flow of the game.
 * 
 * This function starts the game by initializing variables for tracking scores (humanCount and computerCount),
 * the number of rounds left to play, and setting up the readline interface. The game will loop through rounds
 * until the user exits or the rounds are completed. Asynchronous input is handled using `rl.question()` where 
 * the user is prompted for their choice (1 for Rock, 2 for Paper, or 3 for Scissors).
 * 
 * The function works recursively by calling itself after each round, ensuring that the game continues until 
 * the conditions are met. It handles the asynchronous nature of `rl.question()` and ensures the game state
 * is updated and the game ends once rounds are completed or the user exits.
 */
function getHumanChoice() {
    const rl = readline.createInterface({
        input: process.stdin,  // Input stream from the user
        output: process.stdout, // Output stream to display prompts and messages
    });

    let humanCount = 0;  // Score for the human player
    let computerCount = 0;  // Score for the computer
    let roundsLeft = 5;  // Total rounds to play

    /**
     * This function handles each round of the game.
     * It is called recursively to continue playing until the user exits or rounds are over.
     * 
     * - The function first checks if the game is over (i.e., `roundsLeft === 0`).
     * - If not, it prompts the user to make a choice using `rl.question()`.
     * - It compares the player's choice with the computer's choice to determine the result.
     * - The score is updated after each round, and the results are displayed.
     * - The game continues by decrementing the number of rounds left and calling itself to play the next round.
     */
    const playRound = () => {
        if (roundsLeft === 0) {
            // End the game when no rounds are left
            console.log('Game Over!');
            console.log(`Final Scores:\nYou: ${humanCount}\nComputer: ${computerCount}`);
            rl.close();  // Close the readline interface
            return;  // Exit the function, ending the game
        }

        // Prompt the user for input
        rl.question('Enter 1 for Rock, 2 for Paper, and 3 for Scissors. Press any other key to exit the game: ', (choice) => {
            // If the user enters an invalid option, exit the game
            if (choice !== '1' && choice !== '2' && choice !== '3') {
                console.log('Exiting game');
                rl.close();  // Close the readline interface
                return;  // Exit the function, ending the game
            }

            // Display what the user chose
            console.log(`You entered: ${choice === '1' ? 'Rock' : choice === '2' ? 'Paper' : 'Scissors'}`);

            // Get the computer's random choice
            const computerChoice = getComputerChoice();
            console.log(`Computer chose: ${computerChoice === 1 ? 'Rock' : computerChoice === 2 ? 'Paper' : 'Scissors'}`);

            // Determine the winner and update scores
            if (computerChoice === 1 && choice === '1' || 
                computerChoice === 2 && choice === '2' || 
                computerChoice === 3 && choice === '3') {
                console.log('Tie');
            } else if (
                (computerChoice === 1 && choice === '2') || 
                (computerChoice === 2 && choice === '3') || 
                (computerChoice === 3 && choice === '1')
            ) {
                console.log('You win!');
                humanCount++;  // Increment human's score
            } else {
                console.log('Computer wins!');
                computerCount++;  // Increment computer's score
            }

            // Display current scores
            console.log(`Scores:\nYou: ${humanCount}\nComputer: ${computerCount}`);

            roundsLeft--;  // Decrement the number of rounds left

            // Recursively call playRound to continue the game
            playRound();
        });
    };

    // Start the first round
    playRound();
}

// Start the game
getHumanChoice();
