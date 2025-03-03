import cgitb
from Store_Sensor_Data_To_Database import sensor_Data_Handler
import paho.mqtt.client as mqtt


# MQTT Settings
MQTT_Broker = "broker.hivemq.com"
MQTT_Port = 8000
Keep_Alive_Interval = 45
MQTT_Topic = "ADD_ON/+"

# Subscribe to all Sensors at Base Topic


def on_connect(mosq, obj, rc):
    mqttc.subscribe(MQTT_Topic, 0)

# Save Data into DB Table


def on_message(mosq, obj, msg):
    # This is the Master Call for saving MQTT Data into DB
    # For details of "sensor_Data_Handler" function please refer "sensor_data_to_db.py"
    print("MQTT Data Received...")
    print("MQTT Topic: " + msg.topic)
    print("Data: " + msg.payload)
    sensor_Data_Handler(msg.topic, msg.payload)


def on_subscribe(mosq, obj, mid, granted_qos):
    pass


mqttc = mqtt.Client()

# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe

# Connect
mqttc.connect(MQTT_Broker, int(MQTT_Port), int(Keep_Alive_Interval))

# Test
cgitb.enable()

print("Content-Type: text/plain;charset=utf-8")
print("Test")
# Continue the network loop
mqttc.loop_forever()
