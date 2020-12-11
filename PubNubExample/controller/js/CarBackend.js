const powerModes = {
    ON : "ON",
    STANDBY : "OFF"
}

const directions = {
    UP : "UP",
    DOWN : "DOWN",
    LEFT : "LEFT",
    RIGHT : "RIGHT",
    STOPPED : "STOP"
}


class MessageWrapper {

    sendMessage(topic, msg) {
        console.log(topic + ": " + msg);  // TODO: fix the dummy implementation 
    }
}

class CarState {
    constructor(direction, speed, powerMode) {
	this.direction = direction;
	this.speed = speed;
	this.powerMode = powerMode;
    this.MQTTWrapper = new MessageWrapper();
    }

    updateCarDirection(newDirection, newSpeed) {
        if (this.direction === newDirection) {
            this.direction = directions.STOPPED;
        }

        else this.direction = newDirection;

        if (newSpeed !== this.speed) {
            this.speed = newSpeed;
            this.MQTTWrapper.sendMessage("SPEED", newSpeed);
        }

        this.MQTTWrapper.sendMessage("DIRECTION", this.direction);


    }

    updateCarPower() {
        this.powerMode = (this.powerMode === powerModes.ON)? powerModes.STANDBY : powerModes.ON;
        this.direction = directions.STOPPED;
        this.MQTTWrapper.sendMessage("POWER", this.powerMode);
    }
};

var carState = new CarState(directions.STOP, 0, powerModes.ON);