const mongoose = require("mongoose");
const Entry = require('./models/entry');
const getDate = require("./public/js/getDate");


mongoose.connect('mongodb://127.0.0.1:27017/entryDB', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open");
    })
    .catch(err => {
        console.log(`Oh no, mongo connection error: ${err}`);
    })


const entries = [
    {
        planetName: "385B",
        text: "Today I was walking through the jungle and I found a new plant. It was a carnivorous monster.",
        date: getDate.getFutureDate(new Date())

    },
    {
        planetName: "385B",
        text: " Today I found a ruin while I was exploring a grassy field",
        date: getDate.getFutureDate(new Date())
    },
    {
        planetName: "599D",
        text: "Today I found a new animal while I was exploring the glacier",
        date: getDate.getFutureDate(new Date())
    },
    {
        planetName: "599D",
        text: "Today I found a crystal while I was exploring a gentle river",
        date: getDate.getFutureDate(new Date())

    }

]


Entry.insertMany(entries)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })