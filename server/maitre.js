// JavaScript source code

/* eslint-disable no-console, no-process-exit */
const scrapper = require('./maitre_scrapper');

console.log("start");

async function main(searchLink = 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult') {
    try {
        console.log(`browsing ${searchLink} source`);

        const restaurant = await scrapper.scrapeProfiles(searchLink);

        for (var i = 0; i < restaurant.length; i++) {
            console.log(restaurant[i]);
        }
        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

const [, , searchLink] = process.argv;

main(searchLink);

// annuaire/ajax/loadresult










//var str = "";

//var bias = 2;
//var word = "card__menu";
//var wordlength = word.length;
//for (var i = 0; i < str.length; i++) {
//    for (var j = 0; j < wordlength; j++) {
//        if (str.charAt(i + j) !== word[j]) {
//            break;
//        }
//        // complete
//        console.log(i);
//    }
//}
//var position = str.search("card__menu");