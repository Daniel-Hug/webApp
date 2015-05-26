A launch pad for your web app
=============================

An abstraction of commonalities i've discovered in [web][1] [apps][2] [i've][3] [built][4]. Includes [DDS][5], [FatUI][6], and [DOM-Builder][7] via Bower.

[1]: https://github.com/Daniel-Hug/Tiny-Finance
[2]: https://github.com/Daniel-Hug/mileage
[3]: https://github.com/Daniel-Hug/tap
[4]: https://github.com/Daniel-Hug/ToDo
[5]: https://github.com/Daniel-Hug/DDS
[6]: https://github.com/Daniel-Hug/FatUI
[7]: https://github.com/Daniel-Hug/DOM-Builder


##Simple helper functions

 - Easily loop through any collection with `h.each()` and `h.map()`
 - Get element(s) by css selector with `h.qs()` and `h.qsa()`
 - Add and remove event listeners with `h.on()` and `h.off()`

```js
var taskList = h.qs('#tasks');
h.each(h.qsa('li', taskList), function(li) {
	var checkbox = h.qs('input[type=checkbox]', li);
	h.on(checkbox, 'click', function taskComplete() {
		h.off(checkbox, 'click', taskComplete);
		taskList.removeChild(li);
	});
});
```


##Complete localStorage + JSON wrapper

Easily store data in the form of an object, array, boolean, string, or number. The storage object has the following available methods:
 - `get`
 - `set`
 - `has`
 - `remove`
 - `clear`

Set data:
```js
storage.set('taskListTitle', 'My ToDos');
storage.set('taskList', tasks);
```

And later (even after browser refresh), retrieve the data:
```js
var taskListTitle = storage.get('taskListTitle');
var tasks = storage.get('taskList') || [];
```


##Easily render data to the DOM with [DOM-Builder][7]

First create an element renderer:
```
function renderTask(task) {
	return DOM.buildNode({ el: 'li', kid: task.title });
}
```

Then you can use the renderer to render elements to the DOM. For example, when the user adds a new entry via a form we can use the `prependAInB()` function to put it at the top of our task list:
```
on(qs('#newTaskForm'), submit, function newEntryHandler(event) {
	event.preventDefault();
	var taskData = {this.title, done: false};
	h.prependAInB(renderTask(taskData), taskList);
	tasks.push(taskData);
	h.storage.set('taskList', tasks);
});
```

Or, you can use the `renderMultiple()` function to render multiple elements to the DOM efficiently in one go. For example, on page load:
```
h.renderMultiple(tasks, renderTask, taskList);
```
