
var mqtt;
var reconnectTimeout = 2000;
var host = "users.metropolia.fi/~maijaso/IoTProject/controller/index.html";
var port = 8080;

function OnConnect() {
    console.log("Connected");
    message = new Paho.MQTT.Message(giveMsg);
    message.destinationName = giveTopic;
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
