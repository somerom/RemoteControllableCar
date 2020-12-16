import sqlite3

# SQLite DB Name
DB_Name =  "IoT_sensors.db"

# SQLite DB Table Schema
TableSchema="""
drop table if exists DHTTEMP_Data ;
create table DHT22_Temperature_Data (
  id integer primary key autoincrement,
  SensorID text,
  Time text,
  Date text,
  Temperature text
);
drop table if exists TEMP_Data ;
create table DHT22_Temperature_Data (
  id integer primary key autoincrement,
  SensorID text,
  Time text,
  Date text,
  Temperature text
);
drop table if exists DHTHUM_Data ;
create table DHT22_Humidity_Data (
  id integer primary key autoincrement,
  SensorID text,
  Time text,
  Date test,
  Humidity text
);
drop table if exists ACC_Data ;
create table HMC5883_Acceleration_Data (
  id integer primary key autoincrement,
  SensorID text,
  Time text,
  Date test,
  Humidity text
);  
"""

#Connect or Create DB File
conn = sqlite3.connect(DB_Name)
curs = conn.cursor()

#Create Tables
sqlite3.complete_statement(TableSchema)
curs.executescript(TableSchema)

#Close DB
curs.close()
conn.close()
