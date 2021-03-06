import angular from 'angular';

/**
 * @memberOf module:"DUMMYMODULENAME"
 * @name DUMMYCLASS
 * @kind class
 *
 * @description
 * DUMMYDESCRIPTION
 *
 */

function DUMMYCLASS() {
	'ngInject';

	/**
	 * The view-model variable. Anything bound to this variable is exposed to the view.
	 * @type {DUMMYCLASS}
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

export default DUMMYCLASS;