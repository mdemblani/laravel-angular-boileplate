/**
 * @module DUMMYAPPNAME.header
 * @kind component
 * @name homeComponent
 *
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