class Aggregate {
    constructor(target = {}, self = this) {
        this.target = target;
        Object.assign(target, self);
    }
}

class Frame extends Aggregate {
    constructor(target) {
        super();
        this.target.length |= 0;
    }
}

class LongFrame extends Frame {
    constructor(target) {
        super();
        this.target.length *= 2;
    }
}

class Sail extends Aggregate {
    constructor(target) {
        super(target);
    }
    
    sail() {
        this.target.distance += this.target.length;
    }
}

class Motor extends Aggregate {
    constructor(target) {
        super(target);
        this.speed = 1;
    }
    
    motor() {
        this.target.distance += this.target.length * this.speed;
    }
}

class FastMotor extends Motor {
    constructor(target) {
        super();
        this.speed *= 3;
    }
}

class FasterMotor extends Motor {
    constructor(target) {
        super();
        this.speed *= 5;
    }
}

class Fuel extends Aggregate {
    constructor(target) {
        super();
        this.fuel = '';
    }
}

class DieselFuel extends Fuel {
    constructor(target) {
        super();
        this.fuel = 'diesel;
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
        new Sail(this);
    }
}

class LongSailBoat extends Boat {
    constructor(length) {
        super(length);
        new Sail(this);
        new LongFrame(this);
    }
}

class MotorBoat extends Boat {
    constructor() {
        super();
        new Motor(this);
    }
}

class FastMotorBoat extends Boat {
    constructor() {
        super();
        new FastMotor(this);
    }
}

class FasterMotorBoatWithSail extends Boat {
    constructor() {
        super();
        new FasterMotor(this);
        new Sail(this);
    }
}

class LongFasterDieselMotorBoatWithSail extends Boat {
    constructor() {
        super();
        new LongFrame(this);
        new FasterMotor(this);
        new DieselFuel(this);
        new Sail(this);
    }
}
