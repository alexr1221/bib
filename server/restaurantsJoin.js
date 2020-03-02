const database = require('./databaseRestaurants');

module.exports.process = () => {
    var joinResult = [];

    var restaurants_maitre = database.loadJson("maitre_restaurants.json");
    var restaurants_bib = database.loadJson("bib_restaurants.json");

    for (var i = 0; i < restaurants_maitre.length; i++) {
        for (var j = 0; j < restaurants_bib.length; j++) {
            if (restaurants_maitre[i].name.toLowerCase()
                == restaurants_bib[j].name.toLowerCase()) {
                var newRow = {
                    name: restaurants_bib[j].name,
                    city: restaurants_bib[j].city
                }
                joinResult.push(newRow);
            }
        }
    }
}