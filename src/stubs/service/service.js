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
	 * All the functions of the service to be exposed are added over here.
	 */
	angular.extend(this, {
		exposedFunction
	});

	/**
	 * All the functions of the service to be exposed on $rootScope are added over here.
	 * @example:
	 *
	 * angular.extend($rootScope, {
	 *	exposedFunction
	 * });
	 */


	function exposedFunction() {

	}

}

export default DUMMYCLASS;