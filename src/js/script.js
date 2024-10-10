import { Card } from "./card.js";
import { cards } from "./constants.js";

const BodyElement = document.querySelector("body");
const ContainerElement = document.createElement("div");
const DrawCardButtonElement = document.createElement("button");
const ResetButtonElement = document.createElement("button");
const EndGameMessage = document.createElement("h2");
const WelcomeMessage = document.createElement("h1");

let deck = [];

/* Initializes the card interface by creating buttons and appending them to the body.
   It also updates the cards array and shuffles the deck. */
function createCardInterface() {
    WelcomeMessage.innerText = "Welcome to Exploding Cards!";
    BodyElement.append(WelcomeMessage); // Moved this line to ensure it's added first

    DrawCardButtonElement.innerText = "Draw a Card";
    DrawCardButtonElement.addEventListener("click", drawCard);
    DrawCardButtonElement.classList.add("button");

    ResetButtonElement.innerText = "Reset Game";
    ResetButtonElement.addEventListener("click", resetGame);
    ResetButtonElement.classList.add("button");
    ResetButtonElement.classList.add("hidden"); 

    ContainerElement.classList.add("cardContainer");

    //Add elements to the body
    BodyElement.append(ContainerElement);
    BodyElement.append(DrawCardButtonElement);
    BodyElement.append(EndGameMessage);
    BodyElement.append(ResetButtonElement); 

    updateCardsArray();
    shuffleDeck();
}

/* This function populates the deck with card instances based on the predefined card types and their counts.
 * It generates a random value for 'Points' type cards within a specified range.  */
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

/* This function shuffles the given array using the Fisher-Yates shuffle algorithm 
 * to randomize the order of cards in the deck. */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = getRandomNumber(0, i);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

/* This function checks in the console to ensure that the shuffle function is working properly 
 * by logging the deck before and after shuffling.   */
function shuffleDeck() {
    const deckBeforeShuffle = [...deck];
    console.log("Deck before shuffle:", deckBeforeShuffle);
    shuffle(deck);
    console.log("Deck after shuffle:", deck);
}

/* This function handles the logic for drawing a card from the deck. 
 * If cards are available, it displays the drawn card, otherwise, it triggers the end of the game.  */
function drawCard() {
    if (deck.length > 0) {
        // Hide the welcome message on the first card draw
        WelcomeMessage.classList.add("hidden");
        const drawnCard = deck.pop();
        displayCard(drawnCard);
        console.log(deck);
    } else {
        endGame();
    }
}

/* This function displays the drawn card by creating its HTML representation 
 * and appending it to the card container.   */
function displayCard(card) {
    ContainerElement.innerHTML = ''; // Clear previous cards
    const cardElement = createCardElement(card);
    ContainerElement.appendChild(cardElement);
}

/* This function creates and returns the HTML element for a given card. 
 * It includes both the card image and text elements.    */
function createCardElement(card) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const cardImage = document.createElement("div");
    cardImage.classList.add("card-image");

    const img = document.createElement("img");
    img.src = card.type === "Bomb" ? "./src/img/1bomb.jpg" :
        card.type === "Defuse" ? "./src/img/1defuse.jpg" :
            card.type === "Skip turn" ? "./src/img/1nextTurn.jpg" :
                card.type === "Nope" ? "./src/img/1nope.jpg" :
                    card.type === "Points" ? "./src/img/1point.jpg" : "";
    cardImage.appendChild(img);

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const title = document.createElement("h2");
    title.innerText = card.type;
    cardText.appendChild(title);

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("value-container");

    const value = document.createElement("span");
    value.innerText = card.value ? card.value : "";
    valueDiv.appendChild(value);

    const points = document.createElement("span");
    points.innerText = card.type === "Points" ? "points" : "";
    valueDiv.appendChild(points);

    cardText.appendChild(valueDiv);
    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardText);

    return cardDiv;
}

/* This function handles the end of the game by hiding the draw button and card container, 
 * displaying an end game message, and revealing the reset button.  */
function endGame() {
    DrawCardButtonElement.classList.add("hidden");
    ContainerElement.classList.add("hidden");
    EndGameMessage.innerText = "No more cards! Click reset to play again.";
    EndGameMessage.classList.remove("hidden"); 
    ResetButtonElement.classList.remove("hidden"); 
}

/* This function resets the game by clearing the deck, hiding messages, 
 * clearing the card container and preparing the interface for a new game  */
function resetGame() {
    //Reset the deck
    deck = []; //Clear the deck
    EndGameMessage.innerText = ""; 
    EndGameMessage.classList.add("hidden");
    ContainerElement.innerHTML = ""; 
    DrawCardButtonElement.classList.remove("hidden"); 
    ResetButtonElement.classList.add("hidden"); 
    WelcomeMessage.classList.remove("hidden"); // Show the welcome message again
    //Restart the game
    updateCardsArray(); //Rebuild the deck
    shuffleDeck(); 
    ContainerElement.classList.remove("hidden"); //Ensure container is visible
}

// This function generates a random number between the specified min and max values, inclusive
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
}

//Initialize the card interface
createCardInterface();
