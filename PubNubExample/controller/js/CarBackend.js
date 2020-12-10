const powerModes = {
    ON : 1,
    STANDBY : 2
}

const directions = {
    UP : 1,
    DOWN : 2,
    LEFT : 3,
    RIGHT : 4,
    STOPPED : 5
}

class CarState {
    constructor(direction, speed, powerMode) {
	this.direction = direction;
	this.speed = speed;
	this.powerMode = powerMode;
    }

    updateCarDirection(newDirection, newSpeed) {
        if (this.direction === newDirection) {
            this.direction = directions.STOPPED;
        }

        else this.direction = newDirection;

        if (newSpeed !== this.speed) {
            this.speed = newSpeed;
            // TODO: send the new speed, if the speed has changed (use messageWrapper)...
        }

        // TODO: write code for sending the new direction (use messageWrapper)...


    }

    updateCarPower() {
        this.powerMode = (this.powerMode === powerModes.ON)? powerModes.STANDBY : powerModes.ON;
        this.direction = directions.STOPPED;
        // TODO: write code for sending the new power mode (use messageWrapper)...
    }
};

var carState = new CarState(directions.STOP, 0, powerModes.ON);