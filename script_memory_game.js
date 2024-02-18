const cards = document.querySelectorAll(".card");
const timeTag = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refreshBtn = document.querySelector(".details button");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

let maxTime = 30;
let flips = 0;
let isPlaying = false;
let timer;

function initTimer() {
    if (timeLeft <= 0) {
        alert("Time left\n Try again");
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {//if two cards img matched
        matchedCard++;
        if (matchedCard == 6 && timeLeft > 0) {
            saveScore();
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //seting both card value to blank
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //seting both card value to blank
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;
    let arr = ["MemoryCardGameImages/dog.png",
        "MemoryCardGameImages/cat.png",
        "MemoryCardGameImages/rooster.png",
        "MemoryCardGameImages/horse.png",
        "MemoryCardGameImages/cow.png",
        "MemoryCardGameImages/sheep.png",
        "MemoryCardGameImages/dog.png",
        "MemoryCardGameImages/cat.png",
        "MemoryCardGameImages/rooster.png",
        "MemoryCardGameImages/horse.png",
        "MemoryCardGameImages/cow.png",
        "MemoryCardGameImages/sheep.png",]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = arr[index];
        }, 500);

        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => { //adding click event to all cards
    card.addEventListener("click", flipCard);
});

function saveScore() {
    let record = 20 - timeLeft;
    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username].score > record || users[username].matchedCard < matchedCard) {

        alert("Your last record is " + users[username].matchedCard + " cards, with in " + users[username].score + " seconds\n"
         + "Your new record is " + matchedCard + " cards, with in " + record + " seconds");
        users[username].score = record;
        users[username].matchedCard = matchedCard;
        localStorage.setItem('users', JSON.stringify(users));
    }
    alert("Your record staies " + record + " seconds");
}