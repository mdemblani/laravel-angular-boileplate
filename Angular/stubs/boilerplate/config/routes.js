import angular from 'angular';

/**
 * @module DUMMYAPPNAME
 * @function routes
 *
 * In a Single Page Application, all the routes are controlled by the front-end framework
 * and in this case by AngularJS or one of the open-source libraries such as UI-Router.
 *
 * This block contains all the routes that would be managed by the Angular app.
 * Also, this block contains other route level
 */

function routes($urlRouterProvider, $stateProvider) {
	'ngInject';

	/**
	 * Application States, to be used by ui-router
	 */
	let states = [
		{
			name: 'index',
			abstract: true,
			component: 'app'
		},
		// Setting up a default route as an example
		{
			name: 'home',
			url: '/home',
			parent: 'index',
			component: 'home'
		},
		// Error State
		{
			name: '404',
			url: '/404',
			parent: 'index',
			component: 'errorNotFound'
		}
	];

	// Register all the states
	states.forEach(function (state) {
		$stateProvider.state(state);
	});

	$urlRouterProvider.otherwise('/home');
}

export default routes;
