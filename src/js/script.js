import { Card } from "./card.js";
import { cards } from "./constants.js";

const BodyElement = document.querySelector("body");
const ContainerElement = document.createElement("div");
const DrawCardButtonElement = document.createElement("button");
const CardElement = document.createElement("div");
const ResetButtonElement = document.createElement("button");
const EndGameMessage = document.createElement("h2");

//Don't forget to erase this  
let testButton = document.createElement("button");

function createCardInterface(){

    //test Button
    BodyElement.append(testButton);

    DrawCardButtonElement.innerText = "Draw a Card";
    CardElement.classList.add("card");
    ContainerElement.classList.add("cardContainer")

//Don't forget to erase this and modify the next line
    testButton.innerText = "Show/Hide Card Container";
    testButton.addEventListener("click", showCardInterface);

    ContainerElement.append(DrawCardButtonElement);
    ContainerElement.append(CardElement);
    BodyElement.append(ContainerElement);
}

function showCardInterface(){
    if (ContainerElement.classList.contains("hidden")){
        ContainerElement.classList.remove("hidden");
    } else {
        ContainerElement.classList.add("hidden");
    }
}

//Get a random number
function getRandomNumber (min, max){
    return Math.round(Math.random() * (max - min + 1)) + min;
}

createCardInterface();