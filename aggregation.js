class Frame extends {
    constructor(target) {
        this.target = target;
        this.target.length |= 0;
    }
}

class LongFrame extends Frame {
    constructor(target) {
        super();
        this.target.length *= 2;
    }
}

class Sail {
    constructor(target) {
        this.target = target;
    }
    
    sail() {
        this.target.distance += this.target.length;
    }
}

class Motor {
    constructor(target) {
        this.target = target;
        this.speed = 1;
    }
    
    motor() {
        this.target.distance += this.target.length * this.speed;
    }
}

class FastMotor extends Motor {
    constructor(target) {
        super(target);
        this.speed *= 3;
    }
}

class FasterMotor extends Motor {
    constructor(target) {
        super(target);
        this.speed *= 5;
    }
}

class Fuel {
    constructor(target) {
        this.target = target;
        this.fuel = '';
    }
}

class DieselFuel extends Fuel {
    constructor(target) {
        super(target);
        this.fuel = 'diesel';
    }
}

class Boat {
    constructor() {
        this.length = 10;
        this.distance = 0;
    }
}

class SailBoat extends Boat {
    constructor() {
        super();
        this.sail = new Sail(this);
    }
}

class LongSailBoat extends Boat {
    constructor() {
        super();
        this.sail = new Sail(this);
        this.frame = new LongFrame(this);
    }
}

class MotorBoat extends Boat {
    constructor() {
        super();
        this.motor = new Motor(this);
    }
}

class FastMotorBoat extends Boat {
    constructor() {
        super();
        this.motor = new FastMotor(this);
    }
}

class FasterMotorBoatWithSail extends Boat {
    constructor() {
        super();
        this.motor = new FasterMotor(this);
        this.sail = new Sail(this);
    }
}

class LongFasterDieselMotorBoatWithSail extends Boat {
    constructor() {
        super();
        this.frame = new LongFrame(this);
        this.motor = new FasterMotor(this);
        this.fuel = new DieselFuel(this);
        this.sail = new Sail(this);
    }
}
