import paho.mqtt.client as mqtt
import serial
import time

MQTT_ADDRESS = '192.168.2.1'
MQTT_USER = 'hello'
MQTT_PASSWORD = 'hello'
MQTT_TOPIC = '+/+'

#used to check for mqtt messages
x = 100

#used to measure speed
speed = 0

def on_connect(client, userdata, flags, rc):
    """ The callback for when the client receives a CONNACK response from the server."""
    print('Connected with result code ' + str(rc))
    client.subscribe(MQTT_TOPIC)


def on_message(client, userdata, msg):
    """The callback for when a PUBLISH message is received from the server."""
    print(msg.topic + ' ' + str(msg.payload.decode("utf-8")))
	
	if str(msg.topic) == "DIRECTION":
		if str(msg.payload.decode("utf-8")) == "UP":
			x=0
		if str(msg.payload.decode("utf-8")) == "DOWN":
			x=1
		if str(msg.payload.decode("utf-8")) == "STOP":
			x=2
		if str(msg.payload.decode("utf-8")) == "RIGHT":
			x=3
		if str(msg.payload.decode("utf-8")) == "LEFT":
			x=4
	elif str(msg.topic.decode("utf-8")) == "POWER":
		if str(msg.payload.decode("utf-8")) == "OFF":
			x=5
		if str(msg.payload.decode("utf-8")) == "ON":
			x=6
	elif str(msg.topic.decode("utf-8")) == "SPEED":
		x=7
		speed = int(msg.payload.decode("utf-8"))

def main():
    mqtt_client = mqtt.Client()
    mqtt_client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message

    mqtt_client.connect(MQTT_ADDRESS, 1883)
    mqtt_client.loop_forever()

if __name__ == '__main__':
	ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)
	ser.flush()
	while True:
    
		if x != 100:   
			if x == 0:
				ser.write(b"forward\n")
			elif x == 1:
				ser.write(b"back\n")    
			elif x == 2:
				ser.write(b"stop\n") 
			elif x == 3:
				ser.write(b"right\n")
			elif x == 4:
				ser.write(b"left\n")
			elif x == 5:
				ser.write(b"off\n")
			elif x == 6:
				ser.write(b"on\n")
			elif x == 7:
				ser.write(b"speed " + speed + "\n")		
			else:
				ser.write(b"ERROR\n")	

			line = ser.readline().decode('utf-8').rstrip()
			print(line)
			x = 100

	time.sleep(1)	
