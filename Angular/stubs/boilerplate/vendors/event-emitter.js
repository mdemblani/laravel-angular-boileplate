/**
 * @name eventEmitter
 * @kind function
 *
 * Provides a generic wrapper for event based communication from child to parent via callbacks.
 *
 * @param {*} payload
 * @returns {object}
 */
function eventEmitter(payload) {
	return {$event: payload};
}

export default eventEmitter;