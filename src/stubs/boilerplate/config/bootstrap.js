import angular from 'angular';

/**
 * @fileOverview
 * The bootstrap config block is used to set up application wide default configurations.
 * Use this block to set default configuration settings for various providers in your application.
 * For example, you can set up default headers used by the $http service using the $httpProvider.
 *
 * @global {boolean} __DEV_ENV__ is is passed by Webpack and depends on the build being done
 */

function bootstrap($compileProvider, $httpProvider, $locationProvider, $traceProvider) {
	'ngInject';

	// Will be disabled in Production Environment
	if (__DEV_ENV__) {
		// Print the State Transition trace
		const $trace = $traceProvider.$get();
		$trace.enable('TRANSITION');
	}


	/**
	 * $location settings
	 */
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	/**
	 * $compile settings
	 */
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|skype|mailto):/);
	$compileProvider.debugInfoEnabled(__DEV_ENV__);
	$compileProvider.strictComponentBindingsEnabled(true);
	$compileProvider.commentDirectivesEnabled(false);

	/**
	 * $http settings
	 */
	$httpProvider.defaults.cache = false;
	$httpProvider.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
	$httpProvider.defaults.headers.common['Accept'] = 'application/json';
	$httpProvider.useApplyAsync(true);

	/**
	 * For IE Caching Bug - It caches all the GET request.
	 */
	let isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11

	if (isIE) {
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};
		}
		$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
		$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
	}

}

export default bootstrap;