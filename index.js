const express = require('express');
const app = express();
const path = require("path");
const planet = require("./public/js/getPlanet2");
const getDate = require("./public/js/getDate");
const mongoose = require('mongoose');
const Entry = require('./models/entry');
const methodOverride = require("method-override");

mongoose.connect('mongodb://127.0.0.1:27017/entryDB', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open");
    })
    .catch(err => {
        console.log(`Oh no, mongo connection error: ${err}`);
    })



app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", (path.join(__dirname, "/views")));

let planetFeatures = [];

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/:game", async (req, res) => {
    const { game } = req.params;
    const entries = await Entry.find({});
    console.log(entries);
    res.render(`${game}/home`, { entries })
})

app.get("/:game/entries", async (req, res) => {
    const { game } = req.params;
    const entries = await Entry.find({})
    res.render(`${game}/index`, { entries })
})

app.get("/:game/entries/new", async (req, res) => {
    const { game } = req.params;
    planetFeatures = planet.getPlanet();
    const entries = await Entry.find({})
    res.render(`${game}/form`, { entries, planetFeatures });
})

app.get("/:game/entries/showID/:id", async (req, res) => {
    const { game, id } = req.params;
    const entry = await Entry.findById(id);
    res.render(`${game}/showEntry`, { planet, entry });
})

app.get("/:game/entries/editID/:id", async (req, res) => {
    const { game, id } = req.params;
    const entry = await Entry.findById(id);
    res.render(`${game}/editEntry`, { planet, id, entry });
})
/*
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

*/
app.get("/:game/entries/showPlanet/:planetID", async (req, res) => {
    const { game, planetID } = req.params;
    let newPlanet = await Entry.find({ planetName: planetID });
    res.render(`${game}/showPlanet`, { planetID, newPlanet })
})


app.post("/:game/entries/new", async (req, res) => {
    const { game } = req.params
    const date = new Date();
    const entry = new Entry({
        planetName: req.body.planetName,
        text: req.body.shipsLog,
        date: getDate.getFutureDate(date)
    })
    entry.save()
        .then(entry => {
            console.log(entry);
        })
        .catch(err => {
            console.log(err);
        })
    planetFeatures.pop();
    const entries = await Entry.find({});
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
