/* global DOM, app */
(function() {
	'use strict';

	function renderPerson(person) {
		return DOM.buildNode({el: 'li', kid: person.name});
	}

	app.renderers.person = renderPerson;
})();