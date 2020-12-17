var mqttSensor;
var host = 'broker.hivemq.com';
var port = 8000;
var clientID = "clientId-ttbht3y1LT";
var sensorTopics = "ADD_ON/+";
var carTopics = "CAR/+";
var m = "";

function mqttSensorConnect() {
    mqttSensor = new Paho.MQTT.Client(host, port, clientID);
    console.log("connecting to " + host + " " + port);
    mqttSensor.onConnectionLost = onSensorConnectionLost;
    mqttSensor.onMessageArrived = onSensorMessageArrived;
    mqttSensor.connect({ onSuccess: onSensorConnect });
}

function onSensorConnect() {
    console.log("Sensor Connected");-
    mqttSensor.subscribe(sensorTopics);
}

function onSensorConnectionLost(responseObject) {
    console.log("Sensor Connection Lost");
    mqttSensor.connect({ onSuccess: onSensorConnect });
}

function onSensorMessageArrived(msg) {
    findSensorById(msg.destinationName).addSensorReading(msg.payloadString);
}


class CarCtrlMqttWrapper {
    constructor() {
        this.mqttConnect();
    }

    sendMessage(topic, msg) {;
        console.log(topic + ": " + msg);
        let message = new Paho.MQTT.Message(topic);
        message.destinationName = topic;
        console.log(message);
        this.mqttCarCtrl.send(message);
    }

    onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("CarCtrl Connected");
    }

    onConnectionLost() {
        console.log("CarCtrl Connection Lost. Retrying Again...");
        this.mqttCarCtrl.connect({ onSuccess: this.onConnect });
    }

    mqttConnect() {
        this.mqttCarCtrl = new Paho.MQTT.Client(host, port, clientID);
        this.mqttCarCtrl.onConnectionLost = this.onConnectionLost;
        console.log("connecting to " + host + " " + port);
        this.mqttCarCtrl.connect({ onSuccess: this.onConnect });
    }
}
