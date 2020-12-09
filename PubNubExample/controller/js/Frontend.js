// Set sensor id button listeners:

function createSIDButtonListener(buttonID, sensorID) {
    document.getElementById(buttonID).addEventListener("click", function() {
      activeSensor = findSensorByID(sensorID);
      document.getElementById("activesensorid").innerHTML = sensorID;});
}