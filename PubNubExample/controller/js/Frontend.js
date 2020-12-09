// Set sensor id button listeners:

function createSIDButtonListener(buttonID, sensorID) {
    let btn = document.getElementById(buttonID)
    btn.innerHTML = sensorID;
    btn.addEventListener("click", function() {
      activeSensor = findSensorByID(sensorID);
      console.log("ActiveSensor:", activeSensor);
      document.getElementById("activesensorid").innerHTML = sensorID + " (" + activeSensor.valueUnits + "):";});
}