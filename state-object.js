class State {
    constructor() {
    }
    
    get() {}
    
    set() {}
}

class UndoableState extends State {
    constructor() {
    }
    
    undo() {}
    
    redo() {}
}


class LockableState extends State {
    constructor() {
    }
    
    lock() {}
    
    unlock() {}
}

class UndoableState extends State {
    constructor() {
        new Undoable(this);
    }
}

class Undoable extends Aggregate {
    undo() {}
    
    redo() {}
}

class LockableState extends State {
    constructor() {
        new Lockable(this);
    }
}

class Lockable extends Aggregate {
    lock() {}
    
    unlock() {}
}

class Undoable extends Aggregate {
    undo() {}
    
    redo() {}
}

class LockableUndoableState extends State {
    constructor() {
        new Lockable(this);
        new Undoable(this);
    }
}
