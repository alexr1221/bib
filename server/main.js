const maitre = require('./maitre_scrapper');
const bibgourmand = require('./bibgourmand_scrapper');
const database = require('./databaseRestaurants');
const join = require('./restaurantsJoin');
const spChar = require('./removeSpecialCharacters');

// admin panel
async function menu() {
    try {

        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

async function joinResults() {
    join.process();
}

async function updateDatabase() {
    const restaurants_maitre = await maitre.getRestaurantList();
    database.saveToJson("maitre_restaurants.json", restaurants_maitre);
    const restaurants_bib = await bibgourmand.getRestaurantList();
    database.saveToJson("bib_restaurants.json", restaurants_bib);
}

console.log("starting main menu...");
menu()