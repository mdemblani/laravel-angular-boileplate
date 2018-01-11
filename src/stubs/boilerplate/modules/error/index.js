import angular from 'angular';

/**
 * @module "DUMMYMODULENAME.error"
 *
 * @description
 * The error module contains all the error-components, i.e. components loaded on various
 * error pages. One such component provided is the notFound component which is loaded when the
 * 404 route is loaded by the Angular application.
 */

import errorNotFoundComponent from './error-not-found-component';

/**
 * The dependencies contain all the modules on which the angular module to be initalized depends
 * on.
 *
 * @type {string[]}
 */
let dependencies = [

];

/**
 * The name of the module is exported, since Angular depends on the name of the module while resolving
 * module dependenies.
 */
export default angular.module('DUMMYMODULENAME.error', dependencies)
		.component('errorNotFound', errorNotFoundComponent)
		.name;