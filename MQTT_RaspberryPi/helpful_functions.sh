#!/usr/bin/env bash

function next_command()
{
    printf "Executing command: $1"
    comm=$(eval $1 2>/dev/null)
    if [[ $1 == "reboot" ]]; then
        printf "\nREBOOOOOOOOOOOOOOOOT...\n"
        exit 0
    elif [[ $1 == "hostapdstart >1&" ]]; then
        printf "\nSUCCESSFULLY STARTED ...\n"
        exit 0
    fi
    if [[ $2 != "nocheck" ]]; then
        if [ $? -eq 0 ]; then
            printf ". ----> GOING TO NEXT COMMAND.\n"
        else
            printf "FAILED!!! Exiting script\n"
            exit 1	
        fi
    fi
}



function configure()
{

    next_command "rm /etc/mosquitto/mosquitto.conf"
    next_command "cat MQTT_files/mosquitto.conf >> /etc/mosquitto/mosquitto.conf"
}

