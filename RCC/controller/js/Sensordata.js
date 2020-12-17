var data1 = []
var db1 = openDatabase('IoT_sensor.db', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM DHTTEMP_Data', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            data1[i] = (results.rows.item(i).text);
        }
    });
});
var data2 = []
var db2 = openDatabase('IoT_sensor.db', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM DHTHUM_Data', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            data2[i] = (results.rows.item(i).text);
        }
    });
});
var data3 = []
var db3 = openDatabase('IoT_sensor.db', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM TEMP_Data', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            data3[i] = (results.rows.item(i).text);
        }
    });
});
var data4 = []
var db4 = openDatabase('IoT_sensor.db', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql(".mode html")
    tx.executeSql('SELECT * FROM ACC_Data', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            data4[i] = (results.rows.item(i).text);
        }
    });
});

function GiveData() {

    allert(data4)
}
