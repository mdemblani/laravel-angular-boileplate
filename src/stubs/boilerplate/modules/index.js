import angular from 'angular';

/**
 * @module DUMMYMODULENAME.modules
 *
 * A component/block is considered a module, if it satisifes any of the following
 * 1. It is a top-level component.
 * 2. It interacts with a service(s) to fetch data(from an external source) and provides data to other
 *    components(stateless/dumb) to provide data to other child components.
 * 3. It is directly loaded on a specific route.
 * 4. It is used in a very few places(mostly 1), maybe 2 places in the entire application.
 * 5. It acts as a data-provider for other components/directives.
 *
 * Any component/directive/block satisfying the above criteria can be considered as a module. Most of
 * the modules present would be internal to your application and would in very rare-scenarios use
 * 3rd-party or open-source libraries as direct landing points. These would be imported over here.
 *
 * The followinf modules can be imported over here
 * 1. Node Module Modules: These are modules that are provided by 3rd party sources such as
 *						   open source libraries and are present in the node_modules directory.
 *						   They can be imported as  `import module from module-name`
 *
 * 2. Application Modules: These are the application specific components. Each application component
 *						   would have a seperate folder and an index.js which would be imported
 *						   by default.
 *
 * The import searches files relative to 2 top level directories: node_modules and the
 * resources/scripts directory or a relative path with respect to the current directory can
 * be provided.
 * @example import module from components/module
 *
 * A single top level component is provided to see how things would work. The error component would
 * contains a 404 Not Found component which would be loaded when the `404` route is loaded.
 *
 * Also a sample top-level component `home` is provided as an example
 */

/**
 * All modules are imported over here.
 */
import error from './error';

/**
 * The dependencies contain all the modules on which the current angular module to be initalized depends
 * on.
 *
 * @type {string[]}
 */
let dependencies = [
	error
];

/**
 * The name of the module is exported, since Angular depends on the name of the module while resolving
 * module dependenies.
 */
export default angular
		.module('DUMMYMODULENAME.modules', dependencies)
		.name;