class FSM {
    constructor(config) {
        if (!config) {
            this.initial = null;
            this.states = null;
        }
        this.initial = config.initial;
        this.states = config.states;
        this.activeState = this.initial;
        this.stackOfStates = [];
        this.stackOfStates.push(this.initial);
        this.steps = 0;
    }
    getState() {
        return this.activeState;
    }
    changeState(state) {
        for (var key in this.states) {
            if (key == state) {
                this.activeState = state;
                this.steps++;
                this.stackOfStates.push(state);
                return this.activeState;
            }
        }
        throw new Error("Error");
    }
    reset() {
        this.activeState = this.initial;
    }
    trigger(event) {
        for (var state in this.states) {
            if (state === this.activeState) {
                for (var key in this.states[state].transitions) {
                    if (key === event) {
                        this.activeState = this.states[state].transitions[key];
                        this.steps++;
                        this.stackOfStates.push(this.states[state].transitions[key]);
                        return this.activeState;
                    }
                }
            }
        }
        throw new Error();
    }
    getStates(event) {
        var stateArr = [];

        if (!event) {
            for (var state in this.states) {
                stateArr.push(state);
            }
        }

        for (var state in this.states) {
            for (var transition in this.states[state].transitions) {
                if (transition === event) {
                    stateArr.push(state);
                }
            }
        }

        return stateArr;
    }
    undo() {
        if (this.steps !== 0) {
            this.steps--;
            this.activeState = this.stackOfStates[this.steps];
            return true;
        } else return false;
    }

    redo() {
        if (this.stackOfStates[this.stackOfStates.length - 1] !== this.activeState) {
            this.steps++;
            this.activeState = this.stackOfStates[this.steps];
            return true;
        } else return false;
    }

    clearHistory() {
        this.steps = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/