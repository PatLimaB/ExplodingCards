import { Card } from "./card.js";
import { cards } from "./constants.js";

const BodyElement = document.querySelector("body");
const ContainerElement = document.createElement("div");
const DrawCardButtonElement = document.createElement("button");
const CardElement = document.createElement("div");
const ResetButtonElement = document.createElement("button");
const EndGameMessage = document.createElement("h2");

let deck = [];

function createCardInterface() {
    DrawCardButtonElement.innerText = "Draw a Card";
    DrawCardButtonElement.addEventListener("click", drawCard);
    
    CardElement.classList.add("card");
    ContainerElement.classList.add("cardContainer");

    ContainerElement.append(DrawCardButtonElement);
    ContainerElement.append(CardElement);
    BodyElement.append(ContainerElement);

    //Initialize the deck and shuffle it
    updateCardsArray();
    shuffleDeck();
}

function updateCardsArray() {
    if (deck.length === 0) {
        cards.forEach(cardType => {
            for (let i = 0; i < cardType.count; i++) {
                if (cardType.type === 'Points') {
                    const randomValue = getRandomNumber(cardType.valueRange[0], cardType.valueRange[1]);
                    deck.push(new Card(cardType.type, randomValue));
                } else {
                    deck.push(new Card(cardType.type));
                }
            }
        });
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; //Swap positions
    }
}

function drawCard() {
    if (deck.length > 0) {
        const drawnCard = deck.pop(); //Draw the top card from the deck
        displayCard(drawnCard); //Display the drawn card
        console.log(deck);
    } else {
        endGame(); //If no more cards, end the game
    }
}

function displayCard(card) {
    CardElement.innerText = `Type: ${card.type}${card.value ? ', Value: ' + card.value : ''}`;
}

function endGame() {
    //Hide the card and the "draw a card" button when the game ends
    DrawCardButtonElement.classList.add("hidden");
    CardElement.classList.add("hidden");

    //Display the end game message and the reset button
    EndGameMessage.innerText = "No more cards! Click restart to play again.";
    BodyElement.append(EndGameMessage);
    BodyElement.append(ResetButtonElement);
    ResetButtonElement.innerText = "Restart";
    ResetButtonElement.addEventListener("click", resetGame);
}

function resetGame() {
    //Reset the deck
    deck = [];

    //Remove the end game message and reset button
    EndGameMessage.remove();
    ResetButtonElement.remove();

    //Re-enable the "Draw a Card" button
    DrawCardButtonElement.disabled = false;

    //Show the card container again
    CardElement.classList.remove("hidden");
    DrawCardButtonElement.classList.remove("hidden");

    //Reinitialize the deck and shuffle it
    updateCardsArray();
    shuffleDeck();
}

//Get a random number within a range
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}

createCardInterface();