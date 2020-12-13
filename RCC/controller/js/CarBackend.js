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
    OK: 1,
    DANGER: 2
}
var topic;
var msg;
function giveTopic() {
    return topic;
}
function giveMsg() {
    return msg;
}
class setTopic {
    constructor(t) {
        this.topic = t;
    }
}

class setMsg {
    constructor(m) {
        this.msg = m;
    }
}

class MessageWrapper {


    sendMessage(topic, msg) {
        this.setTopic(topic);
        this.setMsg(msg);
        MqttConnect();
        console.log(topic + ": " + msg);  // TODO: fix the dummy implementation 
    }
}

class CarState {
    constructor(direction, speed, powerMode) {
        this.direction = direction;
        this.speed = speed;
        this.powerMode = powerMode;
        this.MQTTWrapper = new MessageWrapper();
        this.statuses = statuses.OK;
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

    changeCarPower() {
        this.powerMode = (this.powerMode === powerModes.ON) ? powerModes.STANDBY : powerModes.ON;
        this.direction = directions.STOPPED;
        this.MQTTWrapper.sendMessage("POWER", this.powerMode);
    }

    changeStatus() {
        this.status = (this.status === statuses.OK) ? statuses.DANGER : statuses.OK;
        updateVideoView(this.status);
    }
};

var carState = new CarState(directions.STOP, 0, powerModes.ON);