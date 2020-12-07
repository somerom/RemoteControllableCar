import os
os.system("sudo apt-get install mosquitto")
os.system("sudo apt-get install mosquitto-clients -y")
pip3 install paho-mqtt
os.system("./configure.sh")
print("Username:")
username = input()
command = "mosquitto_passwd -c /etc/mosquitto/pwfile " + username
os.system(command)
os.system("sudo systemctl status mosquitto")
