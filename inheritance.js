class Pet {
    constructor(legs = 0) {
        this.legs = legs;
    }
    
    says(sound = '') {
        external.play(sound);
    }
}

class Dog extends Pet {
    constructor(legs = 4) {
        super(legs);
    }
    
    says(sound = 'bark') {
        super.says(sound);
    }
}

class LoudDog extends Dog {
    constructor(legs) {
        super(legs);
    }
    
    says(sound, volume = 10) {
        external.valume = volume;
        super.says(sound);
    }
}
