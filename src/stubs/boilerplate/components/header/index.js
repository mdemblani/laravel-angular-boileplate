import angular from 'angular';

/**
 * @module "DUMMYAPPNAME.header"
 *
 * @description
 * The home module is a sample module, that is provided as a reference to get started with component
 * structure of the application.
 */

import headerComponent from './header-component';

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
export default angular.module('DUMMYAPPNAME.header', dependencies)
		.component('appHeader', headerComponent)
		.name;