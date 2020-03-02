const maitre = require('./maitre');
const bibgourmand = require('./bibgourmand');
const save = require('./saveRestaurants');


async function menu() {
    try {

        console.log('done');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

console.log("starting main menu...");
menu()