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
	 * All the functions of the service to be exposed are added over here.
	 */
	angular.extend(this, {
		exposedFunction
	});

	/**
	 * All the functions of the service to be exposed on $rootScope are added over here.
	 * @example:
	 * angular.extend($rootScope, {
	 *	exposedFunction
	 * });
	 */


	function exposedFunction() {

	}

}
export default homeService;