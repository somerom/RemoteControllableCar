// Set sensor id button listeners:

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