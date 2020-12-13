import paho.mqtt.client as mqtt
import serial
import time

MQTT_ADDRESS = '192.168.2.1'
MQTT_USER = 'hello'
MQTT_PASSWORD = 'hello'
MQTT_TOPIC = '+/+'

ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)
ser.flush()

def on_connect(client, userdata, flags, rc):
 """ The callback for when the client receives a CONNACK response from the server."""
 print('Connected with result code ' + str(rc))
 client.subscribe(MQTT_TOPIC)


def on_message(client, userdata, msg):
 """The callback for when a PUBLISH message is received from the server."""
 print(msg.topic + ' ' + str(msg.payload.decode(utf-8)))
	
 if str(msg.topic) == "CAR/DIRECTION":
  if str(msg.payload.decode(utf-8)) == "UP":
   ser.write(b"forward\n")
  if str(msg.payload.decode(utf-8)) == "DOWN":
   ser.write(b"back\n")
  if str(msg.payload.decode(utf-8)) == "STOP":
   ser.write(b"stop\n")
  if str(msg.payload.decode(utf-8)) == "RIGHT":
   ser.write(b"right\n")
  if str(msg.payload.decode(utf-8)) == "LEFT":
   ser.write(b"left\n")
 elif str(msg.topic) == "CAR/POWER":
  if str(msg.payload.decode(utf-8)) == "OFF":
   ser.write(b"off\n")
  if str(msg.payload.decode(utf-8)) == "ON":
   ser.write(b"on\n")
 elif str(msg.topic) == "CAR/SPEED":
  ser.write(b"speed " + str(msg.payload.decode(utf-8)) + b"\n")

def main():	
 mqtt_client = mqtt.Client()
 mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
 mqtt_client.on_connect = on_connect
 mqtt_client.on_message = on_message

 mqtt_client.connect(MQTT_ADDRESS, 1883)
 mqtt_client.loop_forever()

if __name__ == '__main__':
 main()
