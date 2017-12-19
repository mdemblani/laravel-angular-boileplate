/**
 * @module DUMMYAPPNAME
 *
 * This is the main entry point into the application. The entire angular application begins
 * execution from this point.
 * We begin by importing various dependencies that are required by the application. All the core
 * dependecies that are required accross the entire application are imported over
 * here, including angular.
 *
 * The import searches files relative to 2 top level directories: node_modules
 * and the resources/scripts directory or a relative path with respect to the
 * current directory can be provided
 *
 * @example import angular from 'angular'
 */

/**
 * An environment variable __DEV_ENV__ is passed down by Webpack and is used
 * during the build process by Webpack.
 *
 * You can use in your Javascript code. These variables are used by webpack during static
 * compilation of your application i.e. during the build process. These variables are
 * extremely useful in manner, they let you alter the flow of the application during build time,
 * rather than run-time.
 *
 * In other words, these environment variables can be used to perform static checks during
 * the appliation build process.
 */

/**
 * All external dependencies that are required across the enitre application
 * are imported over here.
 */

import $ from 'jquery';
import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import ngSanitize from 'angular-sanitize';

/**
 * Now we import the basic funtions and procedures required to bootstrap the application.
 */

import init from 'config/init';
import routes from 'config/routes';
import bootstrap from 'config/bootstrap';
import constants from 'config/constants';

/**
 * The app-component is the main component that acts as the entry point to the application.
 * It is the first component that is rendered and the is the parent of all the components that
 * are present in the entire application
 */

import appComponent from 'modules/app/app-component';

/**
 * Import the remaining application dependencies in the form of modules, components and interceptors.
 * Each dependency has an index.js file, which states the list of modules it requires before it can
 * be imported over here. Each import signifies the following
 * 1. Modules: They contain all the route level components. Any component that acts a direct
 *			   route would be present as a module to the application. All the components present
 *			   over here are stateful and are the ones mainly responsible to interact with
 *			   services and send data to the application components.
 *
 * 2. Components: All the parts of the application that are re-usable in nature are present as a
 *				  component in the application. Most the components that you will write will be
 *				  stateless(dumb/presentational) in nature and would be present in a plug-in and
 *				  plug-out manner.
 *
 * 3. Interceptors: Interceptors are $http middleware.
 */

import modules from './modules';
import components from './components';
import interceptors from './interceptors';

/**
 * You can also import the css over here. The webpack configuration extracts the css
 * during the build process using the ExtractTextPlugin.
 * @example import '../styles/main.scss';
 */

/**
 * The dependencies contain all the modules on which the angular module to be initalized depends
 * on.
 *
 * @type Array
 */
let dependencies = [
	uirouter,
	ngSanitize,

	modules,
	components,
	interceptors
];

/**
 * Now, initialize the basic angular application by creating a basic angular module
 */

let app = angular.module('DUMMYAPPNAME', dependencies);
app.config(bootstrap).config(routes);
app.constant('appConstants', constants);
app.run(init);
app.component('app', appComponent);

// Bootstrap angular on body element when document is ready
angular.element(document).ready(function () {
	angular.bootstrap(document.body, ['DUMMYAPPNAME']);
});