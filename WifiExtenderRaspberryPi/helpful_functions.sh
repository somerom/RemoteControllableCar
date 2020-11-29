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

function restore()
{
    echo "RESTORING from original_files"
    next_command "cp original_files/dnsmasq.conf /etc/dnsmasq.conf"
    next_command "rm /etc/hostapd/hostapd.conf" "nocheck"
    next_command "cp original_files/interfaces /etc/network/interfaces"
    next_command "rm /usr/local/bin/hostapdstart" "nocheck"
    next_command "cp original_files/hostapd /etc/default/hostapd"
    next_command "cp original_files/10-wpa_supplicant /lib/dhcpcd/dhcpcd-hooks/10-wpa_supplicant"
    next_command "cp original_files/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf"
    echo "... RESTORING ORIGINAL FILES done..."
}

function configure()
{
    echo "STARTING TO CONFIGURE..."
    next_command "cat network_files/dnsmasq.conf >> /etc/dnsmasq.conf"
    next_command "cat network_files/hostapd.conf >> /etc/hostapd/hostapd.conf"
    next_command "cat network_files/interfaces >> /etc/network/interfaces"
    next_command "cat network_files/hostapd >> /etc/default/hostapd"
    next_command "brctl addbr br0" "nocheck"
    next_command "brctl addif br0 wlan0"
    next_command "cp -v network_files/hostapdstart /usr/local/bin/hostapdstart"
    next_command "cat network_files/10-wpa_supplicant >> /lib/dhcpcd/dhcpcd-hooks/10-wpa_supplicant"
    next_command "chmod 667 /usr/local/bin/hostapdstart"
    next_command "reboot"
}

function copy_original_files_to_backup()
{
    echo "COPYING ORIGINAL FILES TO original_files"
    next_command "cp /etc/dnsmasq.conf original_files/"
    next_command "cp /etc/network/interfaces original_files/"
    next_command "cp /etc/default/hostapd original_files/"
    next_command "cp /lib/dhcpcd/dhcpcd-hooks/10-wpa_supplicant original_files/"
    next_command "cp /etc/wpa_supplicant/wpa_supplicant.conf original_files/"
    echo "... COPYING ORIGINAL FILES done..."
}

function check_configure_done()
{
    [ "$(ls -A original_files)" ] && echo "Not" || echo "Empty"
}