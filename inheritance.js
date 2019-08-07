class Boat {
    constructor() {
        this.length = 10;
        this.distance = 0;
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

class LongSailBoat extends SailBoat {
    constructor() {
        super();
        this.length *= 2;
    }
    
    sail() {
        super.sail();
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

class FastMotorBoat extends MotorBoat {
    constructor() {
        super();
    }
    
    motor() {
        this.distance += this.length * 5;
    }
}

class FasterMotorBoat extends MotorBoat {
    constructor() {
        super();
    }
    
    motor() {
        this.distance += this.length * 7;
    }
}

class Boat {
    constructor() {
        this.length = 10;
        this.distance = 0;
        this.speed = 1;
    }
}

class MotorBoat extends Boat {
    constructor() {
        super();
        this.speed = 3;
    }
    
    motor() {
        this.distance += this.length * this.speed;
    }
}

class FastMotorBoat extends MotorBoat {
    constructor() {
        super();
        this.speed = 5;
    }
}

class FasterMotorBoat extends MotorBoat {
    constructor() {
        super();
        this.speed = 7;
    }
}

class FastSailBoat extends SailBoat {
    constructor() {
        super();
        this.speed = 2;
    }
}

class DieselMotorBoat extends MotorBoat {
    constructor() {
        super();
        this.fuel = 'diesel';
    }
    
    motor() {
        super.motor();
    }
}

class Boat {
    constructor() {
        this.length = 10;
        this.distance = 0;
        this.speed = 1;
        this.fuel = '';
    }
}

class FastDieselMotorBoat extends FastBoat {
    constructor() {
        super();
        this.fuel = 'diesel';
    }
    
    motor() {
        super.motor();
    }
}

class FastDieselMotorBoat extends DieselMotorBoat {
    constructor() {
        super();
        this.speed = 5;
    }
    
    motor() {
        super.motor();
    }
}

class FastDieselSailBoat extends DieselMotorBoat {
    constructor() {
        super();
        this.speed = 5;
    }
    
    sail() {
        super.sail();
    }
}
