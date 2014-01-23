A launch pad for your web app
=============================

An abstraction of commonalities i've discovered in [web][1] [apps][2] [i've][3] [built][4]. I hope you find it useful. Feel free to contribute! :)

[1]: https://github.com/Daniel-Hug/Tiny-Finance
[2]: https://github.com/Daniel-Hug/mileage
[3]: https://github.com/Daniel-Hug/tap
[4]: https://github.com/Daniel-Hug/ToDo


##Simple helper functions

 - Easily loop through any collection with `each()` and `map()`
 - Get element(s) by css selector with `qs()` and `qsa()`
 - Add and remove event listeners with `on()` and `off()`

```
var taskList = qs('#tasks');
each(qsa('li', taskList), function(li) {
	var checkbox = qs('input[type=checkbox]', li);
	on(checkbox, 'click', function taskComplete() {
		off(checkbox, 'click', taskComplete);
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
```
storage.set('taskListTitle', 'My ToDos');
storage.set('taskList', tasks);
```

And later (even after browser refresh), retrieve the data:
```
var taskListTitle = storage.get('taskListTitle');
var tasks = storage.get('taskList') || [];
```


##Templates

Stick templates in script elements like this one and include before app-base.js:
```
<script type="text/tmp" id="task">
	<label>
		<input type="checkbox" checked="{{done}}">
		<span contenteditable="true">{{title}}</span>
	</label>
</script>
```

Use like this:
```
taskList.appendChild(tmp.task({
	title: 'Take out the trash',
	done: true
}), 'tr');
```

…or like this:
```
taskList.insertAdjacentHTML('afterbegin', tmp.task({
	title: 'Walk the dog',
	done: false
}));
```


##Easily render data to the DOM

First create an element renderer:
```
function renderTask(data) {
	var li = tmp.task(data, 'li');
	return li;
}
```

Then you can use the renderer to render single elements to the DOM. For example, when the user adds a new entry via a form we can use the `prependAInB()` function to put it at the top of our task list:
```
function newEntryHandler(event) {
	event.preventDefault();
	var taskData = {this.title, done: false};
	prependAInB(renderTask(taskData), taskList);
	tasks.push(taskData);
	storage.set('taskList', tasks);
}
on(qs('#newTaskForm'), submit, newEntryHandler);
```

Or, you can use the `renderMultiple()` function to render multiple elements to the DOM efficiently in one go. For example, on page load:
```
renderMultiple(tasks, renderTask, taskList);
```
