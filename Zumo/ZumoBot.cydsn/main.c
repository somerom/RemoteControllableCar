#include <project.h>
#include <stdio.h>
#include "FreeRTOS.h"
#include "task.h"
#include "Motor.h"
#include "Ultra.h"
#include "Nunchuk.h"
#include "Reflectance.h"
#include "Gyro.h"
#include "Accel_magnet.h"
#include "LSM303D.h"
#include "IR.h"
#include "Beep.h"
#include "mqtt_sender.h"
#include <time.h>
#include <sys/time.h>
#include "serial1.h"
#include <unistd.h>
#include <stdlib.h>
#include "I2C_Common.h"
#include <time.h>

int speed = 0;



/**
 * @file    main.c
 * @brief   
 * @details  ** Enable global interrupt since Zumo library uses interrupts. **<br>&nbsp;&nbsp;&nbsp;CyGlobalIntEnable;<br>
*/

int readCommand(char* command) {
    if(!strcmp(command, "forward\n")) {
        //printf("Going forward!\n\r");
        motor_forward(speed,0);
        return 1;
    } else if(!strcmp(command, "back\n")) {
        //printf("Going backward!\n\r");
        motor_backward(speed, 0);
        return 2;
    }  else if(!strcmp(command, "left\n")) {
        //printf("Turning left!\n\r");
        motor_tankturn_left(speed,0);
        return 3;
    } else if(!strcmp(command, "right\n")) {
        //printf("Turning right!\n\r");
        motor_tankturn_right(speed,0);
        return 4;
    } else if(!strcmp(command, "stop\n")) {
        //printf("STOP\r\n");
        return 5;
    } else if(!strcmp(command, "on\n")) {
        //printf("Motor is on\r\n");
        return 6;
    } else if(!strcmp(command, "off\n")) {
        //printf("Motor is off\r\n");
        return 7;
    } else if(strstr(command, "speed ") != NULL) {
        //printf("Changing speed\r\n");
        sscanf(command, "speed %d\n", &speed);
        float newspeed = 2.55 * speed;
        speed = (int) newspeed;
        //printf("NEW SPEED %d\r\n", speed);
        return 8;
    } else if(!strcmp(command, "accelerometer\n")) {
        //printf("Acccelerometer value \r\n");
        return 9;
    } else if(!strcmp(command, "gyroscope\n")) {
        //printf("Gyroscope value \r\n");
        return 10;
    }
    //printf("Not a command\r\n");
    return 0;
}

#if 1
void zmain(void)
{
    //int gyroReadings = 0;
    struct accData_ data;
    CyGlobalIntEnable;
    UART_1_Start();
   
    
    if(!LSM303D_Start()) {
        //printf("LSM303D failed to initialize!!! Program is Ending!!!\n");
        //return 0
    } else {
        
        Ultra_Start();
        
       
        bool forward = false;
        bool backward = false;
        bool left = false;  //update
        bool right = false;  //update
        uint8 gyrodata[6];
        int16 x;
        int16 y;
        int16 z;
        int16 xvalues[6];
        int16 yvalues[6];
        int16 zvalues[6];
        char input[40];
        fflush(stdin);
        while(true){
            //printf("Start writing\r\n");
            fgets(input, 40, stdin);
            fflush(stdin);
            int command = readCommand(input);
            
            if(command == 1) {
                forward = true;
                backward = false;
            } else if(command == 2) {
                forward = false;
                backward = true;
            }else if(command == 3) {
                left = true; //update
                //motor_tankturn_left(speed,00); //original
                //vTaskDelay(250); //original
                //motor_forward(0,0); //original
            }else if(command == 4) {
                right = true; //update
                //motor_tankturn_right(speed,0); //original
                //vTaskDelay(250); //original
                //motor_forward(0,0); //original
            } else if (command == 5) {
                left = false; //update
                right = false; //update
                forward = false;
                backward = false;
                motor_forward(0,0);
            } else if (command == 6) {
                //on
                motor_start();
                speed = 127;
                motor_forward(0,0);
            }  else if (command == 7) {
                //off
                speed = 0;
                motor_stop();
            }  else if (command == 8) {
                //speed
            } else if(command == 9) {
                LSM303D_Read_Acc(&data);
                //printf("X-axis: %10d Y-axis: %10d Z-axis: %10d\n",data.accX, data.accY, data.accZ);
                vTaskDelay(250);
            } else if(command == 10) {
                /*uint16 x = getGyroXValue();
                uint16 y = getGyroYValue();
                uint16 z = getGyroZValue();
                printf("X-axis: %10d Y-axis: %10d Z-axis: %10d\n",x, y, z);
                vTaskDelay(250); */
            } else {
                //printf("Try again\r\n");
            }
            for(int i = 0; i < 5; i++) {
                
                I2C_Read_Multiple(0b1101011, 0x28 | 0x80, gyrodata, 6);
                x = (int16) ((gyrodata[1] << 8) | gyrodata[0]);
                y = (int16) ((gyrodata[3] << 8) | gyrodata[2]);
                z = (int16) ((gyrodata[5] << 8) | gyrodata[4]);
                
                //printf("X: %10d \nY: %10d\nZ: %10d\n\n", x, y, z);
                xvalues[i] = x;
                yvalues[i] = y;
                zvalues[i] = z;
                vTaskDelay(100);
            }
            for(int i = 0; i < 4; i++) {
                if(abs(xvalues[i]-xvalues[i+1]) > 1000 || abs(yvalues[i]-yvalues[i+1]) > 1000 || abs(zvalues[i]-zvalues[i+1]) > 1000){
                printf("NOT_OK\r\n");
                break;
                }
                if(i == 3)   printf("OK\r\n");
            }
            if(left) { //update
                motor_tankturn_left(speed,00); //update
                continue; //update
            } else if(right) { //update
                motor_tankturn_right(speed, 00); //update
                continue; //update
            }
            if(forward) {
                motor_forward(speed,0);
                continue;
            } else if (backward) {
               motor_backward(speed,0);
               continue;
            }
        //vTaskDelay(250); //how long the car moves
        }
    }
    
 }  
#endif