import paho.mqtt.client as mqtt
import time

MQTT_ADDRESS_WEB = 'broker.hivemq.com'
MQTT_PORT_WEB = 1883

def on_connect(client, userdata, flags, rc):
    """ The callback for when the client receives a CONNACK response from the server."""
    print('Connected with result code ' + str(rc))

def main():
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_connect
    mqtt_client.connect(MQTT_ADDRESS_WEB, MQTT_PORT_WEB)
    for i in range(5):
       clockTime = time.strftime("%H.%M.%S")
       date = time.strftime("%d-%m-%Y")
       data = "12.34"
       new_payload ="{\"time\":\""+ clockTime + "\",\"date\":\""+date+"\",\"data\":\"" + data  + "\"}"
       mqtt_client.publish('CAR/DIRECTION', payload=new_payload)
       print(i)
    mqtt_client.loop_forever()

if __name__ == '__main__':
    print('MQTT to InfluxDB bridge')
    main()
