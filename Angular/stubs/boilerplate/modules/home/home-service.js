import angular from 'angular';

/**
 * @module DUMMYAPPNAME.home
 * @function homeService
 * @kind service
 * @name homeService
 *
 * A sample service, which is used by the home.homeController to request for data and
 * other activities.
 */

function homeService() {
	'ngInject';

	/**
	 * All the functions to be exposed to the view, or the life-cycle functions are added over here.
	 */
	angular.extend(this, {
		exposedService
	});

	function exposedService() {

	}

}
export default homeService;