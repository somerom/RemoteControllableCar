#include <Wire.h> //include Wire.h library
#include "PubSubClient.h" // Connect and publish to the MQTT broker
#include "ESP8266WiFi.h"  // Enables the ESP8266 to connect to the local network (via WiFi)

// WiFi
char ssid[] = "RC_LOCAL";                 // Your personal network SSID
char wifi_password[] = "sensors123"; // Your personal network password

//Address of the sensor
byte address; // variable for I2C address

// MQTT
const char* mqtt_server = "192.168.10.145";  // IP of the MQTT broker
const char* mqtt_username = "hello"; // MQTT username
const char* mqtt_password = "hello"; // MQTT password
const char* clientID = "Sensor1"; // MQTT client ID

// Initialise the WiFi and MQTT Client objects
WiFiClient wifiClient;
PubSubClient client(mqtt_server, 1883, wifiClient); // 1883 is the listener port for the Broker

void setup()
{
  Wire.begin(); // Wire communication begin
  Serial.begin(115200); // The baudrate of Serial monitor is set in 115200
  while (!Serial); // Waiting for Serial Monitor
  Serial.println("\nI2C Scanner");
}

void loop()
{
  connect_MQTT();
  Serial.setTimeout(2000);
  
  float sensorVal;
  String callibratedVal;
  int nDevices = DeviceScanner();
  if (nDevices == 0){
    Serial.println("No I2C devices found\n");
    delay(5000); // wait 5 seconds for the next I2C scan
  }else{
    if(address == 72){
      callibrateTC74(); 
    }
    else if(address == 30){
      callibrateHMC5883(); 
    }
    else{
      Serial.println("This sensor is not callibrated to the system...");
    }
  }
}

float DeviceScanner(){
  byte error; //variable for error
  int nDevices = 0;

  Serial.println("Scanning...");
  for (byte i = 1; i < 120; i++)
  { Wire.beginTransmission (i);
    if (Wire.endTransmission () == 0)
    {
      Serial.print ("Found address: ");
      Serial.println (i);
      address = i;
      nDevices = 1;
      delay (1);
    } 
  } 
 return nDevices;
}

void callibrateHMC5883(){
  const char* sensor_topic = "ADD_ON/ACC";
  //code copied from sparkfuns tutorial pages https://www.sparkfun.com/tutorials/301
  // Put the HMC5883 IC into the correct operating mode
  Wire.beginTransmission(address); //open communication with HMC5883
  Wire.write(0x02); //select mode register
  Wire.write(0x00); //continuous measurement mode
  Wire.endTransmission();

  int x,y,z; //triple axis data

  //Tell the HMC5883L where to begin reading data
  Wire.beginTransmission(address);
  Wire.write(0x03); //select register 3, X MSB register
  Wire.endTransmission();
  
 //Read data from each axis, 2 registers per axis
  Wire.requestFrom(address, 6);
  if(6<=Wire.read()){
    x = Wire.read()<<8; //X msb
    x |= Wire.read(); //X lsb
    z = Wire.read()<<8; //Z msb
    z |= Wire.read(); //Z lsb
    y = Wire.read()<<8; //Y msb
    y |= Wire.read(); //Y lsb
  }
  String callibratedVal = "x:" + x ;
  callibratedVal+= " y:" + y ;
  callibratedVal+= " z:" + z; 
  //Print out values of each axis
  Serial.print("x: ");
  Serial.print(x);
  Serial.print("  y: ");
  Serial.print(y);
  Serial.print("  z: ");
  Serial.println(z);
  Serial.println("after calibration:" + callibratedVal);
  PublishToMQTT(callibratedVal,sensor_topic);
}

void callibrateTC74(){
  float sensorVal;
  const char* sensor_topic = "ADD_ON/TEMP";
  Wire.beginTransmission(address); //Send a request to begin communication with the device at the specified address
  Wire.write(0); //Sends a bit asking for register 0, the data register of a sensor
  Wire.endTransmission(); //this ends transmission of data from the arduino to the temperature sensor
  Wire.requestFrom(address, 1);//this requests 1 byte from the specified address
  if (Wire.available()) {
    sensorVal= Wire.read();
    Serial.print("Sensor value:");
    Serial.println(sensorVal);
  }
  String callibratedVal;
  float temp;
    if (sensorVal > 127) 
    {
       sensorVal = 255 - sensorVal + 1;
       callibratedVal ='-';
    }
  callibratedVal += String(sensorVal);
  Serial.println("after calibration:" + callibratedVal);
  PublishToMQTT(callibratedVal,sensor_topic);
}

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

void PublishToMQTT(String callibratedData,const char* sensor_topic){
  
  // PUBLISH to the MQTT Broker (topic = Temperature, defined at the beginning)
  if (client.publish(sensor_topic, callibratedData.c_str())) {
    Serial.println("Sensor data sent!");
  }else 
  { // If the message failed to send, we will try again, as the connection may have broken.
    Serial.println("Temperature failed to send. Reconnecting to MQTT Broker and trying again");
    client.connect(clientID, mqtt_username, mqtt_password);
    delay(10); // This delay ensures that client.publish doesn't clash with the client.connect call
    if (!client.publish(sensor_topic, callibratedData.c_str()))
    {
      Serial.println("failed to send!");
    }
  }
  client.disconnect();  // disconnect from the MQTT broker
  delay(200);       // print new values every 20 ms
}
