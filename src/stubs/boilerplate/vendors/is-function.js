/**
 * @function isFunction
 * @kind function
 *
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function isFunction(value) {
	return typeof value === 'function';
}

export default isFunction;