const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
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

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {

    var page_index = 1;
    var all_restaurants = [];
    var wasLastPageAvailable = true;
    var wasLastPageEmpty = false;

    while (wasLastPageAvailable || !wasLastPageEmpty) {
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
        }
        else {
            wasLastPageAvailable = false;
            console.error(status);
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
