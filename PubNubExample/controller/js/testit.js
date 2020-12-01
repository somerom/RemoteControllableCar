car = new CarState(directions.STOPPED, 50, powerModes.ON);

console.log(car);
console.log("The car's current direction:");
console.log(car.direction);

// Sensor testing:

tempSensor = new Sensor("TempSensorId", "Celsius", 0, 45, 9);
tempSensor.addSensorReading(new SensorReading("TimeStamp#1", 23));
tempSensor.addSensorReading(new SensorReading("TimeStamp#2", 24));
tempSensor.addSensorReading(new SensorReading("TimeStamp#3", 22.5));
tempSensor.addSensorReading(new SensorReading("TimeStamp#4", 23));

console.log("Amount of sensor readings: " + tempSensor.sensorReadings.length + " of " + tempSensor.sensorReadings.maxSize);
console.log("All of the Temp Sensor's readings:");
tempSensor.sensorReadings.forEach(reading => console.log(reading));

tempSensor.addSensorReading(new SensorReading("TimeStamp#5", 23));
tempSensor.addSensorReading(new SensorReading("TimeStamp#6", 24));
tempSensor.addSensorReading(new SensorReading("TimeStamp#7", 22.5));
tempSensor.addSensorReading(new SensorReading("TimeStamp#8", 23));

console.log("Amount of sensor readings: " + tempSensor.sensorReadings.length + " of " + tempSensor.sensorReadings.maxSize);
console.log("All of the Temp Sensor's readings:");
tempSensor.sensorReadings.forEach(reading => console.log(reading));

tempSensor.addSensorReading(new SensorReading("TimeStamp#9", 23));

console.log("Amount of sensor readings: " + tempSensor.sensorReadings.length + " of " + tempSensor.sensorReadings.maxSize);
console.log("All of the Temp Sensor's readings:");
tempSensor.sensorReadings.forEach(reading => console.log(reading));

tempSensor.addSensorReading(new SensorReading("TimeStamp#10", 23));

console.log("Amount of sensor readings: " + tempSensor.sensorReadings.length + " of " + tempSensor.sensorReadings.maxSize);
console.log("All of the Temp Sensor's readings:");
tempSensor.sensorReadings.forEach(reading => console.log(reading));

tempSensor.addSensorReading(new SensorReading("TimeStamp#11", 23));
tempSensor.addSensorReading(new SensorReading("TimeStamp#12", 24));
tempSensor.addSensorReading(new SensorReading("TimeStamp#13", 22.5));
tempSensor.addSensorReading(new SensorReading("TimeStamp#14", 23));

console.log("Amount of sensor readings: " + tempSensor.sensorReadings.length + " of " + tempSensor.sensorReadings.maxSize);
console.log("All of the Temp Sensor's readings:");
tempSensor.sensorReadings.forEach(reading => console.log(reading));

tempSensor.addSensorReading(new SensorReading("TimeStamp#15", 23));
tempSensor.addSensorReading(new SensorReading("TimeStamp#16", 24));
tempSensor.addSensorReading(new SensorReading("TimeStamp#17", 22.5));
tempSensor.addSensorReading(new SensorReading("TimeStamp#18", 23));
tempSensor.addSensorReading(new SensorReading("TimeStamp#19", 24));
tempSensor.addSensorReading(new SensorReading("TimeStamp#20", 22.5));
tempSensor.addSensorReading(new SensorReading("TimeStamp#21", 23));

console.log("Amount of sensor readings: " + tempSensor.sensorReadings.length + " of " + tempSensor.sensorReadings.maxSize);
console.log("All of the Temp Sensor's readings:");
tempSensor.sensorReadings.forEach(reading => console.log(reading));