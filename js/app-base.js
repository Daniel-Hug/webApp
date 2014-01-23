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


// Get elements by CSS selector:
function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}
function qsa(selector, scope) {
	return (scope || document).querySelectorAll(selector);
}


// addEventListener wrapper:
function on(target, type, callback) {
	target.addEventListener(type, callback, false);
}


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


var escapeHTML = (function() {
	var entityMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	},
	re = /[&<>"']/g;
	
	return function(str) {
		return String(str).replace(re, function (char) {
			return entityMap[char];
		});
	};
})();


// Templating:
var tmp = {};
(function(regExp) {
	each(qsa('script[type="text/tmp"]'), function(el) {
		var src = el.innerHTML;
		tmp[el.id] = function(data, elName) {
			var newSrc = src.replace(regExp, function(match, key) {
				if ((match.length - key.length) % 2) return match;
				return key.length === 3 ? data[key] : escapeHTML(data[key]);
			});
			if (elName) {
				var el = document.createElement(elName);
				el.innerHTML = newSrc;
				return el;
			}
			return newSrc;
		};
	});
})(/{{{?(\w+)}}}?/g);


// Loop through an array of data objects,
// render each data object as an element with data inserted using the renderer,
// append each element to a documentFragment, and return the documentFragment:
function renderMultiple(arr, renderer) {
	var renderedEls = map(arr, renderer);
	var docFrag = document.createDocumentFragment();
	for (var i = renderedEls.length; i--;) docFrag.appendChild(renderedEls[i]);
	return docFrag;
}


function prependAInB(newChild, parent) {
	parent.insertBefore(newChild, parent.firstChild);
}
