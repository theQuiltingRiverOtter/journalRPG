const MAX_CARDS = 6;
let hasCards = false;


function defaultName() {
    let planetName = document.getElementById("planetName");
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let randomNumber = Math.floor(Math.random() * 900) + 100;
    let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    let planetDefaultName = "Planet " + randomNumber + randomLetter;

    planetName.placeholder = planetDefaultName;
    planetName.defaultValue = planetDefaultName;

}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}




function discoverNew(element) {
    const MAX_DISCOVERY_OPTIONS = 3;
    const discoveredFeatureText = ["After an arduous journey, you find", "Suddenly, you come upon", "As you are resting, you spot"];
    let container = document.getElementById("card-container");
    let howDiscoveredNumber = Math.floor(Math.random() * MAX_DISCOVERY_OPTIONS);
    let howDiscovered = discoveredFeatureText[howDiscoveredNumber];
    let totalCards = container.childElementCount;
    let newDeck = getDeck();
    if (totalCards >= 1) {
        let oldCard = document.querySelector(".nextCard");
        if (oldCard) {
            oldCard.parentElement.removeChild(oldCard);
        }
        let randomCard = Math.floor(Math.random() * newDeck.length);
        createCard(element, howDiscovered, newDeck[randomCard].suit, newDeck[randomCard].name);



        newDeck.splice(randomCard, 1);

    }

}

function getPlanet() {
    defaultName();
    let container = document.getElementById("card-container");
    removeAllChildNodes(container);
    let planetCardNumber = 1 + Math.floor(Math.random() * MAX_CARDS);
    hasCards = true;
    for (let i = 0; i < planetCardNumber; i++) {
        let wrapper = document.createElement("div");
        wrapper.classList.add("col");
        wrapper.classList.add("s3");
        let feature = document.createElement("div");
        feature.classList.add("new-card");
        feature.classList.add("before-flip");
        feature.classList.add("z-depth-5");
        wrapper.append(feature);
        container.append(wrapper);

    }
    let cards = document.querySelectorAll(".new-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => { discoverNew(cards[i]) });
    }

}





const cardSuits = {
    diamonds: ["Living Beings", "People like or unlike you, fish, dinosaurs, wolves, birds, giant insects, etc."],
    clubs: ["Plants or other immobile forms of life", "Towering trees, carnivorous pitchers, giant ferns, glowing weeds, floating flowers, oozing mushrooms, etc."],
    hearts: ["Ruins", "Mysterious obelisks, vine-covered temples, abandoned dwellings for people bigger than you, a wrecked spaceship, etc"],
    spades: ["Natural Phenomena", "Huge crystal formations, mirages, vividly colored lightning, strange clouds, rocks eroded in strange shapes, veins of precious metals, etc."]
}

const cardValues = {
    Ace: "In a field taller than you.",
    Two: "Under the light of the moon",
    Three: "By a gentle river",
    Four: "In a steep canyon",
    Five: "In a treetop",
    Six: "On the snowy peak of a mountain",
    Seven: "Near a volcano",
    Eight: "On a glacier",
    Nine: "Deep Underground",
    Ten: "On a cliff face",
    Jack: "In the desert",
    Queen: "In deep water",
    King: "Floating in the air"
}

function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}

function getDeck() {
    this.names = [cardValues.Ace, cardValues.Two, cardValues.Three, cardValues.Four, cardValues.Five, cardValues.Six, cardValues.Seven, cardValues.Eight, cardValues.Nine, cardValues.Ten, cardValues.Jack, cardValues.Queen, cardValues.King];
    this.suits = [cardSuits.diamonds, cardSuits.clubs, cardSuits.hearts, cardSuits.spades];
    let cards = [];

    for (var s = 0; s < suits.length; s++) {
        for (var n = 0; n < names.length; n++) {
            cards.push(new card(n + 1, this.names[n], this.suits[s]));
        }
    }

    return cards;

}


function createCard(element, howDiscovered, suit, name) {
    let nextCard = document.createElement("div");
    nextCard.classList.add("nextCard");
    nextCard.classList.add("card");
    nextCard.classList.add("small");
    let cardImgShell = document.createElement("div");
    cardImgShell.classList.add("card-image");
    let cardImg = document.createElement("img");
    switch (name) {
        case "In a field taller than you.":
            cardImg.src = "/images/field.jpg";
            break;
        case "Under the light of the moon":
            cardImg.src = "/images/moonlight.jpg";
            break;
        case "By a gentle river":
            cardImg.src = "/images/river.jpg";
            break;
        case "In a steep canyon":
            cardImg.src = "/images/canyon.jpg";
            break;
        case "In a treetop":
            cardImg.src = "/images/treetop.jpg";
            break;
        case "On the snowy peak of a mountain":
            cardImg.src = "/images/snowy.jpg";
            break;
        case "Near a volcano":
            cardImg.src = "/images/volcano.jpg";
            break;
        case "On a glacier":
            cardImg.src = "/images/glacier.jpg";
            break;
        case "Deep Underground":
            cardImg.src = "/images/underground.jpg";
            break;
        case "On a cliff face":
            cardImg.src = "/images/cliff.jpg";
            break;
        case "In the desert":
            cardImg.src = "/images/desert.jpg";
            break;
        case "In deep water":
            cardImg.src = "/images/underwater.jpg";
            break;
        case "Floating in the air":
            cardImg.src = "/images/sky.jpg";

    }
    let cardTitle = document.createElement("span");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = name;
    cardImgShell.append(cardImg);
    cardImgShell.append(cardTitle);
    let cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    let cardDiscovered = document.createElement("p");
    let cardSuit = document.createElement("span");
    cardSuit.classList.add("activator");
    cardSuit.classList.add("grey-text");
    cardSuit.classList.add("text-darken-4");
    let cardActivorIcon = document.createElement("i");
    cardActivorIcon.classList.add("material-icons");
    cardActivorIcon.classList.add("right");
    cardActivorIcon.innerHTML = 'more_vert';
    cardDiscovered.innerHTML = howDiscovered;
    cardSuit.innerHTML = suit[0];
    cardSuit.append(cardActivorIcon);
    cardContent.append(cardDiscovered);
    cardContent.append(cardSuit);
    let cardReveal = document.createElement("div");
    cardReveal.classList.add("card-reveal");
    let cardTitle2 = document.createElement("span");
    cardTitle2.classList.add("card-title");
    cardTitle2.classList.add("grey-text");
    cardTitle2.classList.add("text-darken-4");
    cardTitle2.innerHTML = suit[0];
    let cardSuitInfo = document.createElement("p");
    cardSuitInfo.innerHTML = suit[1];
    cardReveal.append(cardTitle2);
    cardReveal.append(cardSuitInfo);
    nextCard.append(cardImgShell);
    nextCard.append(cardContent);
    nextCard.append(cardReveal);
    element.parentElement.append(nextCard);
    element.parentElement.removeChild(element);


}