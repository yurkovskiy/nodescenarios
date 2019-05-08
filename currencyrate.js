#!/usr/bin/node

const https = require('https');

const currency = process.argv[2]; // currency code like: EUR, USD, ...
const date = process.argv[3]; // date as YYYYMMDD

if (!currency || !date) {
    console.log('Wrong input parameters. USE as: currencyrate.js <CURRENCY_CODE> <YYYYMMDD>');
}
else {
    const URL_BASE = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=';

    let FULL_URI = `${URL_BASE}${currency}&date=${date}&json`;

    https.get(FULL_URI, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            let result = JSON.parse(data);
            if (result.length !== 0) {
                console.log(`Date: ${date.slice(-2)}/${date.slice(4, -2)}/${date.slice(0, -4)}`);
                console.log(`${result[0].txt}(${result[0].cc})`);
                console.log(`${result[0].rate} UAH`);
            }
            else {
                console.log('There is no any results for this date and currency. Please check input parameters');
            }
            
        });

    }).on('error', (err) => {
        console.log("Error " + err.message);
    });
}
