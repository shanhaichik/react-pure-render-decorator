'use strict';

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwn.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

/**
 * Tells if a component should update given it's next props
 * and state.
 *
 * @param {object} nextProps Next props.
 * @param {object} nextState Next state.
 */
function shouldComponentUpdate(nextProps, nextState) {
    return (function (inst, nextProps, nextState) {
        return !shallowEqual(inst.props, nextProps) || !shallowEqual(inst.state, nextState);
    })(this, nextProps, nextState)
}

/**
 * Decorator function
 *
 * @param {object} component Component.
 */
module.exports = function(component) {
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
};


