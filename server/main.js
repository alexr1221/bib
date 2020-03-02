const maitre = require('./maitre_scrapper');
const bibgourmand = require('./bibgourmand_scrapper');
const database = require('./databaseRestaurants');


async function menu() {
    try {
        const restaurants_maitre = await maitre.getRestaurantList();
        database.saveToJson("maitre_restaurants.json", restaurants_maitre);
        const restaurants_bib = await bibgourmand.getRestaurantList();
        database.saveToJson("bib_restaurants.json", restaurants_bib);
        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

console.log("starting main menu...");
menu()