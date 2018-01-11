import angular from 'angular';

/**
 * @module "DUMMYMODULENAME.home"
 *
 * @description
 * The home module is a sample module, that is provided as a reference to get started with component
 * structure of the application
 */

import homeComponent from './home-component';
import homeService from './home-service';

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
export default angular.module('DUMMYMODULENAME.home', dependencies)
		.component('home', homeComponent)
		.component('homeService', homeService)
		.name;