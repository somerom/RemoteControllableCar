const powerModes = {
    ON: "ON",
    STANDBY: "OFF"
}

const directions = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    STOPPED: "STOP"
}

const statuses = {
    OK: "OK",
    DANGER: "NOT_OK"
}

class CarState {
    constructor(direction, speed, powerMode) {
        this.direction = direction;
        this.speed = speed;
        this.powerMode = powerMode;
        this.statuses = statuses.OK;
    }

    updateCarDirection(newDirection, newSpeed) {
        if (this.direction === newDirection) {
            this.direction = directions.STOPPED;
        }

        else this.direction = newDirection;

        if (newSpeed !== this.speed) {
            this.speed = newSpeed;
            sendMqttMessage("CAR/SPEED", newSpeed);
        }

        sendMqttMessage("CAR/DIRECTION", this.direction);


    }

    changeCarPower() {
        this.powerMode = (this.powerMode === powerModes.ON) ? powerModes.STANDBY : powerModes.ON;
        this.direction = directions.STOPPED;
        sendMqttMessage("CAR/POWER", this.powerMode);
    }

    updateStatus(newStatus) {
        this.status = (newStatus === statuses.OK) ? statuses.OK : statuses.DANGER;
        updateVideoView(this.status);
    }
};

var carState = new CarState(directions.STOP, 0, powerModes.ON);