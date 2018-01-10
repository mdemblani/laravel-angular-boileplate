/**
 * @memberOf module:"DUMMYAPPNAME.interceptors"
 * @function interceptor
 * @kind function
 *
 * @description
 * The interceptors are service factories that are registered with the $httpProvider by adding
 * them to the $httpProvider.interceptors array. The factory is called and injected with dependencies
 * (if specified) and returns the interceptor.
 *
 * All the interceptors created, are imported over here and added to the $httpProvider.interceptors
 * which is then exported as a config block to the DUMMYAPPNAME.interceptors module.
 *
 * A default interceptor by the name authorization-interceptor is already provided before hand, which
 * checks if the API(XHR/Ajax) request has returned a 401 UnAuthorized request or not.
 *
 * The import searches files relative to 2 top level directories: node_modules and the
 * resources/scripts directory or a relative path with respect to the current directory can
 * be provided.
 * @example import authorizationInterceptor from ./authorization-interceptor
 */

import authorizationInterceptor from './authorization-interceptor';

/**
 * The interceptors contain all the interceptors which are to be added to the $httpProvider.
 *
 * @type {Function[]}
 */
let interceptors = [
	authorizationInterceptor,
];

function interceptor($httpProvider) {
	'ngInject';

	/*
	 * Add the list of Interceptors to the $httpProvider
	 */
	$httpProvider.interceptors.push(...interceptors);
}

export default interceptor;