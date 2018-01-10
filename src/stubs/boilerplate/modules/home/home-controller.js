import angular from 'angular';

/**
 * @memberOf module:"DUMMYAPPNAME.home"
 * @name homeController
 * @kind controller
 *
 * @description
 * A sample controller, that is used by the homeComponent to retreive, set and transform data for
 * the home-components view. The homeController uses the homeService. 'ngInject' is used to
 * automatically manage dependency injection, therby avoiding the use of `controller.$inject`.
 */

function homeController(homeService) {
	'ngInject';

	/**
	 * The view-model variable. Anything bound to this variable is exposed to the view.
	 * @type {homeController}
	 */
	let vm = this;

	/**
	 * All the functions to be exposed to the view, or the life-cycle functions are added over here.
	 */
	angular.extend(vm, {
		$onInit: init,
		$onChanges: onChanges,
		$onDestroy: onDestroy,
		exposedViewFunction
	});

	function exposedViewFunction() {
		// Exposed function
		homeService.exposedService();
	}

	function init() {
		// Life-cycle function
	}

	function onChanges() {
		// Life-cycle function
	}

	function onDestroy() {
		// Destroy Life-cycle function, it is a replacement for $scope.on('destroy') event
	}
}

export default homeController;