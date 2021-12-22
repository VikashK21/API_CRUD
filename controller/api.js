
const axios = require('axios');
const fs= require('fs');


// Requesting from the server for the data... And sending that data into a json file.

axios.get('http://api.navgurukul.org/courses').then((result) => {
    // console.log(result);
    // console.log(typeof result.data)
    let mainData = result.data
    mainData.forEach((obj, index) => {
        mainData[index].lang_available = `${obj.lang_available}`
    });
    fs.writeFileSync("api.json", JSON.stringify(mainData, null, 4))
}).catch((err) => {
    console.log(err);
});

//// Now reading that same file to play witmultipleStah it... and continue with crud operations...
// data=JSON.parse(fs.readFileSync('api.json', 'utf-8'));
// // console.log(data[0]);
// data.forEach(ele => {
//     knex('saral_api').insert(ele).then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log('error while inserting', err);
//     });
    
// });
// console.log(data);