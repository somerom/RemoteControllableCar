const powerModes = {
    ON : 1,
    STANDBY : 2
}

const directions = {
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4,
    STOPPED : 5
}

class CarState {
    constructor(direction, speed, powerMode) {
	this.direction = direction;
	this.speed = speed;
	this.powerMode = powerMode;
    }
};

class SensorReading {
    constructor(timestamp, value) {
        this.timestamp = timestamp;
        this.value = value;
    }
}

// SensorReadingArray is a stack array of fixed size,
// where new sensor readings can be pushed into,
// but never pulled out from.
//
// NOTE: the implementation is still in a beta phase.
//       the exact way this DS will be used is still
//       unknown. Therefore, the implementation, as well
//       as the interface may change in future.
//
// Newer sensor readings will replace old sensor readings
// when the stack runs out of empty spaces.
//
// The interface:
//
// The constructor is given the maximum size of the desired
// array.
//
// the addReading adds a new sensor reading into the
// array, at the next free space - if any - or overwriting
// the oldest sensor reading value if no free spaces are
// left in the array.
//
// the forEach can be called with a function f. It
// calls f on all the recorded sensor readings starting
// from the newest sensor reading and going backwards
// towards the oldest sensor reading

class SensorReadingArray {
    constructor(maxSize) {
        this.arr = [];
        this.maxSize = maxSize;
        this.length = 0;
        this.i = 0;
    }

    add(element) {
        if (this.length < this.maxSize) {
            this.length++;
            this.arr.push(element);
            this.i++;
            if (this.i === this.maxSize)
                this.i = 0;
        }
        else {
            this.arr[this.i] = element;
            this.i++;
            if (this.i === this.maxSize)
                this.i = 0;
        }

    }

    length() {
        return this.length;
    }

    forEach(f) {
        if (this.length === 0) {
            return;
        }

        let curr = this.i-1;
	
	    for (let j=0; j<this.length; j++) {
            if (curr < 0) {
                curr = this.maxSize-1;
            }
            f(this.arr[curr]);
            curr--;
        }
        
    }
}

class Sensor {
    constructor(id, valueUnits, minValue, maxValue, sensorMemorySize) {
        this.id = id;
        this.sensorReadings = new SensorReadingArray(sensorMemorySize);
        this.valueUnits = valueUnits;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    addSensorReading(reading) {
        this.sensorReadings.add(reading);
    }
}

var allSensors = []

function addSensor(sensorData) {
    allSensors.push(new Sensor(sensorData.id, sensorData.valueUnits, sensorData.minValue, sensorData.maxValue, 20));
}

loadJSONData("sensors.json");

function loadJSONData() {
    let jsonFile = [
    {"id": "ADD_ON/DHTTEMP", "valueUnits": "C", "minValue": -40, "maxValue": 80},
    {"id": "ADD_ON/DHTHUM", "valueUnits": "%", "minValue": 0, "maxValue": 100 },
    {"id": "ADD_ON/TEMP", "valueUnits": "C", "minValue": -40, "maxValue": 125 },
    {"id": "ADD_ON/ACC", "valueUnits": "m/s^2", "minValue": 0,"maxValue": "undefined"}];
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
        
    }

    fr.readAsText(f);
}

function findSensorByID(sid) {
    return allSensors.find(function(elem) { return elem.id === sid; });
};

var activeSensor = null;

class MessageWrapper {

    sendMessage(msg) {
        console.log(msg);  // TODO: fix the dummy implementation 
    }
}