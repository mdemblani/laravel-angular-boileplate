/**
 * @module DUMMYAPPNAME
 * @kind component
 *
 * The app-component is the main component that acts as the entry point to the application.
 * It is the first component that is rendered and is the parent of all the components that
 * are present in the entire application
 *
 *
 * Since app-component is a route-level component, a binding called $transition$ is added to
 * the component. This binding is directly provided by the ui-router library.
 *
 * Each component might have a controller. If the component has a controller, then that component
 * has a controller by that name imported over here which is then added to the controller key
 * of the component definition.
 *
 * Similarly, a template key is used, rather than a `templateUrl` to avoid the use of Angular's
 * $templateCache service. Any external template can be added to the template key, by directly
 * requiring it.
 * @example template: '<div></div>'
 * @example template: require('path/to/template.html')
 *
 * Similarly, not writing a controllerAs means that every member of the controller can be accessed
 * via the `$ctrl` alias in the view.
 */

import appController from './app-controller';

const appComponent = {
	template: '<div>'
			+ '<header></header>'
			+ '<h1>This is the main file</h1>'
			+ '<p>Printing the Transition Object'
			+ '<span>{{$ctrl.$transition$}}</span>'
			+ '</p>'
			+ '</div>'
			+ '<main ui-view=""></main>',
	controller: appController,
	bindings: {
		$transition$: '<'
	}
};

export default appComponent;