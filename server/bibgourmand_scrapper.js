const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse_old = data => {
    const $ = cheerio.load(data);
    var restaurants = [];
    var elementCount_t = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation.js-restaurant__list_items").children().length;
    console.log("element count:" + elementCount_t);
    for (var i = 1; i <= elementCount_t + 1; i++) {
        $('body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child(' + i + ') > div > div.card__menu-content.js-match-height-content > h5 > a').each(function (index, element) {
            var res_name = $(element).attr("aria-label");
            if (res_name.startsWith("Open")) {
                res_name = res_name.substr(5);
            }
            else {
                console.log("Didn't contain Open");
            }
            restaurants.push(res_name);
        });
    }

    const name = $('card__menu-content--title last').text();
    const experience = ""; //$('#experience-section > ul > li:nth-child(2)').text()

    return restaurants;
};

const parse = data => {
    const $ = cheerio.load(data);
    var restaurants = [];
    var elementCount_t = 0;
    $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation.js-restaurant__list_items").children().each(function (index, element) {
        var res_name = $("div > div.card__menu-content.js-match-height-content > h5", element).text();
        var res_city = $("div > div.card__menu-footer.d-flex > div.card__menu-footer--location.flex-fill.pl-text", element).text();
        res_name = res_name.substr(30); // remove spaces before the name
        res_city = res_city.substr(26);
        if (res_name.length != 0) { // check if name is not empty
            res_name = res_name.substr(0, res_name.length - 22);
            res_city = res_city.substr(0, res_city.length - 9);
            if (res_name.length == 0) { // some restaurants don't have a name
                res_name = '[no name]';
            }
            restaurants.push(res_name);
            console.log(res_name + "-" + res_city);
            elementCount_t++;
        }
    });
    console.log("element count:" + elementCount_t);

    return restaurants;
};


const parse_sub_page = data => {
    const $ = cheerio.load(data);
    var name = $("body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > h2").text();
    var address = $("body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)").text();
    //var elementCount_t = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation.js-restaurant__list_items").children().length;
    //console.log("element count:" + elementCount_t);
    //for (var i = 1; i <= elementCount_t + 1; i++) {
    //    $('body > main > section.section-main.search-results.search-listing-result > div > div > div.row.restaurant__list-row.js-toggle-result.js-geolocation > div:nth-child(' + i + ') > div > div.card__menu-content.js-match-height-content > h5 > a').each(function (index, element) {
    //        var res_name = $(element).attr("aria-label");
    //        if (res_name.startsWith("Open")) {
    //            res_name = res_name.substr(5);
    //        }
    //        else {
    //            console.log("Didn't contain Open");
    //        }
    //        restaurants.push(res_name);
    //    });
    //}
    console.log(name + " " + address);
    return restaurants;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.getRestaurantList = async () => {

    var url = "https://guide.michelin.com/fr/fr/restaurants";

    var page_index = 1;
    var all_restaurants = [];
    var wasLastPageAvailable = true;
    var wasLastPageEmpty = false;

    while (wasLastPageAvailable && !wasLastPageEmpty) {
        var modified_url = url;
        if (page_index > 1) {
            modified_url += "/page/" + page_index;
        }
        console.log(modified_url);
        const response = await axios(modified_url);
        const { data, status } = response;

        if (status >= 200 && status < 300) {
            var parsed_data = parse(data);
            parsed_data.forEach(element => all_restaurants.push(element));
            console.log("parsed_data length: " + parsed_data.length);
            wasLastPageEmpty = (parsed_data.length == 0);
            if (wasLastPageEmpty) {
                break;
            }
        }
        else {
            wasLastPageAvailable = false;
            console.error(status);
            break;
        }
        page_index++;
    }

    for (var i = 0; i < all_restaurants.length; i++) {
        console.log(all_restaurants[i]);
    }

    return all_restaurants;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
    return [];
};
