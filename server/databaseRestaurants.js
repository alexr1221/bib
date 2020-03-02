
const fs = require('fs');

module.exports.saveToJson = (file_name, data) => {
    try {
        var str_file = JSON.stringify(data);
        fs.writeFileSync(file_name, str_file);
        console.log("saved!");
    } catch (e) {
                console.error(e);
            process.exit(1);
        }
}

module.exports.loadJson = (file_name) => {
    try {
        return fs.readFileSync(file_name);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

//function download(text, name, type) {
//    var a = document.getElementById("a");
//    var file = new Blob([text], { type: type });
//    a.href = URL.createObjectURL(file);
//    a.download = name;
//}

//<a href="" id="a">click here to download your file</a>
//    <button onclick="download('file text', 'myfilename.txt', 'text/plain')">Create file</button>
// https://stackoverflow.com/questions/13405129/javascript-create-and-save-file