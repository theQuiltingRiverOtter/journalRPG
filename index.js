const express = require('express');
const app = express();
const path = require("path");
const planet = require("./public/js/getPlanet2");
const getDate = require("./public/js/getDate");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", (path.join(__dirname, "/views")));

const staticDate = new Date();
const entries = {
    "Planet 385B": [
        {
            id: uuid(),
            captainName: "Megan",
            text: `Today I was walking through the jungle and I found a new plant. It was a carnivorous monster. `,
            date: getDate.getFutureDate(staticDate)
        },
        {
            id: uuid(),
            captainName: "Megan",
            text: " Today I found a ruin while I was exploring a grassy field",
            date: getDate.getFutureDate(staticDate)
        }
    ],
    "Planet 599D": [
        {
            id: uuid(),
            captainName: "Megan",
            text: "Today I found a new animal while I was exploring the glacier",
            date: getDate.getFutureDate(staticDate)
        },
        {
            id: uuid(),
            captainName: "Megan",
            text: "Today I found a crystal while I was exploring a gentle river",
            date: getDate.getFutureDate(staticDate)
        }
    ]
}
let planetFeatures = [];

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/:game", (req, res) => {
    const { game } = req.params;
    res.render(`${game}/home`, { entries })
})

app.get("/:game/entries", (req, res) => {
    const { game } = req.params;
    res.render(`${game}/index`, { entries })
})

app.get("/:game/entries/new", (req, res) => {
    const { game } = req.params;
    planetFeatures = planet.getPlanet();
    res.render(`${game}/form`, { entries, planetFeatures });
})

app.get("/:game/entries/showID/:id", (req, res) => {
    const { game, id } = req.params;
    let specificEntry;
    let planet;
    for (let entry in entries) {
        if (entries[entry].find(e => e.id == id)) {
            planet = entry;
            specificEntry = entries[entry].find(e => e.id == id);
            break;
        }
    }
    res.render(`${game}/showEntry`, { planet, specificEntry });
})

app.get("/:game/entries/editID/:id", (req, res) => {
    const { game, id } = req.params;
    let specificEntry;
    let planet;
    for (let entry in entries) {
        if (entries[entry].find(e => e.id == id)) {
            planet = entry;
            specificEntry = entries[entry].find(e => e.id == id);
            break;
        }
    }
    res.render(`${game}/editEntry`, { planet, id, specificEntry });
})

app.patch("/:game/entries/showId/:id", (req, res) => {
    const { game, id } = req.params;
    for (let entry in entries) {
        if (entries[entry].find(e => e.id == id)) {
            specificEntry = entries[entry].find(e => e.id == id);
            specificEntry.text = req.body.shipsLog;
            break;
        }
    }
    res.redirect(`/${game}/entries`);
})


app.get("/:game/entries/showPlanet/:planetID", (req, res) => {
    const { game, planetID } = req.params;
    let newPlanet = entries[planetID];
    res.render(`${game}/showPlanet`, { planetID, newPlanet })
})


app.post("/:game/entries/new", (req, res) => {
    const { game } = req.params
    const date = new Date();
    const entry = {
        id: uuid(),
        captainName: "Megan",
        text: req.body.shipsLog,
        date: getDate.getFutureDate(date)

    }
    if (entries[`${req.body.planetName}`]) {
        entries[`${req.body.planetName}`].push(entry);
    } else {
        entries[`${req.body.planetName}`] = [];
        entries[`${req.body.planetName}`].push(entry);
    }
    planetFeatures.pop();
    if (planetFeatures.length > 0) {
        res.render(`${game}/form`, { entries, planetFeatures })
    }
    else {
        res.render(`${game}/home`, { entries })
    }

})

app.listen(3000, () => {
    console.log("listening on 3000");
})
