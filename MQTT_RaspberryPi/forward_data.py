import paho.mqtt.client as mqtt_rasp
import paho.mqtt.client as mqtt_web
import time

#Settings for subscriber (raspberry pi) and a client (web page)
#change the IP address ,username, password and port number
# to match the broker you want to receive from/send data to. 
MQTT_ADDRESS_RASP = '192.168.2.1'
MQTT_USER_RASP = 'hello'
MQTT_PASSWORD_RASP = 'hello'
MQTT_TOPIC_RASP = '+/+' #subscribe all the topics from the broker
MQTT_PORT_RASP = 1883

MQTT_ADDRESS_WEB = 'broker.hivemq.com'
MQTT_PORT_WEB = 1883
mqtt_client_web = mqtt_web.Client() #create a client

def on_connect_rasp(client, userdata, flags, rc):
    "callback for when client receives a CONNACK response from the server"
    "and subscribe from the broker "
    print('Connected with result code ' + str(rc))
    client.subscribe(MQTT_TOPIC_RASP)

def on_connect_web(client, userdata, flags, rc):
    "callback for when client receives a CONNACK response from the server"
    print('Connected with result code ' + str(rc))

def on_message(client, userdata, msg):
    "callback for when a PUBLISH message is received from the server"
    "and send the received data with a timestamp to another broker "
    print(msg.topic + ' ' + str(msg.payload.decode("utf-8")))
    clockTime = time.strftime("%H.%M.%S")
    date = time.strftime("%d-%m-%Y")
    data = str(msg.payload.decode("utf-8"))
    new_payload ="{\"time\":\""+ clockTime + "\",\"date\":\""+date+"\",\"data\":\"" + data  + "\"}"

    mqtt_client_web.publish(msg.topic, payload=new_payload)

def main():

    mqtt_client_rasp = mqtt_rasp.Client() #create a subscriber
    mqtt_client_web.on_connect = on_connect_web
    mqtt_client_web.connect(MQTT_ADDRESS_WEB, MQTT_PORT_WEB)

    mqtt_client_rasp.username_pw_set(MQTT_USER_RASP, MQTT_PASSWORD_RASP)
    mqtt_client_rasp.on_connect = on_connect_rasp
    mqtt_client_rasp.on_message = on_message
    mqtt_client_rasp.connect(MQTT_ADDRESS_RASP, MQTT_PORT_RASP)
    #get constantly new values
    mqtt_client_rasp.loop_forever()
    mqtt_client_web.loop_forever()


if __name__ == '__main__':
    print('MQTT to InfluxDB bridge')
    main()

