import angular from 'angular';

/**
 * @module DUMMYAPPNAME.interceptors
 * @kind module
 *
 * Interceptors act as middleware/pipeline for your AngularJS application. This middleware/pipeline is
 * used by AngularJS $http service, to perform various actions on the request/response
 * when sending and receiving a data to/from api.
 *
 * You can use interceptors, for the purposes of global error handling, authentication, or any
 * kind of synchronous or asynchronous pre-processing of request or postprocessing of
 * responses, it is desirable to be able to intercept requests before they are handed to the
 * server and responses before they are handed over to the application code that initiated these
 * requests.
 *
 * Each interceptor has a single responsibility and are added to $httpProvider in the interceptor.js
 * file.
 */

import interceptor from './interceptor';

/**
 * The dependencies contain all the modules on which the angular module to be initalized depends
 * on.
 *
 * @type Array
 */
let dependencies = [

];

export default angular
		.module('DUMMYAPPNAME.interceptors', dependencies)
		.config(interceptor)
		.name;