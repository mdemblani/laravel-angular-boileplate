import angular from 'angular';

/**
 * @module DUMMYAPPNAME.components
 *
 * All the projects external dependencies that act as re-usable components/directives in the project
 * will be imported over here. This helps in providing an overview of all the external
 * components/directives which are re-usable in nature.
 *
 * The following components can be imported over here
 * 1. Node Module Component: These are components that are provided by 3rd party sources such as
 *							 open source libraries and are present in the node_modules directory.
 *							 They can be imported as  `import module from module-name`
 * 2. Vendor Components: Any 3rd party/open-source library that doesnot proivde a npm way to
 *						 install would be present this Those present in the vendor folder
 *						 inside the main angular application as `import module from 'vendors/module-name';
 * 3. Application Components: These are the application specific components. Each application component
 *							  would have a seperate folder and an index.js which would be imported
 *							  by default.
 *
 * The import searches files relative to 2 top level directories: node_modules and the resources/scripts directory
 * or a relative path with respect to the current directory can be provided
 * @example import module from components/module
 */

import dropdown from 'angular-ui-bootstrap/src/dropdown/index-nocss.js';
import popover from 'angular-ui-bootstrap/src/popover/index-nocss.js';
import modal from 'angular-ui-bootstrap/src/modal/index-nocss.js';

/**
 * All application components are imported over here.
 */
import header from './header';

/**
 * The dependencies contain all the modules on which the angular module to be initalized depends
 * on.
 *
 * @type Array
 */
let dependencies = [
	dropdown,
	popover,
	modal,
	header
];

/**
 * The name of the module is exported, since Angular depends on the name of the module while resolving
 * module dependenies.
 */
export default angular
		.module('DUMMYAPPNAME.components', dependencies)
		.name;