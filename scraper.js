var request = require('request');
var async = require('async');
var sqlite3 = require('sqlite3').verbose();

function requestFunction(){
    request('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20161215&json', function (error, response, html) {
        if (!error && response.statusCode == 200) {

            async.series([function (callback) {
                data = JSON.parse(html);
                callback();
            }], function (err) {
                statement.run(data[0].rate, data[0].txt);
            });
        }
    });
}

var db = new sqlite3.Database('data.sqlite');
db.exec("CREATE TABLE IF NOT EXISTS KFZ(rate INT, txt DATE PRIMARY KEY)");
var data;
var statement = db.prepare("INSERT OR IGNORE INTO KFZ VALUES (?, ?)");


