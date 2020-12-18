var mqttSensor;
var host = 'broker.hivemq.com';
var port = 8000;
var clientID = "clientId-ttbht3y1LT";
var subscriberTopics = ["ADD_ON/+", "CAR/GYRO"];
var m = "";

    function sendMqttMessage(topic, msg) {
        let message = new Paho.MQTT.Message(msg);
        message.destinationName = topic;
        // console.log(message);
        mqtt.send(message);
    }

    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("MQTT Client Connected");
        subscriberTopics.forEach(mqtt.subscribe);
    }

    function onConnectionLost(error) {
        console.log("MQTT Client Connection Lost. Retrying Again...");
        console.log(error.errorMessage);
        mqtt.connect({ onSuccess: onConnect });
    }

    function onMessageArrived(msg) {
        let topic = msg.destinationName;
        if (topic === "CAR/GYRO") {
            carState.updateStatus(msg.payloadString);
        }
        else {
            sensor = findSensorByID(topic);
         
            if (sensor != "undefined")
                sensor.addSensorReading(msg.payloadString);
        }
    }

    function mqttConnect() {
        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        console.log("connecting to " + host + " " + port);
        mqtt.connect({ onSuccess: onConnect });
    }

mqtt = new Paho.MQTT.Client(host, port, clientID);

mqttConnect();