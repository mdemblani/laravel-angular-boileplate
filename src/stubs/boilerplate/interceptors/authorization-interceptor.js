/**
 * @memberOf module:"DUMMYAPPNAME.interceptors"
 * @function authorizationInterceptor
 * @kind function
 *
 * @description
 * The authorization interceptor checks if a 401 Unauthorized response has been returned by the
 * calling API. If the calling API request has returned a 401 UnAuthorized statusCode in the HTTP
 * response, then this interceptors abandones the upcoming flow and perfroms a logout request for the
 * current user.
 *
 */

function authorizationInterceptor($q, $window) {
	'ngInject';

	function responseError(response) {
		if (response && response.status && response.status === 401) {
			$window.location.pathname = '/login';
		}
		return $q.reject(response);
	}

	return {responseError};
}

export default authorizationInterceptor;