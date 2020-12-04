import paho.mqtt.client as mqtt

MQTT_ADDRESS_WEB = '192.168.2.1'
MQTT_USER_WEB = 'hello'
MQTT_PASSWORD_WEB = 'hello'
MQTT_PORT_WEB = 1883

def on_connect(client, userdata, flags, rc):
    """ The callback for when the client receives a CONNACK response from the server."""
    print('Connected with result code ' + str(rc))

def main():
    mqtt_client = mqtt.Client()
    mqtt_client.username_pw_set(MQTT_USER_WEB, MQTT_PASSWORD_WEB)
    mqtt_client.on_connect = on_connect
    mqtt_client.connect(MQTT_ADDRESS_WEB, MQTT_PORT_WEB)
    for i in range(5):
       mqtt_client.publish('raspberry/topic', payload=i)
       print(i)
    mqtt_client.loop_forever()

if __name__ == '__main__':
    print('MQTT to InfluxDB bridge')
    main()
