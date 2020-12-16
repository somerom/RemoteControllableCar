
var mqtt;
var host = 'broker.hivemq.com';
var port = 8000;
var clientID = "clientId-8wAkwjtVrk";
var t = "";
var m = "";





function OnConnect() {
    console.log("Connected");
    var msg2 = new Paho.MQTT.Message(m);
    msg2.qos = 0;
    msg2.destinationName = t;
    msg2.retained = false;
    mqtt.send(msg2);
}

function MqttConnectSendMessage(topic, msg) {
    mqtt = new Paho.MQTT.Client(host, port, clientID);
    console.log("connecting to " + host + " " + port);
    t = topic;
    m = msg;
    mqtt.connect({ onSuccess: OnConnect, mqttVersion: 3 });
    //mqtt.subscribe("SPEED/");

}
function OnConnect2() {
    mqtt.subscribe(t);
}
function Subscribe(topic) {
    mqtt = new Paho.MQTT.Client(host, port, clientID);
    console.log("connecting to " + host + " " + port);
    t = topic;
    mqtt.connect({ onSuccess: OnConnect2, mqttVersion: 3 });
}
