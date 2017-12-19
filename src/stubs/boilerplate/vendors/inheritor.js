import isFunction from './is-function';

/**
 * @name inheritor
 * @kind function
 *
 * Provides a generic wrapper to set inheritance between objects
 *
 * @param {Object|Function} child
 * @param {Mixed} parent
 */
function inheritor(child, parent) {
	// If the parent is a function, then it has a constructor and a prototype
	child.prototype = isFunction(parent) ? Object.create(parent.prototype) : Object.create(parent);
	child.prototype.constructor = child;
	child.prototype.parent = isFunction(parent) ? parent.prototype : parent;
}

export default inheritor;
