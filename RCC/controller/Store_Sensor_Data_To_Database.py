import json
import sqlite3

# SQLite DB Name
DB_Name = "IoT_sensors.db"

# ===============================================================
# Database Manager Class


class DatabaseManager():
	def __init__(self):
		self.conn = sqlite3.connect(DB_Name)
		self.conn.execute('pragma foreign_keys = on')
		self.conn.commit()
		self.cur = self.conn.cursor()

	def add_del_update_db_record(self, sql_query, args=()):
		self.cur.execute(sql_query, args)
		self.conn.commit()
		return

	def __del__(self):
		self.cur.close()
		self.conn.close()

# ===============================================================
# Functions to push Sensor Data into Database

# Function to save Temperature to DB Table


def DHTTEMP_Handler(jsonData):
	# Parse Data
	json_Dict = json.loads(jsonData)
	Time = json_Dict['Time']
	Data = json_Dict['Date']
	Temperature = json_Dict['Temperature']

	# Push into DB Table
	dbObj = DatabaseManager()
	dbObj.add_del_update_db_record(
	    "insert into DHTEMP_Data (Time, Date, Temperature) values (?,?,?)", [Time, Date, Temperature])
	del dbObj
	print("Inserted into DHTTemp")


# Function to save Humidity to DB Table
def DHTHUM_Handler(jsonData):
	# Parse Data
	json_Dict = json.loads(jsonData)
    Time = json_Dict['Time']
	Data = json_Dict['Date']
	Humidity = json_Dict['Humidity']

    # Push into DB Table
	dbObj = DatabaseManager()
	dbObj.add_del_update_db_record("insert into DHTHUM_Data (Time, Date, Humidity) values (?,?,?)",[Time,Date,Humidity])
	del dbObj
	print ("Inserted DHTHumidity Data into Database.")

# Function to save Humidity to DB Table
def TEMP_Handler(jsonData):
	# Parse Data 
	json_Dict = json.loads(jsonData)
    Time = json_Dict['Time']
	Data = json_Dict['Date']
	Tempera = json_Dict['Temepera']

    # Push into DB Table
	dbObj = DatabaseManager()
	dbObj.add_del_update_db_record("Insert into TEMP_Data (Time, Date, Tempera) values (?,?,?)",[Time,Date, Tempera])
	del dbObj
	print ("Inserted Temperature Data into Database.")

def ACC_Handler(jsonData):
	# Parse Data 
	json_Dict = json.loads(jsonData)
    Time = json_Dict['Time']
	Data = json_Dict['Date']
	Acceleration = json_Dict['Acceleration']
	
	# Push into DB Table
	dbObj = DatabaseManager()
	dbObj.add_del_update_db_record("Insert into ACC_Data (Time,Date,Acceleration) values (?,?,?)",[Time, Date, Acceleration])
	del dbObj
	print ("Inserted Acceleration Data into Database.")


# ===============================================================
# Master Function to Select DB Funtion based on MQTT Topic

def sensor_Data_Handler(Topic, jsonData):
	if Topic == "ADD_ON/DHTTEMP":
		DHTTEMP_Handler(jsonData)
	elif Topic == "ADD_ON/DHTHUM":
		DHTHUM_Handler(jsonData)
    elif Topic == "ADD_ON/TEMP":
		TEMP_Handler(jsonData)
    elif Topic == "ADD_ON/ACC":
		ACC_Handler(jsonData)	


