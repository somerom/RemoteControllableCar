#!/usr/bin/env bash
. ./helpful_functions.sh

direction=$1

echo "CHECK IF CONFIGURATION IS DONE"
done=$(check_configure_done)
if [ $done == "Empty" ]; then
    echo "CONFIGURATION NEVER DONE!!!"
    next_command "mkdir -p original_files"
    copy_original_files_to_backup
else
    echo "CONFIGURATION DONE BEFORE!!!"
    restore
fi

if [[ $direction == "back" ]]; then
    echo "DONE ROLLBACK!!! Rebooting..."
    next_command "reboot"
else
    configure
fi
