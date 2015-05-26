(function() {
	'use strict';



	/* helpers
	**************************************/

	// Loop through collections:
	function each(arr, fn, scope) {
		for (var i = 0, l = arr.length; i < l; i++) {
			fn.call(scope, arr[i], i, arr);
		}
	}

	function map(arr, fn, scope) {
		var l = arr.length, newArr = [];
		for (var i = 0; i < l; i++) {
			newArr[i] = fn.call(scope, arr[i], i, arr);
		}
		return newArr;
	}


	// localStorage + JSON wrapper:
	var storage = {
		get: function(prop) {
			return JSON.parse(localStorage.getItem(prop));
		},
		set: function(prop, val) {
			localStorage.setItem(prop, JSON.stringify(val));
		},
		has: function(prop) {
			return localStorage.hasOwnProperty(prop);
		},
		remove: function(prop) {
			localStorage.removeItem(prop);
		},
		clear: function() {
			localStorage.clear();
		}
	};



	/* DOM helpers
	**************************************/

	// Get elements by CSS selector:
	function qs(selector, scope) {
		return (scope || document).querySelector(selector);
	}

	function qsa(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	}


	// Add and remove event listeners:
	function on(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	}

	function off(target, type, callback, useCapture) {
		target.removeEventListener(type, callback, !!useCapture);
	}


	function renderMultiple(arr, renderer, parent) {
		var renderedEls = map(arr, renderer);
		var docFrag = document.createDocumentFragment();
		for (var i = renderedEls.length; i--;) docFrag.appendChild(renderedEls[i]);
		if (parent) parent.appendChild(docFrag);
		else return docFrag;
	}

	function prependAInB(newChild, parent) {
		parent.insertBefore(newChild, parent.firstChild);
	}



	/* export
	**************************************/

	window.h = {
		each: each,
		map: map,
		storage: storage,
		qs: qs,
		qsa: qsa,
		on: on,
		off: off,
		renderMultiple: renderMultiple,
		prependAInB: prependAInB
	};
})();