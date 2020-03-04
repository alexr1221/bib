const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('query-string');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
    const $ = cheerio.load(data);
    var restaurants = [];
    var elementCount_t = 0;
    $("body > div.col-md-9 > div.annuaire_result_list").children().each(function (index, element) {
        var res_name = $("div.single_libel > a", element).text();
        var res_infos = $("div.single_desc > div.single_details > div > div:nth-child(2) > div", element).text();

        if (res_name.length != 0) { // check if name is not empty
            var index_end_of_name = res_name.indexOf('(') - 1;
            res_name = res_name.substr(0, index_end_of_name);
            if (res_name.length == 0) { // some restaurants don't have a name
                res_name = '[no name]';
            }

            var res_city__zip_city = res_infos.split('\n')[4]; // select last line
            res_city__zip_city = res_city__zip_city.substr(14); // removes unnecessay spaces
            var res_city__zip_city_tab = res_city__zip_city.split(' '); // split zip and city with spaces
            var res_zip = res_city__zip_city_tab[0];
            res_city__zip_city_tab.splice(0, 1); // removes zip
            var res_city = res_city__zip_city_tab.join(' ');
            res_name = res_name.substr(13); // remove spaces before the name


            var res_final = {
                name: res_name,
                city: res_city,
                zip: res_zip
            };

            restaurants.push(res_final);
            console.log(res_name + "-" + res_city + "-" + res_zip);
            elementCount_t++;
        }
    });
    console.log("element count:" + elementCount_t);

    return restaurants;
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.getRestaurantList = async () => {

    var url = "https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult";

    var page_index = 1;
    var all_restaurants = [];
    var wasLastPageAvailable = true;
    var wasLastPageEmpty = false;

    while (wasLastPageAvailable && !wasLastPageEmpty) {
        if (page_index > 1) {
        }
        console.log(url + " - page: " + page_index);
        const payload = {
            'page': page_index.toString(),
            'request_id': 'd0005dff95c739e6c4f82222fb70a8f5',
        };
        const config = {
            method: 'post',
            url: url,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'gzip, deflate, br',
                'charset': 'ISO-8859-1',
                'Content-Encoding': 'gzip'
            },
            data: querystring.stringify(payload)
        }
        const response = await axios(config);
        const { data, status } = response;

        if (status >= 200 && status < 300) {
            console.log("success");
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
