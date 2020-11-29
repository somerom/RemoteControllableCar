
#include "DHTesp.h" //Functions for reading data from AM2302 sensor
#include "PubSubClient.h" // Connect and publish to the MQTT broker
#include "ESP8266WiFi.h"  // Enables the ESP8266 to connect to the local network (via WiFi)

//DHT
DHTesp dht;

// WiFi
char ssid[] = "RC_LOCAL";                 // Your personal network SSID
char wifi_password[] = "sensors123"; // Your personal network password

// MQTT
const char* mqtt_server = "192.168.10.150";  // IP of the MQTT broker
const char* humidity_topic = "sensor1/humidity";
const char* temperature_topic = "sensor1/temperature";
const char* mqtt_username = "hello"; // MQTT username
const char* mqtt_password = "hello"; // MQTT password
const char* clientID = "client_sensor1y"; // MQTT client ID

// Initialise the WiFi and MQTT Client objects
WiFiClient wifiClient;
PubSubClient client(mqtt_server, 1883, wifiClient); // 1883 is the listener port for the Broker

// function to connet to the MQTT broker via WiFi
void connect_MQTT(){
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, wifi_password); // Connect to the WiFi

  // Wait until the connection has been confirmed before continuing
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Debugging - Output the IP Address of the ESP8266
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Connect to MQTT Broker
  // checks if the connection was successful.
  // If the connection is failing, make sure you are using the correct MQTT Username and Password
  if (client.connect(clientID, mqtt_username, mqtt_password)) {
    Serial.println("Connected to MQTT Broker!");
  }
  else {
    Serial.println("Connection to MQTT Broker failed...");
  }
}


void setup() {
 Serial.begin(115200);
 Serial.println("Status\tHumidity (%)\tTemperature (C)");
 dht.setup(4, DHTesp::DHT22); // Connect DHT sensor to GPIO 5
}

void loop() {
  connect_MQTT();
  Serial.setTimeout(2000);
  
  float h = dht.getHumidity();
  float t = dht.getTemperature();
  
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.println(" %");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.println(" *C");

  // MQTT can only transmit strings
  String hs="Hum: "+String((float)h)+" % ";
  String ts="Temp: "+String((float)t)+" C ";

  // PUBLISH to the MQTT Broker (topic = Temperature, defined at the beginning)
  if (client.publish(temperature_topic, String(t).c_str())) {
    Serial.println("Temperature sent!");
  }else 
  { // If the message failed to send, we will try again, as the connection may have broken.
    Serial.println("Temperature failed to send. Reconnecting to MQTT Broker and trying again");
    client.connect(clientID, mqtt_username, mqtt_password);
    delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
    client.publish(temperature_topic, String(t).c_str());
  }

  // PUBLISH to the MQTT Broker (topic = Humidity, defined at the beginning)
  if (client.publish(humidity_topic, String(h).c_str())) {
     Serial.println("Humidity sent!");
  }else 
  {// If the message failed to send, we will try again, as the connection may have broken.
    Serial.println("Humidity failed to send. Reconnecting to MQTT Broker and trying again");
    client.connect(clientID, mqtt_username, mqtt_password);
    delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
    client.publish(humidity_topic, String(h).c_str());
  }
  client.disconnect();  // disconnect from the MQTT broker
  delay(1000);       // print new values every 1 Minute
}
