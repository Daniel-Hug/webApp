/* global DDS, h */
(function() {
	'use strict';




	/* app global
	**************************************/

	var app = window.app = {
		renderers: {},
		views: {}
	};



	/* Setup model
	**************************************/

	// Grab people from localStorage (recent last):
	app.people = new DDS(h.storage.get('people') || []);

	// keep db updated when model changes
	app.people.on('any', function() {
		h.storage.set('people', app.people.objectsObj);
	});

})();