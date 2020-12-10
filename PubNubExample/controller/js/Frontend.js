// sensor id button listeners can be created with
// createSIDButtonListener:
function createSIDButtonListener(buttonID, sensorID) {
    let btn = document.getElementById(buttonID)
    btn.innerHTML = sensorID;
    btn.addEventListener("click", function() {
        activeSensor = findSensorByID(sensorID);
        console.log("ActiveSensor:", activeSensor);
        document.getElementById("activesensorid").innerHTML = sensorID + " (" + activeSensor.valueUnits + "):";
        updateActiveSensorReadings();
    });
};

function updateActiveSensorReadings() {
    htmlElem = document.getElementById("activesensorreadings");

    // first, remove old elements of the activesensorreadings section:
    while (htmlElem.lastElementChild) { 
        htmlElem.removeChild(htmlElem.lastElementChild);  
    }

    activeSensor.sensorReadings.forEach(function(reading) {
            innerElem = document.createElement("p");   
            innerElem.appendChild(document.createTextNode("[" + reading.timestamp + "]: " + reading.value));
            htmlElem.appendChild(innerElem);
        });

};

// Functions for recording car data from the user:

function carPowerButtonListener() {
    carState.updateCarPower();
    console.log(carState.powerMode);
}

function createCarDirectionButton(buttonID, carDirection) {
    document.getElementById(buttonID).addEventListener("click", function() {
        let newSpeed = document.getElementById("carspeedctrl").value;
        carState.updateCarDirection(carDirection, newSpeed);
        console.log(carState.direction, carState.speed);
    });
}