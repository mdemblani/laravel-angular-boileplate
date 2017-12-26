import angular from 'angular';

/**
 * @module DUMMYAPPNAME.header
 * @function headerController
 * @kind controller
 * @name headerController
 *
 * The headerController is used by the headerComponent. You can use this component
 * to set-up various elements of header.
 */
function headerController() {
	'ngInject';

	/**
	 * The view-model variable. Anything bound to this variable is exposed to the view.
	 * @type headerController
	 */
	let vm = this;
	vm.name = null;

	/**
	 * All the functions to be exposed to the view, or the life-cycle functions are added over here.
	 */
	angular.extend(this, {
		$onInit: init,
		changeName
	});

	function changeName() {
		vm.name = 'New Header Component';
	}

	function init() {
		// Life-cycle function
		vm.name = 'Header Component';
	}
}

export default headerController;