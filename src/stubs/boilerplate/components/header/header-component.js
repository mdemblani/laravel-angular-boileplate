/**
 * @memberOf module:"DUMMYMODULENAME.header"
 * @name headerComponent
 * @kind function
 *
 * @description
 * The header component renders the header in the layout.
 */

import headerController from './header-controller';

const headerComponent = {
	template: require('DUMMYPARTIALPATHheader.html'),
	controller: headerController,
	bindings: {

	}
};

export default headerComponent;