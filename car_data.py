import paho.mqtt.client as mqtt
import time
import json
import serial

ser = serial.Serial('/dev/ttyACM0',115200,timeout=1)
ser.flush()

MQTT_ADDRESS_WEB = 'broker.hivemq.com'
MQTT_PORT_WEB = 1883

def on_connect(client, userdata, flags, rc):
    """ The callback for when the client receives a CONNACK response from the server."""
    print('Connected with result code ' + str(rc))

def main():
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_connect
    mqtt_client.connect(MQTT_ADDRESS_WEB, MQTT_PORT_WEB)
    if ser.in_waiting > 0:
     data = ser.readline().decode('utf-8').rstrip()
     clockTime = time.strftime("%H.%M.%S")
     date = time.strftime("%d-%m-%Y")
     new_payload = {"time":clockTime, "date":date, "data": data}
     mqtt_client.publish('CAR/DIRECTION', payload=json.dumps(new_payload))
    mqtt_client.loop_forever()

if __name__ == '__main__':
    print('MQTT to InfluxDB bridge')
    main()
