// a data structure for individual sensor readings:
class SensorReading {
    constructor(time, date, data) {
        this.time = time;
        this.date = date
        this.data = data;
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
        if (!Number.isInteger(maxSize) || maxSize < 1)
            throw new TypeError("maxSize should be an integer > 1", "SensorBackend.js", 38);

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
        this.sensorMemorySize = sensorMemorySize;
    }

    // addSensorReading: {"time" : [time], "date": [date], "data" : [data]} -> void
    //
    // Parses the given json-formatted sensorReading object and
    // adds it into the sensorReadings array
    // .
    addSensorReading(jsonSensorData) {
        console.log(jsonSensorData);
        this.sensorReadings.add(JSON.parse(jsonSensorData));
        if (this === activeSensor) {
            updateActiveSensorReadings();
        }
    }
}

var allSensors = []
var activeSensor = null;

// findSensorByID: sensor-ID -> Sensor
// searches for and returns the sensor with sid from the
// list of sensors.
// If a sensor with the sensor ID does not exist,
// undefined is returned.
function findSensorByID(sid) {
    return allSensors.find(function(elem) { return elem.id === sid; });
};