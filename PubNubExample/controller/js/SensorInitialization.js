function createSensorMockData(sensor) {
    let i = sensor.sensorMemorySize;

    for (; i > 0; i--) {
        sensor.addSensorReading(new SensorReading(Date(0), sensor.minValue + Math.random()*(sensor.maxValue-sensor.minValue)));
    }
}

function addSensor(sensorData) {
    allSensors.push(new Sensor(sensorData.id, sensorData.valueUnits, sensorData.minValue, sensorData.maxValue, 15));
}

function loadJSONData() {
    let jsonFile = [
    {"id": "ADD_ON/DHTTEMP", "valueUnits": "C", "minValue": -40, "maxValue": 80},
    {"id": "ADD_ON/DHTHUM", "valueUnits": "%", "minValue": 0, "maxValue": 100 },
    {"id": "ADD_ON/TEMP", "valueUnits": "C", "minValue": -40, "maxValue": 125 },
    {"id": "ADD_ON/ACC", "valueUnits": "m/s^2", "minValue": 0,"maxValue": 100}];
    let jsonData = JSON.stringify(jsonFile);
    let fr = new FileReader();
    let f  = new Blob([jsonData], {type:"application/json"});

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    fr = new FileReader();
    fr.onload = receivedText;

    function receivedText(e) {
        console.log(e.target.result);
        JSON.parse(e.target.result).forEach(addSensor);
        // create mock data for testing:
        allSensors.forEach(createSensorMockData);
    }

    fr.readAsText(f);
}

loadJSONData("sensors.json");