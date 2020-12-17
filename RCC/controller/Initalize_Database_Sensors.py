import sqlite3
import cgitb
# SQLite DB Name
DB_Name = "IoT_sensors.db"

# SQLite DB Table Schema
TableSchema = """
drop table if exists DHTTEMP_Data ;
create table DHTTEMP_Data (
  id integer primary key autoincrement,
  Time text,
  Date text,
  Temperature text
);
drop table if exists TEMP_Data ;
create table TEMP_Data (
  id integer primary key autoincrement,
  Time text,
  Date text,
  Temperature text
);
drop table if exists DHTHUM_Data ;
create table DHTHUM_Data (
  id integer primary key autoincrement,
  Time text,
  Date test,
  Humidity text
);
drop table if exists ACC_Data ;
create table ACC_Data (
  id integer primary key autoincrement,
  Time text,
  Date test,
  Humidity text
);  
"""

# Connect or Create DB File
conn = sqlite3.connect(DB_Name)
curs = conn.cursor()

# Create Tables
sqlite3.complete_statement(TableSchema)
curs.executescript(TableSchema)

# Close DB
curs.close()
conn.close()
