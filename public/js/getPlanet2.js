const MAX_CARDS = 6;

function defaultName() {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomNumber = Math.floor(Math.random() * 900) + 100;
    let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    return "Planet " + randomNumber + randomLetter;


}

function howDiscovered() {
    const discoveredText = ["After an arduous journey, you find", "Suddenly, you come upon", "As you are resting, you spot"];
    let randomDiscoveredIndex = Math.floor(Math.random() * discoveredText.length);
    return discoveredText[randomDiscoveredIndex];

}

function getLocation() {
    const locationText = ["In a field taller than you.",
        "Under the light of the moon",
        "By a gentle river",
        "In a steep canyon",
        "In a treetop",
        "On the snowy peak of a mountain",
        "Near a volcano",
        "On a glacier",
        "Deep Underground",
        "On a cliff face",
        "In the desert",
        "In deep water",
        "Floating in the air"];
    let randomLocationIndex = Math.floor(Math.random() * locationText.length);
    return locationText[randomLocationIndex];
}

function getFeature() {
    const featureText = [
        ["Living Beings", "People like or unlike you, fish, dinosaurs, wolves, birds, giant insects, etc."],
        ["Plants or other immobile forms of life", "Towering trees, carnivorous pitchers, giant ferns, glowing weeds, floating flowers, oozing mushrooms, etc."],
        ["Ruins", "Mysterious obelisks, vine-covered temples, abandoned dwellings for people bigger than you, a wrecked spaceship, etc"],
        ["Natural Phenomena", "Huge crystal formations, mirages, vividly colored lightning, strange clouds, rocks eroded in strange shapes, veins of precious metals, etc."]

    ];
    let randomFeatureText = Math.floor(Math.random() * featureText.length);
    return featureText[randomFeatureText];

}

function getImageSrc(location) {
    switch (location) {
        case "In a field taller than you.":
            imageSrc = "/images/field.jpg";
            break;
        case "Under the light of the moon":
            imageSrc = "/images/moonlight.jpg";
            break;
        case "By a gentle river":
            imageSrc = "/images/river.jpg";
            break;
        case "In a steep canyon":
            imageSrc = "/images/canyon.jpg";
            break;
        case "In a treetop":
            imageSrc = "/images/treetop.jpg";
            break;
        case "On the snowy peak of a mountain":
            imageSrc = "/images/snowy.jpg";
            break;
        case "Near a volcano":
            imageSrc = "/images/volcano.jpg";
            break;
        case "On a glacier":
            imageSrc = "/images/glacier.jpg";
            break;
        case "Deep Underground":
            imageSrc = "/images/underground.jpg";
            break;
        case "On a cliff face":
            imageSrc = "/images/cliff.jpg";
            break;
        case "In the desert":
            imageSrc = "/images/desert.jpg";
            break;
        case "In deep water":
            imageSrc = "/images/underwater.jpg";
            break;
        case "Floating in the air":
            imageSrc = "/images/sky.jpg";

    }
    return imageSrc;
}

function getPlanet() {
    const planet = [];
    const planetName = defaultName();
    let planetCardNumber = 1 + Math.floor(Math.random() * MAX_CARDS);
    for (let i = 0; i < planetCardNumber; i++) {
        let discovery = {};
        discovery.planetName = defaultName();
        discovery.discovered = howDiscovered();
        discovery.location = getLocation();
        discovery.locationImage = getImageSrc(discovery.location);
        discovery.feature = getFeature();
        planet.push(discovery);

    }
    return planet;


}

module.exports.getPlanet = getPlanet;