/* global DDS, h, app */

(function() {
	'use strict';



	/*====================*\
	)  render people list  (
	\*====================*/

	app.views.walletList = app.people.render(new DDS.DOMView({
		renderer: app.renderers.person,
		parent: h.qs('#people')
	}));



	/*====================*\
	)  Handle new entries  (
	\*====================*/
 
	h.on(h.qs('#form-add-person'), 'submit', function(event) {
		// Don't submit the form
		event.preventDefault();

		// Add new entry to model
		app.people.add({
			name: this.firstName.value,
		});

		// clear fields
		this.firstName.value = '';
	});

})();