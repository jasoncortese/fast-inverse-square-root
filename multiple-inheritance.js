class Boat {
    constructor() {
        this.length = 10;
        this.distance = 0;
        this.speed = 1;
        this.fuel = '';
    }
}

class SailBoat extends Boat {
    constructor() {
        super();
    }
    
    sail() {
        this.distance += this.length;
    }
}

class LongBoat extends Boat {
    constructor(length) {
        super(length);
        this.length *= 2;
    }
}

class MotorBoat extends Boat {
    constructor() {
        super();
    }
    
    motor() {
        this.distance += this.length * 3;
    }
}

class SpeedBoat extends Boat {
    constructor() {
        super();
        this.speed = 1;
    }
}

class FastMotorBoat extends MotorBoat, SpeedBoat {
    constructor() {
        super();
        this.speed = 3;
    }
    
    motor() {
        this.distance += this.length * this.speed;
    }
}

class FastSailBoat extends SailBoat, SpeedBoat {
    constructor() {
        super();
        this.speed = 3;
    }
    
    sail() {
        this.distance += this.length * this.speed;
    }
}

class FasterSailBoatWithMotor extends SailBoat, MotorBoat, SpeedBoat {
    constructor() {
        super();
        this.speed = 5;
    }
    
    sail() {
        this.distance += this.length * this.speed;
    }
    
    motor() {
        this.distance += this.length * this.speed;
    }
}

class LongFastDieselMotorBoatWithSail extends DieselBoat, MotorBoat, SpeedBoat, LongBoat, SailBoat {
    constructor() {
        super();
        this.length = 2;
        this.fuel = 'diesel';
        this.sailSpeed = 2;
        this.motorSpeed = 5;
    }
     
    sail() {
        this.distance += this.length * this.sailSpeed;
    }
   
    motor() {
        this.distance += this.length * this.motorSpeed;
    }
}
