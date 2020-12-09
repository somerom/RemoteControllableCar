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
};