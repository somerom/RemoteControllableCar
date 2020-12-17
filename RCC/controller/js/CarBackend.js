const powerModes = {
    ON: "ON",
    STANDBY: "OFF"
}

const directions = {
    UP: "FORWARD",
    DOWN: "BACK",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    STOPPED: "STOP"
}

const statuses = {
    OK: 1,
    DANGER: 2
}

class CarState {
    constructor(direction, speed, powerMode) {
        this.direction = direction;
        this.speed = speed;
        this.powerMode = powerMode;
        this.MQTTWrapper = new CarCtrlMqttWrapper();
        this.statuses = statuses.OK;
    }

    updateCarDirection(newDirection, newSpeed) {
        if (this.direction === newDirection) {
            this.direction = directions.STOPPED;
        }

        else this.direction = newDirection;

        if (newSpeed !== this.speed) {
            this.speed = newSpeed;
            this.MQTTWrapper.sendMessage("CAR/SPEED", newSpeed);
        }

        this.MQTTWrapper.sendMessage("CAR/DIRECTION", this.direction);


    }

    changeCarPower() {
        this.powerMode = (this.powerMode === powerModes.ON) ? powerModes.STANDBY : powerModes.ON;
        this.direction = directions.STOPPED;
        this.MQTTWrapper.sendMessage("CAR/POWER", this.powerMode);
    }

    changeStatus() {
        this.status = (this.status === statuses.OK) ? statuses.DANGER : statuses.OK;
        updateVideoView(this.status);
    }
};

var carState = new CarState(directions.STOP, 0, powerModes.ON);