import angular from 'angular';

/**
 * @module DUMMYMODULENAME
 * @name appController
 * @kind class
 *
 * @description
 * The app-controller is a sample controller that is attached to the app-component.
 * Every angular component has a few lifecycle functions, which are called at various
 * points in the angular lifecycle. These lifecycle callbacks are defined within the components
 * associated controller. `$onInit` is one such example. Any function to be bound
 * to the lifecycle function is written as a value to the name of the lifecycle function in
 * the angular.extend() function.
 *
 * Also, angular.extend is used in the controller, for the following reasons:
 * 1. To ensure easy readablity of the code
 * 2. Standardise function declarations, since Javascript allows functions to be assigned as variables
 *    also.
 * 3. To use function hoisting feature of Javascript
 * 4. To give a direct overview of the list of functions/methods being directly exposed to the view.
 *    This gives you a basic idea of the list of functions/methods which are publicly exposed and
 *    which are private to the controller.
 */

function appController() {
	'ngInject';

	/**
	 * The view-model variable. Anything bound to this variable is exposed to the view.
	 * @type appController
	 */
	let vm = this;

	/**
	 * All the functions to be exposed to the view, or the life-cycle functions are added over here.
	 */
	angular.extend(vm, {
		$onInit: init,
		functionToExpose
	});

	function functionToExpose() {
		// Exposed function
	}

	function init() {
		// Life-cycle function
	}
}

export default appController;