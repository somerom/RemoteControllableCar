// sensor id button listeners can be created with
// createSIDButtonListener:
function createSIDButtonListener(buttonID, sensorID) {
    let btn = document.getElementById(buttonID)
    btn.innerHTML = sensorID
    btn.addEventListener("click", function() {
        activeSensor=findSensorByID(sensorID)
        // console.log("ActiveSensor:", activeSensor.id)
        document.getElementById(
            "activesensorid").innerHTML=sensorID + " (" + activeSensor.valueUnits + "):"
        updateActiveSensorReadings()
    })
}

function updateActiveSensorReadings() {
    htmlElem = document.getElementById("activesensorreadings")

    // first, remove old elements of the activesensorreadings section:
    while (htmlElem.lastElementChild) {
        htmlElem.removeChild(htmlElem.lastElementChild)
    }

    activeSensor.sensorReadings.forEach(function(reading) {
        innerElem=document.createElement("p")
        innerElem.appendChild(document.createTextNode(
            "[" + reading.date + " " + reading.time + "]: "+ reading.data))
        htmlElem.appendChild(innerElem)
    })
}

// Functions for recording car data from the user:

function carPowerButtonListener() {
    carState.changeCarPower()
}

function createCarDirectionButton(buttonID, carDirection) {
    document.getElementById(buttonID).addEventListener("click", function() {
        carState.updateCarDirection(
            carDirection, document.getElementById("carspeedctrl").value)
    })
}

function updateVideoView(status) {
    let color = (status == statuses.OK? "#000000": "#FF0000")
    // console.log(color)
    document.getElementById("controller").style.borderColor = color
}
