
var mqtt;
var reconnectTimeout = 2000;
var host = "127.0.0.1";
var port = 8001;

function OnConnect(topic, message) {
    console.log("Connected");
    message = new Paho.MQTT.Message(message);
    message.destinationName = topic;
    mqtt.send(message)
}

function MqttConnect() {
    console.log("connecting to" + host + " " + port);
    mgtt = new Paho.MQTT.Client(host, port, "clientjs");
    var options = {
        timeout = 3,
        onSuccess = OnConnect(),

    };
    mqtt.connect(options);
}