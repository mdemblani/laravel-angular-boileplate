/**
 * @module DUMMYAPPNAME.home
 * @kind component
 * @name homeComponent
 *
 * A sample top-level route component that would be loaded when the /home route is loaded.
 */

import homeController from './home-controller';

const homeComponent = {
	template: require('DUMMYPARTIALPATHhome.html'),
	controller: homeController,
	bindings: {
		$transition$: '<'
	}
};

export default homeComponent;